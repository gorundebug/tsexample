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
import type { OrderState } from "../../types/index.generated.js";
import type { OrderProcessed } from "@gorundebug/model";

/** Create an OrderProcessed event from the final order state.
Preserve the order ID, status, and processing time. Count all item results and reserved items; for unsuccessful orders use the final status as the failure reason. */
export class MapToOrderProcessed implements MapFunction<OrderState, OrderProcessed> {
  public map(context: MessageContext, _stream: Stream, value: Readonly<OrderState>, out: Collector<OrderProcessed>): void | Promise<void> {
    const confirmedItems = value.confirmedItems.reduce(
      (count, item) => count + (item.reserved ? 1 : 0),
      0,
    );
    return out.out(context, {
      orderId: value.orderId,
      status: value.status,
      processedAt: value.processedAt,
      totalItems: value.confirmedItems.length,
      confirmedItems,
      failureReason: value.status === "CONFIRMED" ? "" : value.status,
    });
  }
}

/** Construct MapToOrderProcessed once while the service graph is initialized. */
export function makeMapToOrderProcessed(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: MapStreamConfig,
): MapToOrderProcessed {
  return new MapToOrderProcessed();
}
