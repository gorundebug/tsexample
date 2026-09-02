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
import type { Order, OrderState } from "#internal/types/index.generated.js";

/** Produce a TIMED_OUT order result that preserves the order ID and submitted total.
Do not add item results at this stage; results received before the timeout are included in the final response. */
export class MapToOrderState implements MapFunction<Order, OrderState> {
  public map(context: MessageContext, _stream: Stream, value: Readonly<Order>, out: Collector<OrderState>): void | Promise<void> {
    return out.out(context, {
      orderId: value.id,
      status: "TIMED_OUT",
      confirmedItems: [],
      totalAmount: value.totalAmount,
      processedAt: new Date("0001-01-01T00:00:00.000Z"),
    });
  }
}

/** Construct MapToOrderState once while the service graph is initialized. */
export async function makeMapToOrderState(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: MapStreamConfig,
): Promise<MapToOrderState> {
  return new MapToOrderState();
}
