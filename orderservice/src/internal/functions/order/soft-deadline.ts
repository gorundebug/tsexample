/** User-owned function implementation. The generator preserves this file. */

import type {
  Collector,
  MessageContext,
  RuntimeEnvironment,
  Stream,
  DelayStreamConfig,
} from "@gorundebug/tsservicelib/runtime";
import { requireDelayStreamConfig } from "@gorundebug/tsservicelib/runtime";
import type {
  DelayFunction,
} from "@gorundebug/tsservicelib/transformation";
import type { Order } from "#internal/types/index.generated.js";

/** Trigger the timeout branch shortly before the request deadline, leaving the configured duration to assemble a response.
When no request deadline exists, use the configured duration itself. Never wait past an existing deadline. */
export class SoftDeadline implements DelayFunction<Order> {
  public duration(context: MessageContext, stream: Stream, _value: Readonly<Order>): number {
    const config = requireDelayStreamConfig(stream.config());
    const remaining = context.remainingMs();
    return remaining === undefined ? config.duration : Math.max(0, remaining - config.duration);
  }

  public delayError(_context: MessageContext, _stream: Stream, _value: Readonly<Order>, _error: unknown, _out: Collector<Order>): void {}
}

/** Construct SoftDeadline once while the service graph is initialized. */
export function makeSoftDeadline(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: DelayStreamConfig,
): SoftDeadline {
  return new SoftDeadline();
}
