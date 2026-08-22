/** User-owned endpoint implementation. The generator preserves this file. */

import type {
  KafkaEndpointConfig,
  MessageContext,
  RuntimeEnvironment,
  StreamContext,
} from "@gorundebug/tsservicelib/runtime";
import type {
  ConsumerMessage,
  EndpointHandler as KafkaSourceEndpointHandler,
  ResultContext as KafkaResultContext,
} from "@gorundebug/tsservicelib/datasource/kafka";
import type { OrderProcessed } from "@gorundebug/model";

export type OrderProcessedEndpointHandlerState = undefined;

/** Exchange OrderProcessed events keyed by order ID.
Producers include the final status, processing time, total and confirmed item counts, and a failure reason for unsuccessful orders.
Consumers decode the event and mark its Kafka message processed only after the pipeline handles it successfully. */
export class OrderProcessedEndpoint implements KafkaSourceEndpointHandler<OrderProcessedEndpointHandlerState, OrderProcessed, OrderProcessed, Error> {
  public concurrency(_stream: StreamContext<OrderProcessed, OrderProcessed, Error>): number { return 0; }

  public beginRequest(context: MessageContext, _stream: StreamContext<OrderProcessed, OrderProcessed, Error>): { readonly context: MessageContext; readonly state: OrderProcessedEndpointHandlerState } {
    return { context, state: undefined };
  }

  public async consumeMessage(context: MessageContext, stream: StreamContext<OrderProcessed, OrderProcessed, Error>, _state: OrderProcessedEndpointHandlerState, message: ConsumerMessage, result: KafkaResultContext<OrderProcessedEndpointHandlerState, OrderProcessed, OrderProcessed, Error>): Promise<void> {
    const value = decodeOrderProcessed(JSON.parse(Buffer.from(message.value).toString("utf8")) as unknown);
    result.setResultCallback(value.orderId, (_resultContext, _resultStream, _handlerState, _value) => {
      message.markMessage();
      result.done();
      return true;
    });
    await stream.collect(context, value);
  }

  public getMessageId(_context: MessageContext, _stream: StreamContext<OrderProcessed, OrderProcessed, Error>, _state: OrderProcessedEndpointHandlerState, value: Readonly<OrderProcessed>): string {
    return value.orderId;
  }

  public endRequest(_context: MessageContext, _stream: StreamContext<OrderProcessed, OrderProcessed, Error>, _error: Error | undefined, _state: OrderProcessedEndpointHandlerState): void {}
}

function decodeOrderProcessed(value: unknown): OrderProcessed {
  if (!isObject(value)) throw new TypeError("OrderProcessed must be an object");
  return {
    orderId: requiredString(value, "order_id"),
    status: requiredString(value, "status"),
    processedAt: requiredDate(value, "processed_at"),
    totalItems: requiredInteger(value, "total_items"),
    confirmedItems: requiredInteger(value, "confirmed_items"),
    failureReason: optionalString(value, "failure_reason") ?? "",
  };
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requiredString(value: Record<string, unknown>, name: string): string {
  const field = value[name];
  if (typeof field !== "string") throw new TypeError(`${name} must be a string`);
  return field;
}

function optionalString(value: Record<string, unknown>, name: string): string | undefined {
  const field = value[name];
  if (field === undefined) return undefined;
  if (typeof field !== "string") throw new TypeError(`${name} must be a string`);
  return field;
}

function requiredInteger(value: Record<string, unknown>, name: string): number {
  const field = value[name];
  if (typeof field !== "number" || !Number.isSafeInteger(field)) {
    throw new TypeError(`${name} must be an integer`);
  }
  return field;
}

function requiredDate(value: Record<string, unknown>, name: string): Date {
  const text = requiredString(value, name);
  const date = new Date(text);
  if (Number.isNaN(date.valueOf())) throw new TypeError(`${name} must be a valid date-time`);
  return date;
}

/** Construct OrderProcessedEndpoint once while the service graph is initialized. */
export function makeOrderProcessedEndpoint(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: KafkaEndpointConfig,
): OrderProcessedEndpoint {
  return new OrderProcessedEndpoint();
}
