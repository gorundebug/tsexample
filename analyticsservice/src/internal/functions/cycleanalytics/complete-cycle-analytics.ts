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

/** Keep the terminal analytics event once its cycle counter reaches three. */
export class CompleteCycleAnalytics implements FilterFunction<AnalyticsEvent> {
  public filter(context: MessageContext, stream: Stream, value: Readonly<AnalyticsEvent>): boolean {
    void context; void stream;
    return value.value >= 3;
  }
}

/** Construct CompleteCycleAnalytics asynchronously while the service graph is initialized. */
export async function makeCompleteCycleAnalytics(
  context: MessageContext,
  environment: RuntimeEnvironment,
  config: FilterStreamConfig,
): Promise<CompleteCycleAnalytics> {
  void context; void environment; void config;
  return new CompleteCycleAnalytics();
}
