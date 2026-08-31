/** User-owned function implementation. The generator preserves this file. */

import type {
  Collector,
  MessageContext,
  RuntimeEnvironment,
  Stream,
  FlatMapStreamConfig,
} from "@gorundebug/tsservicelib/runtime";
import type {
  FlatMapFunction,
} from "@gorundebug/tsservicelib/transformation";
import type { Order } from "#internal/types/index.generated.js";
import type { OrderItem } from "@gorundebug/model";

/** Emit every order item independently for inventory processing.
Preserve each item's data and assign the parent order ID. */
export class ProcessOrderItems implements FlatMapFunction<Order, OrderItem> {
  public async flatMap(context: MessageContext, _stream: Stream, value: Readonly<Order>, out: Collector<OrderItem>): Promise<void> {
    for (const item of value.items) {
      await out.out(context, { ...item, orderId: value.id });
    }
  }
}

/** Construct ProcessOrderItems once while the service graph is initialized. */
export function makeProcessOrderItems(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: FlatMapStreamConfig,
): ProcessOrderItems {
  return new ProcessOrderItems();
}
