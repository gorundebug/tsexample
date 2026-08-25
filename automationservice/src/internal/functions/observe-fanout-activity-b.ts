/** User-owned function implementation. The generator preserves this file. */

import type {
  Collector,
  MessageContext,
  RuntimeEnvironment,
  Stream,
  MapStreamConfig
} from "@gorundebug/tsservicelib/runtime";
import type { MapFunction } from "@gorundebug/tsservicelib/transformation";

/** Observe the typed result returned by the Activity B fan-out branch. */
export class ObserveFanoutActivityB implements MapFunction<string, string> {
  public map(
    context: MessageContext,
    _stream: Stream,
    value: Readonly<string>,
    out: Collector<string>
  ): void | Promise<void> {
    return out.out(context, value);
  }
}

/** Construct ObserveFanoutActivityB once while the service graph is initialized. */
export function makeObserveFanoutActivityB(
  context: MessageContext,
  environment: RuntimeEnvironment,
  config: MapStreamConfig
): ObserveFanoutActivityB {
  void context;
  void environment;
  void config;
  return new ObserveFanoutActivityB();
}
