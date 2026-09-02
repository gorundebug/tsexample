/** User-owned endpoint implementation. The generator preserves this file. */

import type {
  TemporalEndpointConfig,
  MessageContext,
  RuntimeEnvironment,
  Collector,
  ScheduleEndpointFunction,
  ScheduleTrigger
} from "@gorundebug/tsservicelib/runtime/graph";
import { durableCallHeartbeat } from "@gorundebug/tsservicelib/runtime/graph";

export type TemporalActivityScheduleSourceHandlerState = undefined;

/** Create an Activity job message identifying the durable scheduled firing. */
export class TemporalActivityScheduleSource implements ScheduleEndpointFunction<string> {
  public onTrigger(
    context: MessageContext,
    trigger: Readonly<ScheduleTrigger>,
    out: Collector<string>
  ): void | Promise<void> {
    durableCallHeartbeat(context, `scheduled:${trigger.triggerId}`);
    return out.out(context, `scheduled-activity:${trigger.scheduleId}:${trigger.triggerId}`);
  }
}

/** Construct TemporalActivityScheduleSource once while the service graph is initialized. */
export async function makeTemporalActivityScheduleSource(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: TemporalEndpointConfig
): Promise<TemporalActivityScheduleSource> {
  return new TemporalActivityScheduleSource();
}
