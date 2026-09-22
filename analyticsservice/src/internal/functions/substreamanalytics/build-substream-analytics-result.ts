/** User-owned function implementation. The generator preserves this file. */

import type { Collector, MessageContext, RuntimeEnvironment, Stream } from "@gorundebug/tsservicelib/runtime/graph";
import type {
  MapFunction,
} from "@gorundebug/tsservicelib/transformation";
import type { AnalyticsEvent, AnalyticsResult } from "#internal/types/index.generated.js";

/** Transform one callable SubStream input into its analytics result. */
export class BuildSubstreamAnalyticsResult implements MapFunction<AnalyticsEvent, AnalyticsResult> {
  public map(context: MessageContext, stream: Stream, value: Readonly<AnalyticsEvent>, out: Collector<AnalyticsResult>): void | Promise<void> {
    void stream;
    return out.out(context, {
      key: value.key,
      total: value.value * 2,
      kind: "substream",
    });
  }
}

/** Construct BuildSubstreamAnalyticsResult asynchronously while the service graph is initialized. */
export async function makeBuildSubstreamAnalyticsResult(
  context: MessageContext,
  environment: RuntimeEnvironment,
): Promise<BuildSubstreamAnalyticsResult> {
  void context; void environment;
  return new BuildSubstreamAnalyticsResult();
}
