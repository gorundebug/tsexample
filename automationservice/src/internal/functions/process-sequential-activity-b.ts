/** User-owned function implementation. The generator preserves this file. */

import type {
  Collector,
  MessageContext,
  RuntimeEnvironment,
  Stream,
  MapStreamConfig
} from "@gorundebug/tsservicelib/runtime/graph";
import type { MapFunction } from "@gorundebug/tsservicelib/transformation";

/** Return sequential Activity B's typed result to its Temporal sink. */
export class ProcessSequentialActivityB implements MapFunction<string, string> {
  public map(
    context: MessageContext,
    _stream: Stream,
    value: Readonly<string>,
    out: Collector<string>
  ): void | Promise<void> {
    return out.out(context, "sequential:b:" + value);
  }
}

/** Construct ProcessSequentialActivityB once while the service graph is initialized. */
export function makeProcessSequentialActivityB(
  context: MessageContext,
  environment: RuntimeEnvironment,
  config: MapStreamConfig
): ProcessSequentialActivityB {
  void context;
  void environment;
  void config;
  return new ProcessSequentialActivityB();
}
