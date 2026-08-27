/** User-owned function implementation. The generator preserves this file. */

import type {
  Collector,
  MessageContext,
  RuntimeEnvironment,
  Stream,
  MapStreamConfig
} from "@gorundebug/tsservicelib/runtime/graph";
import type { MapFunction } from "@gorundebug/tsservicelib/transformation";

/** Return the visible result of one scheduled Workflow execution. */
export class ProcessScheduledWorkflow implements MapFunction<string, string> {
  public map(
    context: MessageContext,
    _stream: Stream,
    value: Readonly<string>,
    out: Collector<string>
  ): void | Promise<void> {
    return out.out(context, `workflow:processed:${value}`);
  }
}

/** Construct ProcessScheduledWorkflow once while the service graph is initialized. */
export function makeProcessScheduledWorkflow(
  context: MessageContext,
  environment: RuntimeEnvironment,
  config: MapStreamConfig
): ProcessScheduledWorkflow {
  void context;
  void environment;
  void config;
  return new ProcessScheduledWorkflow();
}
