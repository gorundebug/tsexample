/** User-owned function implementation. The generator preserves this file. */

import type {
  Collector,
  MessageContext,
  RuntimeEnvironment,
  Stream,
  MapStreamConfig
} from "@gorundebug/tsservicelib/runtime/graph";
import type { MapFunction } from "@gorundebug/tsservicelib/transformation";

/** Preserve the result returned through the on-demand Workflow endpoint. */
export class ObserveWorkflowResult implements MapFunction<string, string> {
  public map(
    context: MessageContext,
    _stream: Stream,
    value: Readonly<string>,
    out: Collector<string>
  ): void | Promise<void> {
    return out.out(context, value);
  }
}

/** Construct ObserveWorkflowResult once while the service graph is initialized. */
export function makeObserveWorkflowResult(
  context: MessageContext,
  environment: RuntimeEnvironment,
  config: MapStreamConfig
): ObserveWorkflowResult {
  void context;
  void environment;
  void config;
  return new ObserveWorkflowResult();
}
