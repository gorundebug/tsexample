/** User-owned endpoint implementation. The generator preserves this file. */

import type {
  TemporalEndpointConfig,
  MessageContext,
  RuntimeEnvironment,
  Collector,
  ScheduleEndpointFunction,
  ScheduleTrigger
} from "@gorundebug/tsservicelib/runtime";
import { durableCallSuccess } from "@gorundebug/tsservicelib/runtime";

export type TemporalScheduleHandlerState = undefined;

/** Create a job message identifying the durable scheduled firing. */
export class TemporalSchedule implements ScheduleEndpointFunction<string> {
  public async onTrigger(
    context: MessageContext,
    trigger: Readonly<ScheduleTrigger>,
    out: Collector<string>
  ): Promise<void> {
    await out.out(context, `temporal:${trigger.scheduleId}:${trigger.triggerId}`);
    durableCallSuccess(context);
  }
}

/** Construct TemporalSchedule once while the service graph is initialized. */
export function makeTemporalSchedule(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: TemporalEndpointConfig
): TemporalSchedule {
  return new TemporalSchedule();
}
