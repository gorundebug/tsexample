/** User-owned endpoint implementation. The generator preserves this file. */

import type {
  CronEndpointConfig,
  MessageContext,
  RuntimeEnvironment,
  Collector,
  ScheduleEndpointFunction,
  ScheduleTrigger,
} from "@gorundebug/tsservicelib/runtime";

export type LocalScheduleHandlerState = undefined;

/** Create a job message identifying the local scheduled firing. */
export class LocalSchedule implements ScheduleEndpointFunction<string> {
  public onTrigger(
    context: MessageContext,
    trigger: Readonly<ScheduleTrigger>,
    out: Collector<string>,
  ): void | Promise<void> {
    return out.out(context, `local:${trigger.scheduleId}:${trigger.triggerId}`);
  }
}

/** Construct LocalSchedule once while the service graph is initialized. */
export function makeLocalSchedule(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: CronEndpointConfig,
): LocalSchedule {
  return new LocalSchedule();
}
