/** User-owned function implementation. The generator preserves this file. */

import type {
  Collector,
  MessageContext,
  RuntimeEnvironment,
  Stream,
  CaseStreamConfig,
} from "@gorundebug/tsservicelib/runtime/graph";
import {
  type BuildSwitchFunction,
  type When,
} from "@gorundebug/tsservicelib/transformation";
import type { AnalyticsResult } from "#internal/types/index.generated.js";

/** Route high-value analytics results to the first branch and all others to the second branch. */
export class RouteAnalyticsResult implements BuildSwitchFunction<AnalyticsResult> {
  public buildSwitch(stream: Stream, whenItems: readonly When[]): (value: Readonly<AnalyticsResult>) => number {
    void stream;
    if (whenItems.length !== 2) {
      throw new Error(`analytics result case requires exactly 2 branches, got ${whenItems.length}`);
    }
    return (value) => value.total >= 50 ? 0 : 1;
  }
}

/** Construct RouteAnalyticsResult asynchronously while the service graph is initialized. */
export async function makeRouteAnalyticsResult(
  context: MessageContext,
  environment: RuntimeEnvironment,
  config: CaseStreamConfig,
): Promise<RouteAnalyticsResult> {
  void context; void environment; void config;
  return new RouteAnalyticsResult();
}
