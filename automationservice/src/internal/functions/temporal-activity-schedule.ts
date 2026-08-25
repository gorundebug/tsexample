/** User-owned endpoint implementation. The generator preserves this file. */

import type {
  TemporalEndpointConfig,
  MessageContext,
  RuntimeEnvironment,
  Collector,
  ScheduleEndpointFunction,
  ScheduleTrigger
} from "@gorundebug/tsservicelib/runtime";

export type TemporalActivityScheduleHandlerState = undefined;

/** Create an Activity job message identifying the durable scheduled firing. */
export class TemporalActivitySchedule implements ScheduleEndpointFunction<string> {
  public onTrigger(
    context: MessageContext,
    trigger: Readonly<ScheduleTrigger>,
    out: Collector<string>
  ): void | Promise<void> {
    return out.out(context, `scheduled-activity:${trigger.scheduleId}:${trigger.triggerId}`);
  }
}

/** Construct TemporalActivitySchedule once while the service graph is initialized. */
export function makeTemporalActivitySchedule(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: TemporalEndpointConfig
): TemporalActivitySchedule {
  return new TemporalActivitySchedule();
}
