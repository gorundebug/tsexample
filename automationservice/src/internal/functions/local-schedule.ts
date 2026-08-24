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

/** Implement LocalSchedule. */
export class LocalSchedule implements ScheduleEndpointFunction<ScheduleTrigger> {
  public onTrigger(
    context: MessageContext,
    trigger: Readonly<ScheduleTrigger>,
    out: Collector<ScheduleTrigger>,
  ): void | Promise<void> {
    return out.out(context, trigger);
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
