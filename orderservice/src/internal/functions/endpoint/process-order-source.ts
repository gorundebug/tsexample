/** User-owned endpoint implementation. The generator preserves this file. */

import { randomUUID } from "node:crypto";

import type {
  HttpEndpointConfig,
  MessageContext,
  RuntimeEnvironment,
  StreamContext,
} from "@gorundebug/tsservicelib/runtime";
import type {
  EndpointHandler as HttpSourceEndpointHandler,
  HandlerData,
  ResultContext as HttpResultContext,
} from "@gorundebug/tsservicelib/datasource/http";
import {
  HttpRequestError,
  readJsonBody,
  writeJsonResponse,
  writeRequestError,
} from "@gorundebug/tsservicelib/datasource/http";
import type { OrderItem, OrderItemResult } from "@gorundebug/model";
import {
  decodeProcessOrderRequest,
  type ProcessOrderRequest,
  type ProcessOrderResponse,
} from "@gorundebug/order-service-api";
import type { Order, OrderState } from "../../types/index.generated.js";

export interface ProcessOrderSourceHandlerState {
  readonly request: ProcessOrderRequest;
}

/** Accept orders with at least one item and positive quantities; reject malformed or invalid requests as client errors.
Reuse X-Request-ID when supplied, otherwise generate an order ID. Preserve customer, item, price, and X-Trace data, and apply the configured timeout of five seconds by default.
Return one response per order. When all items finish, use CONFIRMED only if every item was reserved; otherwise use PARTIALLY_CONFIRMED. If the deadline wins, return TIMED_OUT with the item results received so far.
Calculate the total from processed item prices, falling back to the submitted total when no item result arrived, and include individual item failures in the response. */
export class ProcessOrderSource implements HttpSourceEndpointHandler<ProcessOrderSourceHandlerState, ProcessOrderRequest, ProcessOrderResponse, Order, OrderState, Error> {
  readonly #timeoutMs: number;

  public constructor(timeoutMs = 5_000) {
    this.#timeoutMs = timeoutMs;
  }

  public async beginRequest(context: MessageContext, _stream: StreamContext<Order, OrderState, Error>, data: HandlerData): Promise<{ readonly context: MessageContext; readonly state: ProcessOrderSourceHandlerState }> {
    try {
      const request = await readJsonBody(data.request, decodeProcessOrderRequest);
      if (request.items.length === 0) {
        throw new HttpRequestError(400, "items must not be empty");
      }
      if (request.items.some((item) => item.quantity <= 0)) {
        throw new HttpRequestError(400, "all quantities must be positive");
      }
      return { context: context.bounded(this.#timeoutMs), state: { request } };
    } catch (error: unknown) {
      writeRequestError(data.response, error);
      throw error;
    }
  }

  public async consumeMessage(context: MessageContext, stream: StreamContext<Order, OrderState, Error>, state: ProcessOrderSourceHandlerState, data: HandlerData, result: HttpResultContext<ProcessOrderSourceHandlerState, ProcessOrderRequest, ProcessOrderResponse, Order, OrderState, Error>): Promise<void> {
    const orderId = requestHeader(data, "x-request-id") ?? randomUUID();
    const items: OrderItem[] = state.request.items.map((item) => ({
      orderId,
      itemId: item.item_id,
      sku: item.sku,
      quantity: item.quantity,
      unitPrice: item.unit_price ?? 0,
    }));
    const order: Order = {
      id: orderId,
      customerId: state.request.customer_id ?? "",
      items,
      totalAmount: items.reduce((total, item) => total + item.quantity * item.unitPrice, 0),
      createdAt: new Date(),
      traceId: requestHeader(data, "x-trace") ?? "",
    };
    const itemResults: OrderItemResult[] = [];
    let responseSent = false;
    result.setResultCallback(orderId, (_resultContext, _resultStream, _handlerState, orderState, handlerData) => {
      if (responseSent) return true;
      if (orderState.status !== "TIMED_OUT") {
        itemResults.push(...orderState.confirmedItems);
        if (itemResults.length < items.length) return false;
      }
      let status = orderState.status;
      if (status !== "TIMED_OUT") {
        status = itemResults.every((item) => item.reserved)
          ? "CONFIRMED"
          : "PARTIALLY_CONFIRMED";
      }
      const calculatedTotal = itemResults.reduce(
        (total, item) => total + item.unitPrice * item.requestedQty,
        0,
      );
      const response = buildProcessOrderResponse({
        orderId: order.id,
        status,
        confirmedItems: itemResults,
        totalAmount: itemResults.length === 0 ? order.totalAmount : calculatedTotal,
        processedAt: new Date(),
      });
      writeJsonResponse(handlerData.response, 200, response);
      responseSent = true;
      result.done();
      return true;
    });
    await stream.collect(context, order);
  }

  public getMessageId(_context: MessageContext, _stream: StreamContext<Order, OrderState, Error>, _state: ProcessOrderSourceHandlerState, value: Readonly<OrderState>): string {
    return value.orderId;
  }

  public endRequest(_context: MessageContext, _stream: StreamContext<Order, OrderState, Error>, error: Error | undefined, _state: ProcessOrderSourceHandlerState, data: HandlerData): void {
    if (error !== undefined && !data.response.writableEnded) {
      data.response.statusCode = 500;
      data.response.setHeader("content-type", "text/plain; charset=utf-8");
      data.response.end("internal server error\n");
    }
  }
}

function buildProcessOrderResponse(state: OrderState): ProcessOrderResponse {
  return {
    order_id: state.orderId,
    status: state.status,
    total_amount: state.totalAmount,
    processed_at: state.processedAt.toISOString(),
    ...(state.confirmedItems.length === 0
      ? {}
      : {
          confirmed_items: state.confirmedItems.map((item) => ({
            item_id: item.itemId,
            sku: item.sku,
            available_qty: item.availableQty,
            reserved: item.reserved,
            status: item.status,
            ...(item.error.length === 0 ? {} : { error: item.error }),
          })),
        }),
  };
}

function requestHeader(data: HandlerData, name: string): string | undefined {
  const value = data.request.headers[name];
  return Array.isArray(value) ? value[0] : value;
}

/** Construct ProcessOrderSource once while the service graph is initialized. */
export function makeProcessOrderSource(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  config: HttpEndpointConfig,
): ProcessOrderSource {
  const timeout = config.properties["timeout"];
  return new ProcessOrderSource(typeof timeout === "number" && Number.isFinite(timeout) ? timeout : 5_000);
}
