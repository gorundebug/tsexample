/** User-owned function implementation. The generator preserves this file. */

import type {
  Collector,
  MessageContext,
  RuntimeEnvironment,
  Stream,
  DelayStreamConfig
} from "@gorundebug/tsservicelib/runtime";
import { requireDelayStreamConfig } from "@gorundebug/tsservicelib/runtime";
import type { DelayFunction } from "@gorundebug/tsservicelib/transformation";

/** Use the official Temporal Workflow timer for a scheduled Workflow. */
export class ScheduledWorkflowPause implements DelayFunction<string> {
  public duration(_context: MessageContext, stream: Stream, _value: Readonly<string>): number {
    return requireDelayStreamConfig(stream.config()).duration;
  }

  public delayError(
    _context: MessageContext,
    _stream: Stream,
    _value: Readonly<string>,
    _error: unknown,
    _out: Collector<string>
  ): void {}
}

/** Construct ScheduledWorkflowPause once while the service graph is initialized. */
export function makeScheduledWorkflowPause(
  context: MessageContext,
  environment: RuntimeEnvironment,
  config: DelayStreamConfig
): ScheduledWorkflowPause {
  void context;
  void environment;
  void config;
  return new ScheduledWorkflowPause();
}
