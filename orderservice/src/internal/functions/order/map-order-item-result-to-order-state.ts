/** User-owned function implementation. The generator preserves this file. */

import type {
  Collector,
  MessageContext,
  RuntimeEnvironment,
  Stream,
  MapStreamConfig,
} from "@gorundebug/tsservicelib/runtime";
import type {
  MapFunction,
} from "@gorundebug/tsservicelib/transformation";
import type { OrderState } from "#internal/types/index.generated.js";
import type { OrderItemResult } from "@gorundebug/model";

/** Produce an order result containing one inventory result and preserving its order ID.
Mark it CONFIRMED when the item was reserved; otherwise mark it PARTIALLY_CONFIRMED.
Record the time when this result is produced. */
export class MapOrderItemResultToOrderState implements MapFunction<OrderItemResult, OrderState> {
  public map(context: MessageContext, _stream: Stream, value: Readonly<OrderItemResult>, out: Collector<OrderState>): void | Promise<void> {
    return out.out(context, {
      orderId: value.orderId,
      status: value.reserved ? "CONFIRMED" : "PARTIALLY_CONFIRMED",
      confirmedItems: [value],
      totalAmount: 0,
      processedAt: new Date(),
    });
  }
}

/** Construct MapOrderItemResultToOrderState once while the service graph is initialized. */
export async function makeMapOrderItemResultToOrderState(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: MapStreamConfig,
): Promise<MapOrderItemResultToOrderState> {
  return new MapOrderItemResultToOrderState();
}
