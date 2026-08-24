/** User-owned endpoint implementation. The generator preserves this file. */

import type {
  TemporalEndpointConfig,
  MessageContext,
  RuntimeEnvironment,
  Collector,
  ScheduleEndpointFunction,
  ScheduleTrigger,
} from "@gorundebug/tsservicelib/runtime";

export type TemporalScheduleHandlerState = undefined;

/** Implement TemporalSchedule. */
export class TemporalSchedule implements ScheduleEndpointFunction<ScheduleTrigger> {
  public onTrigger(
    context: MessageContext,
    trigger: Readonly<ScheduleTrigger>,
    out: Collector<ScheduleTrigger>,
  ): void | Promise<void> {
    return out.out(context, trigger);
  }
}

/** Construct TemporalSchedule once while the service graph is initialized. */
export function makeTemporalSchedule(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: TemporalEndpointConfig,
): TemporalSchedule {
  return new TemporalSchedule();
}
