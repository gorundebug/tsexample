/** User-owned endpoint implementation. The generator preserves this file. */

import type {
  KafkaEndpointConfig,
  MessageContext,
  RuntimeEnvironment,
  Stream,
} from "@gorundebug/tsservicelib/runtime";
import type {
  EndpointHandler as KafkaSinkEndpointHandler,
  SinkMessage,
} from "@gorundebug/tsservicelib/datasink/kafka";
import type { OrderProcessed } from "@gorundebug/model";

export type OrderProcessedEndpointSinkHandlerState = undefined;

/** Exchange OrderProcessed events keyed by order ID.
Producers include the final status, processing time, total and confirmed item counts, and a failure reason for unsuccessful orders.
Consumers decode the event and mark its Kafka message processed only after the pipeline handles it successfully. */
export class OrderProcessedEndpointSink implements KafkaSinkEndpointHandler<OrderProcessedEndpointSinkHandlerState, OrderProcessed, Error> {
  public getStreamId(_context: MessageContext, value: Readonly<OrderProcessed>): string { return value.orderId; }

  public beginRequest(context: MessageContext, _stream: Stream): { readonly context: MessageContext; readonly state: OrderProcessedEndpointSinkHandlerState } {
    return { context, state: undefined };
  }

  public consumeMessage(context: MessageContext, _stream: Stream, _state: OrderProcessedEndpointSinkHandlerState, value: Readonly<OrderProcessed>, message: SinkMessage<Error>): void {
    message.key = Buffer.from(value.orderId);
    message.value = Buffer.from(JSON.stringify({
      order_id: value.orderId,
      status: value.status,
      processed_at: value.processedAt.toISOString(),
      total_items: value.totalItems,
      confirmed_items: value.confirmedItems,
      ...(value.failureReason.length === 0 ? {} : { failure_reason: value.failureReason }),
    }));
    message.send(context, (_partition, _offset, error) => error);
  }

  public endRequest(_context: MessageContext, _stream: Stream, _error: Error | undefined, _state: OrderProcessedEndpointSinkHandlerState): void {}
}

/** Construct OrderProcessedEndpointSink once while the service graph is initialized. */
export function makeOrderProcessedEndpointSink(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: KafkaEndpointConfig,
): OrderProcessedEndpointSink {
  return new OrderProcessedEndpointSink();
}
