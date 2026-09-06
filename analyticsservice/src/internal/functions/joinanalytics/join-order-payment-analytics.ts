/** User-owned function implementation. The generator preserves this file. */

import type {
  Collector,
  MessageContext,
  RuntimeEnvironment,
  Stream,
  JoinStreamConfig,
} from "@gorundebug/tsservicelib/runtime/graph";
import type {
  JoinFunction,
} from "@gorundebug/tsservicelib/transformation";
import type { AnalyticsEvent, AnalyticsResult } from "#internal/types/index.generated.js";

/** Join matching order and payment analytics events and emit their combined total. */
export class JoinOrderPaymentAnalytics implements JoinFunction<string, AnalyticsEvent, AnalyticsEvent, AnalyticsResult> {
  public async join(context: MessageContext, _stream: Stream, key: string, left: readonly Readonly<AnalyticsEvent>[], right: readonly Readonly<AnalyticsEvent>[], out: Collector<AnalyticsResult>): Promise<boolean> {
    if (left.length === 0 || right.length === 0) return false;
    await out.out(context, { key, total: left[0]!.value + right[0]!.value, kind: "join" });
    return true;
  }
}

/** Construct JoinOrderPaymentAnalytics asynchronously while the service graph is initialized. */
export async function makeJoinOrderPaymentAnalytics(
  context: MessageContext,
  environment: RuntimeEnvironment,
  config: JoinStreamConfig,
): Promise<JoinOrderPaymentAnalytics> {
  void context; void environment; void config;
  return new JoinOrderPaymentAnalytics();
}
