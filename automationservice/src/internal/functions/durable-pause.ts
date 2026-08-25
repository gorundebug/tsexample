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

/** Suspend a DurableCall through a Temporal timer, then resume the pipeline without occupying an Activity slot. */
export class DurablePause implements DelayFunction<string> {
  public duration(_context: MessageContext, stream: Stream, _value: Readonly<string>): number {
    return requireDelayStreamConfig(stream.config()).duration;
  }

  public delayError(
    context: MessageContext,
    _stream: Stream,
    _value: Readonly<string>,
    error: unknown,
    _out: Collector<string>
  ): void {
    void context;
    void error;
  }
}

/** Construct DurablePause once while the service graph is initialized. */
export function makeDurablePause(
  context: MessageContext,
  environment: RuntimeEnvironment,
  config: DelayStreamConfig
): DurablePause {
  void context;
  void environment;
  void config;
  return new DurablePause();
}
