/** User-owned function implementation. The generator preserves this file. */

import type {
  Collector,
  MessageContext,
  RuntimeEnvironment,
  Stream,
  FilterStreamConfig,
} from "@gorundebug/tsservicelib/runtime/graph";
import type {
  FilterFunction,
} from "@gorundebug/tsservicelib/transformation";
import type { AnalyticsEvent } from "#internal/types/index.generated.js";

/** Keep intermediate analytics events whose cycle counter is below three. */
export class ContinueCycleAnalytics implements FilterFunction<AnalyticsEvent> {
  public filter(context: MessageContext, stream: Stream, value: Readonly<AnalyticsEvent>): boolean {
    void context; void stream;
    return value.value < 3;
  }
}

/** Construct ContinueCycleAnalytics asynchronously while the service graph is initialized. */
export async function makeContinueCycleAnalytics(
  context: MessageContext,
  environment: RuntimeEnvironment,
  config: FilterStreamConfig,
): Promise<ContinueCycleAnalytics> {
  void context; void environment; void config;
  return new ContinueCycleAnalytics();
}
