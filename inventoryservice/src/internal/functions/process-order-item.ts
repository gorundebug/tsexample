/** User-owned endpoint implementation. The generator preserves this file. */

import type {
  Completion,
  GrpcEndpointConfig,
  MessageContext,
  RuntimeEnvironment,
  StreamContext,
} from "@gorundebug/tsservicelib/runtime";
import type {
  EndpointHandler as GrpcSourceEndpointHandler,
  ResultContext as GrpcResultContext,
  Sender as GrpcResponseSender,
} from "@gorundebug/tsservicelib/datasource/grpc";
import type { OrderItem, OrderItemResult } from "@gorundebug/model";
import {
  ProcessOrderItemResponseSchema,
  type ProcessOrderItemRequest,
  type ProcessOrderItemResponse,
} from "@gorundebug/inventory-service-api";
import { create } from "@bufbuild/protobuf";

export type ProcessOrderItemHandlerState = undefined;

/** Reserve inventory for one order item using its order ID, item ID, SKU, and quantity.
Return the available quantity, reservation outcome, and status. The caller combines this response with the original identity, requested quantity, and unit price.
If the inventory call fails, the caller returns a non-reserved PROCESSING_ERROR result with the failure message. */
export class ProcessOrderItem implements GrpcSourceEndpointHandler<ProcessOrderItemHandlerState, ProcessOrderItemRequest, ProcessOrderItemResponse, OrderItem, OrderItemResult, Error> {
  public beginRequest(context: MessageContext, _stream: StreamContext<OrderItem, OrderItemResult, Error>): { readonly context: MessageContext; readonly state: ProcessOrderItemHandlerState } {
    return { context, state: undefined };
  }

  public consumeMessage(context: MessageContext, stream: StreamContext<OrderItem, OrderItemResult, Error>, _state: ProcessOrderItemHandlerState, request: Readonly<ProcessOrderItemRequest>, result: GrpcResultContext<ProcessOrderItemHandlerState, OrderItem, ProcessOrderItemResponse, OrderItemResult, Error>, _sender: GrpcResponseSender<ProcessOrderItemResponse>): Completion {
    result.setResultCallback(request.itemId, (resultContext, _resultStream, _handlerState, value, sender) => {
      const sending = sender.send(resultContext, create(ProcessOrderItemResponseSchema, {
        availableQty: value.availableQty,
        reserved: value.reserved,
        status: value.status,
      }));
      return sending === undefined ? true : sending.then(() => true);
    });
    return stream.collect(context, {
      orderId: request.orderId,
      itemId: request.itemId,
      sku: request.sku,
      quantity: request.quantity,
      unitPrice: 0,
    });
  }

  public getMessageId(_context: MessageContext, _stream: StreamContext<OrderItem, OrderItemResult, Error>, _state: ProcessOrderItemHandlerState, value: Readonly<OrderItemResult>): string {
    return value.itemId;
  }

  public eof(_context: MessageContext, _stream: StreamContext<OrderItem, OrderItemResult, Error>, _state: ProcessOrderItemHandlerState): void {}
  public endRequest(_context: MessageContext, _stream: StreamContext<OrderItem, OrderItemResult, Error>, _error: Error | undefined, _state: ProcessOrderItemHandlerState): void {}
}

/** Construct ProcessOrderItem once while the service graph is initialized. */
export function makeProcessOrderItem(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: GrpcEndpointConfig,
): ProcessOrderItem {
  return new ProcessOrderItem();
}
