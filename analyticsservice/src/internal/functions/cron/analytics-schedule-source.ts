/** User-owned endpoint implementation. The generator preserves this file. */

import type {
  CronEndpointConfig,
  MessageContext,
  RuntimeEnvironment,
  Collector,
  ScheduleEndpointFunction,
  ScheduleTrigger,
} from "@gorundebug/tsservicelib/runtime/graph";

export type AnalyticsScheduleSourceHandlerState = undefined;

/** Create an analytics job message identifying the local scheduled firing. */
export class AnalyticsScheduleSource implements ScheduleEndpointFunction<string> {
  public onTrigger(
    context: MessageContext,
    trigger: Readonly<ScheduleTrigger>,
    out: Collector<string>,
  ): void | Promise<void> {
    return out.out(context, `analytics:${trigger.scheduleId}:${trigger.triggerId}`);
  }
}

/** Construct AnalyticsScheduleSource once while the service graph is initialized. */
export function makeAnalyticsScheduleSource(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: CronEndpointConfig,
): AnalyticsScheduleSource {
  return new AnalyticsScheduleSource();
}
