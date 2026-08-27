/** User-owned endpoint implementation. The generator preserves this file. */

import type {
  Completion,
  GrpcEndpointConfig,
  MessageContext,
  RuntimeEnvironment,
  SinkStreamContext,
} from "@gorundebug/tsservicelib/runtime";
import type {
  EndpointHandler as GrpcSinkEndpointHandler,
  ResultContext as GrpcSinkResultContext,
  Sender as GrpcRequestSender,
} from "@gorundebug/tsservicelib/datasink/grpc";
import type { OrderState } from "../../types/index.generated.js";
import type { OrderItem, OrderItemResult } from "@gorundebug/model";
import {
  ProcessOrderItemRequestSchema,
  type ProcessOrderItemRequest,
  type ProcessOrderItemResponse,
} from "@gorundebug/inventory-service-api";
import { create } from "@bufbuild/protobuf";

export interface ProcessOrderItemSinkHandlerState {
  orderId: string;
  itemId: string;
  sku: string;
  requestedQty: number;
  unitPrice: number;
}

/** Reserve inventory for one order item using its order ID, item ID, SKU, and quantity.
Return the available quantity, reservation outcome, and status. The caller combines this response with the original identity, requested quantity, and unit price.
If the inventory call fails, the caller returns a non-reserved PROCESSING_ERROR result with the failure message. */
export class ProcessOrderItemSink implements GrpcSinkEndpointHandler<ProcessOrderItemSinkHandlerState, ProcessOrderItemRequest, ProcessOrderItemResponse, OrderItem, OrderItemResult, OrderState> {
  public beginRequest(context: MessageContext, _stream: SinkStreamContext<OrderItem, OrderItemResult, OrderState>): { readonly context: MessageContext; readonly state: ProcessOrderItemSinkHandlerState } {
    return {
      context,
      state: { orderId: "", itemId: "", sku: "", requestedQty: 0, unitPrice: 0 },
    };
  }

  public consumeMessage(context: MessageContext, _stream: SinkStreamContext<OrderItem, OrderItemResult, OrderState>, state: ProcessOrderItemSinkHandlerState, value: Readonly<OrderItem>, sender: GrpcRequestSender<ProcessOrderItemRequest>, _result: GrpcSinkResultContext): Completion {
    state.orderId = value.orderId;
    state.itemId = value.itemId;
    state.sku = value.sku;
    state.requestedQty = value.quantity;
    state.unitPrice = value.unitPrice;
    return sender.send(context, create(ProcessOrderItemRequestSchema, {
      orderId: value.orderId,
      itemId: value.itemId,
      sku: value.sku,
      quantity: value.quantity,
    }));
  }

  public handleResponse(context: MessageContext, stream: SinkStreamContext<OrderItem, OrderItemResult, OrderState>, state: ProcessOrderItemSinkHandlerState, response: Readonly<ProcessOrderItemResponse>): void | Promise<void> {
    return stream.collect(context, {
      orderId: state.orderId,
      itemId: state.itemId,
      sku: state.sku,
      requestedQty: state.requestedQty,
      availableQty: response.availableQty,
      reserved: response.reserved,
      status: response.status,
      unitPrice: state.unitPrice,
      error: "",
    });
  }

  public endRequest(context: MessageContext, stream: SinkStreamContext<OrderItem, OrderItemResult, OrderState>, error: Error | undefined, state: ProcessOrderItemSinkHandlerState): void | Promise<void> {
    if (error === undefined) return;
    return stream.collect(context, {
      orderId: state.orderId,
      itemId: state.itemId,
      sku: state.sku,
      requestedQty: state.requestedQty,
      availableQty: 0,
      reserved: false,
      status: "PROCESSING_ERROR",
      unitPrice: state.unitPrice,
      error: error.message,
    });
  }
}

/** Construct ProcessOrderItemSink once while the service graph is initialized. */
export function makeProcessOrderItemSink(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: GrpcEndpointConfig,
): ProcessOrderItemSink {
  return new ProcessOrderItemSink();
}
