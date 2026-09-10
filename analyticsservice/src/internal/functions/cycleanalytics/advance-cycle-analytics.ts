/** User-owned function implementation. The generator preserves this file. */

import type {
  Collector,
  MessageContext,
  RuntimeEnvironment,
  Stream,
  MapStreamConfig,
} from "@gorundebug/tsservicelib/runtime/graph";
import type {
  MapFunction,
} from "@gorundebug/tsservicelib/transformation";
import type { AnalyticsEvent } from "#internal/types/index.generated.js";

/** Increment the cycle counter while preserving the analytics event identity. */
export class AdvanceCycleAnalytics implements MapFunction<AnalyticsEvent, AnalyticsEvent> {
  public map(context: MessageContext, stream: Stream, value: Readonly<AnalyticsEvent>, out: Collector<AnalyticsEvent>): void | Promise<void> {
    void stream;
    return out.out(context, { key: value.key, value: value.value + 1, kind: value.kind });
  }
}

/** Construct AdvanceCycleAnalytics asynchronously while the service graph is initialized. */
export async function makeAdvanceCycleAnalytics(
  context: MessageContext,
  environment: RuntimeEnvironment,
  config: MapStreamConfig,
): Promise<AdvanceCycleAnalytics> {
  void context; void environment; void config;
  return new AdvanceCycleAnalytics();
}
