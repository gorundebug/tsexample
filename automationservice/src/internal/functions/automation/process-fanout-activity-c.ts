/** User-owned function implementation. The generator preserves this file. */

import type {
  Collector,
  MessageContext,
  RuntimeEnvironment,
  Stream,
  MapStreamConfig
} from "@gorundebug/tsservicelib/runtime/graph";
import type { MapFunction } from "@gorundebug/tsservicelib/transformation";

/** Return Activity C's typed fan-out result. */
export class ProcessFanoutActivityC implements MapFunction<string, string> {
  public map(
    context: MessageContext,
    _stream: Stream,
    value: Readonly<string>,
    out: Collector<string>
  ): void | Promise<void> {
    return out.out(context, "fanout:c:" + value);
  }
}

/** Construct ProcessFanoutActivityC once while the service graph is initialized. */
export async function makeProcessFanoutActivityC(
  context: MessageContext,
  environment: RuntimeEnvironment,
  config: MapStreamConfig
): Promise<ProcessFanoutActivityC> {
  void context;
  void environment;
  void config;
  return new ProcessFanoutActivityC();
}
