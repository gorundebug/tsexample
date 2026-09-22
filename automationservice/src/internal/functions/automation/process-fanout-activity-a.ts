/** User-owned function implementation. The generator preserves this file. */

import type { Collector, MessageContext, RuntimeEnvironment, Stream } from "@gorundebug/tsservicelib/runtime/graph";
import type { MapFunction } from "@gorundebug/tsservicelib/transformation";

/** Return Activity A's typed result before the Workflow Split. */
export class ProcessFanoutActivityA implements MapFunction<string, string> {
  public map(
    context: MessageContext,
    _stream: Stream,
    value: Readonly<string>,
    out: Collector<string>
  ): void | Promise<void> {
    return out.out(context, "fanout:a:" + value);
  }
}

/** Construct ProcessFanoutActivityA once while the service graph is initialized. */
export async function makeProcessFanoutActivityA(
  context: MessageContext,
  environment: RuntimeEnvironment
): Promise<ProcessFanoutActivityA> {
  void context;
  void environment;

  return new ProcessFanoutActivityA();
}
