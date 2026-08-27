/** User-owned function implementation. The generator preserves this file. */

import type {
  Collector,
  MessageContext,
  RuntimeEnvironment,
  Stream,
  DelayStreamConfig
} from "@gorundebug/tsservicelib/runtime/graph";
import { requireDelayStreamConfig } from "@gorundebug/tsservicelib/runtime/graph";
import type { DelayFunction } from "@gorundebug/tsservicelib/transformation";

/** Use the same Delay contract backed by the Temporal Workflow timer. */
export class WorkflowPause implements DelayFunction<string> {
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

/** Construct WorkflowPause once while the service graph is initialized. */
export function makeWorkflowPause(
  context: MessageContext,
  environment: RuntimeEnvironment,
  config: DelayStreamConfig
): WorkflowPause {
  void context;
  void environment;
  void config;
  return new WorkflowPause();
}
