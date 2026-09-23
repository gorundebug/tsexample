/** User-owned function implementation. The generator preserves this file. */

import type { Collector, MessageContext, RuntimeEnvironment, Stream } from "@gorundebug/tsservicelib/runtime/graph";
import type {
  MapFunction,
} from "@gorundebug/tsservicelib/transformation";
import type { OrderItemResult } from "@gorundebug/model";
import type { InventoryFailure } from '../../types/inventory-failure.js';

/** When inventory processing fails, return an OUT_OF_STOCK result with no available quantity.
Preserve the order and item identity and requested quantity, and record the failure. */
export class GetInventoryItemError implements MapFunction<InventoryFailure, OrderItemResult> {
  public map(context: MessageContext, _stream: Stream, value: Readonly<InventoryFailure>, out: Collector<OrderItemResult>): void | Promise<void> {
    const failure = value;
    return out.out(context, {
      orderId: failure.item.orderId,
      itemId: failure.item.itemId,
      sku: failure.item.sku,
      requestedQty: failure.item.quantity,
      availableQty: failure.availableQty,
      reserved: false,
      status: "OUT_OF_STOCK",
      unitPrice: failure.item.unitPrice,
      error: 'inventory is out of stock',
    });
  }
}

/** Construct GetInventoryItemError asynchronously while the service graph is initialized. */
export async function makeGetInventoryItemError(
  context: MessageContext,
  environment: RuntimeEnvironment,
): Promise<GetInventoryItemError> {
  void context; void environment;
  return new GetInventoryItemError();
}
