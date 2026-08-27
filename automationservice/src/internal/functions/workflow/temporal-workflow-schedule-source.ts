/** User-owned endpoint implementation. The generator preserves this file. */

import type {
  TemporalEndpointConfig,
  MessageContext,
  RuntimeEnvironment,
  Collector,
  ScheduleEndpointFunction,
  ScheduleTrigger
} from "@gorundebug/tsservicelib/runtime/graph";

export type TemporalWorkflowScheduleSourceHandlerState = undefined;

/** Create a Workflow job message identifying the durable scheduled firing. */
export class TemporalWorkflowScheduleSource implements ScheduleEndpointFunction<string> {
  public onTrigger(
    context: MessageContext,
    trigger: Readonly<ScheduleTrigger>,
    out: Collector<string>
  ): void | Promise<void> {
    return out.out(context, `scheduled-workflow:${trigger.scheduleId}:${trigger.triggerId}`);
  }
}

/** Construct TemporalWorkflowScheduleSource once while the service graph is initialized. */
export function makeTemporalWorkflowScheduleSource(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: TemporalEndpointConfig
): TemporalWorkflowScheduleSource {
  return new TemporalWorkflowScheduleSource();
}
