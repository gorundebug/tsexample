/** User-owned function implementation. The generator preserves this file. */

import type {
  Collector,
  MessageContext,
  RuntimeEnvironment,
  Stream,
  ProcessStreamConfig,
} from "@gorundebug/tsservicelib/runtime";
import type {
  ProcessFunction,
} from "@gorundebug/tsservicelib/transformation";
import type { OrderItem, OrderItemResult } from "@gorundebug/model";

/** Reserve the requested quantity without allowing concurrent orders to overdraw stock.
On success, return CONFIRMED with the requested quantity available. Otherwise return OUT_OF_STOCK with the current available quantity.
Preserve the order and item identity, requested quantity, and unit price.
The example starts with SKU-001: 100, SKU-002: 50, and SKU-003: 25. */
export class GetInventoryItemData implements ProcessFunction<OrderItem, OrderItemResult, OrderItemResult> {
  readonly #stock: Map<string, number>;

  public constructor(stock: Readonly<Record<string, number>> = {
    "SKU-001": 100,
    "SKU-002": 50,
    "SKU-003": 25,
  }) {
    this.#stock = new Map(Object.entries(stock));
  }

  public process(context: MessageContext, _stream: Stream, value: Readonly<OrderItem>, out: Collector<OrderItemResult>, errorOut: Collector<OrderItemResult>): void | Promise<void> {
    const available = this.#stock.get(value.sku) ?? 0;
    const reserved = available >= value.quantity;
    if (reserved) {
      this.#stock.set(value.sku, available - value.quantity);
    }
    const result: OrderItemResult = {
      orderId: value.orderId,
      itemId: value.itemId,
      sku: value.sku,
      requestedQty: value.quantity,
      availableQty: reserved ? value.quantity : available,
      reserved,
      status: reserved ? "CONFIRMED" : "OUT_OF_STOCK",
      unitPrice: value.unitPrice,
      error: "",
    };
    return reserved ? out.out(context, result) : errorOut.out(context, result);
  }
}

/** Construct GetInventoryItemData once while the service graph is initialized. */
export async function makeGetInventoryItemData(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: ProcessStreamConfig,
): Promise<GetInventoryItemData> {
  return new GetInventoryItemData();
}
