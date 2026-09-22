/** User-owned function implementation. The generator preserves this file. */

import type { Collector, MessageContext, RuntimeEnvironment, Stream } from "@gorundebug/tsservicelib/runtime/graph";
import type { MapFunction } from "@gorundebug/tsservicelib/transformation";

/** Return Activity B's typed fan-out result. */
export class ProcessFanoutActivityB implements MapFunction<string, string> {
  public map(
    context: MessageContext,
    _stream: Stream,
    value: Readonly<string>,
    out: Collector<string>
  ): void | Promise<void> {
    return out.out(context, "fanout:b:" + value);
  }
}

/** Construct ProcessFanoutActivityB once while the service graph is initialized. */
export async function makeProcessFanoutActivityB(
  context: MessageContext,
  environment: RuntimeEnvironment
): Promise<ProcessFanoutActivityB> {
  void context;
  void environment;

  return new ProcessFanoutActivityB();
}
