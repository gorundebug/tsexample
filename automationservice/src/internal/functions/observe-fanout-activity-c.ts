/** User-owned function implementation. The generator preserves this file. */

import type {
  Collector,
  MessageContext,
  RuntimeEnvironment,
  Stream,
  MapStreamConfig
} from "@gorundebug/tsservicelib/runtime/graph";
import type { MapFunction } from "@gorundebug/tsservicelib/transformation";

/** Observe the typed result returned by the Activity C fan-out branch. */
export class ObserveFanoutActivityC implements MapFunction<string, string> {
  public map(
    context: MessageContext,
    _stream: Stream,
    value: Readonly<string>,
    out: Collector<string>
  ): void | Promise<void> {
    return out.out(context, value);
  }
}

/** Construct ObserveFanoutActivityC once while the service graph is initialized. */
export function makeObserveFanoutActivityC(
  context: MessageContext,
  environment: RuntimeEnvironment,
  config: MapStreamConfig
): ObserveFanoutActivityC {
  void context;
  void environment;
  void config;
  return new ObserveFanoutActivityC();
}
