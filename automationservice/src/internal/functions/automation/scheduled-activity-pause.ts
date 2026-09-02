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

/** Apply the ordinary local Delay inside an Activity started by Temporal Schedule. */
export class ScheduledActivityPause implements DelayFunction<string> {
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

/** Construct ScheduledActivityPause once while the service graph is initialized. */
export async function makeScheduledActivityPause(
  context: MessageContext,
  environment: RuntimeEnvironment,
  config: DelayStreamConfig
): Promise<ScheduledActivityPause> {
  void context;
  void environment;
  void config;
  return new ScheduledActivityPause();
}
