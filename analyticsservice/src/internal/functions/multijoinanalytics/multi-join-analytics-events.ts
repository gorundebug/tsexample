/** User-owned function implementation. The generator preserves this file. */

import type {
  Collector,
  MessageContext,
  RuntimeEnvironment,
  Stream,
  MultiJoinStreamConfig,
} from "@gorundebug/tsservicelib/runtime/graph";
import type {
  MultiJoinFunction,
} from "@gorundebug/tsservicelib/transformation";
import type { AnalyticsEvent, AnalyticsResult } from "#internal/types/index.generated.js";

/** Combine matching order, payment, and shipment analytics events. */
export class MultiJoinAnalyticsEvents implements MultiJoinFunction<string, AnalyticsEvent, AnalyticsResult> {
  public async multiJoin(context: MessageContext, _stream: Stream, key: string, values: readonly [readonly Readonly<AnalyticsEvent>[], ...(readonly (readonly unknown[])[])], out: Collector<AnalyticsResult>): Promise<boolean> {
    if (values.length !== 3 || values.some((group) => group.length === 0)) return false;
    const order = values[0]![0] as Readonly<AnalyticsEvent>;
    const payment = values[1]![0] as Readonly<AnalyticsEvent>;
    const shipment = values[2]![0] as Readonly<AnalyticsEvent>;
    await out.out(context, { key, total: order.value + payment.value + shipment.value, kind: "multi" });
    return true;
  }
}

/** Construct MultiJoinAnalyticsEvents asynchronously while the service graph is initialized. */
export async function makeMultiJoinAnalyticsEvents(
  context: MessageContext,
  environment: RuntimeEnvironment,
  config: MultiJoinStreamConfig,
): Promise<MultiJoinAnalyticsEvents> {
  void context; void environment; void config;
  return new MultiJoinAnalyticsEvents();
}
