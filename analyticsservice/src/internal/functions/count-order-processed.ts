/** User-owned function implementation. The generator preserves this file. */

import type {
  Collector,
  MessageContext,
  RuntimeEnvironment,
  Stream,
  ProcessStreamConfig,
  Int64CounterVec,
} from "@gorundebug/tsservicelib/runtime";
import type {
  ProcessFunction,
} from "@gorundebug/tsservicelib/transformation";
import type { OrderProcessed } from "@gorundebug/model";

/** Count successful and unsuccessful orders independently, then return the event unchanged. */
export class CountOrderProcessed implements ProcessFunction<OrderProcessed, OrderProcessed, Error> {
  readonly #ordersTotal: Int64CounterVec;

  public constructor(ordersTotal: Int64CounterVec) {
    this.#ordersTotal = ordersTotal;
  }

  public process(context: MessageContext, _stream: Stream, value: Readonly<OrderProcessed>, out: Collector<OrderProcessed>, _errorOut: Collector<Error>): void | Promise<void> {
    const result = value.status === "CONFIRMED" ? "successful" : "unsuccessful";
    this.#ordersTotal.with({ result }).inc(context);
    return out.out(context, value);
  }
}

/** Construct CountOrderProcessed once while the service graph is initialized. */
export function makeCountOrderProcessed(
  _context: MessageContext,
  environment: RuntimeEnvironment,
  _config: ProcessStreamConfig,
): CountOrderProcessed {
  const counter = environment
    .metrics()
    .scope("analytics")
    .counterVec("orders_total", "Number of processed orders by result");
  return new CountOrderProcessed(counter);
}
