/** User-owned function implementation. The generator preserves this file. */

import type { Collector, MessageContext, RuntimeEnvironment, Stream } from "@gorundebug/tsservicelib/runtime/graph";
import type {
  MapFunction,
} from "@gorundebug/tsservicelib/transformation";
import type { OrderItemResult } from "@gorundebug/model";
import { InventoryFailureError } from "./get-inventory-item-data.js";

/** When inventory processing fails, return an OUT_OF_STOCK result with no available quantity.
Preserve the order and item identity and requested quantity, and record the failure. */
export class GetInventoryItemError implements MapFunction<Error, OrderItemResult> {
  public map(context: MessageContext, _stream: Stream, value: Readonly<Error>, out: Collector<OrderItemResult>): void | Promise<void> {
    const failure = value instanceof InventoryFailureError ? value : undefined;
    return out.out(context, {
      orderId: failure?.item.orderId ?? "",
      itemId: failure?.item.itemId ?? "",
      sku: failure?.item.sku ?? "",
      requestedQty: failure?.item.quantity ?? 0,
      availableQty: failure?.availableQty ?? 0,
      reserved: false,
      status: failure === undefined ? "PROCESSING_ERROR" : "OUT_OF_STOCK",
      unitPrice: failure?.item.unitPrice ?? 0,
      error: value.message,
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
