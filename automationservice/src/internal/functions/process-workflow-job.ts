/** User-owned function implementation. The generator preserves this file. */

import type {
  Collector,
  MessageContext,
  RuntimeEnvironment,
  Stream,
  MapStreamConfig
} from "@gorundebug/tsservicelib/runtime";
import { temporalContinueAsNew } from "@gorundebug/tsservicelib/runtime";
import type { MapFunction } from "@gorundebug/tsservicelib/transformation";

/** Continue the Workflow as new once, then return its final result. */
export class ProcessWorkflowJob implements MapFunction<string, string> {
  public async map(
    context: MessageContext,
    _stream: Stream,
    value: Readonly<string>,
    out: Collector<string>
  ): Promise<void> {
    const continuedPrefix = "continued:";
    if (!value.includes(continuedPrefix)) {
      temporalContinueAsNew(context, `${continuedPrefix}${value}`);
    }
    await out.out(context, `workflow:processed:${value.replace(continuedPrefix, "")}`);
  }
}

/** Construct ProcessWorkflowJob once while the service graph is initialized. */
export function makeProcessWorkflowJob(
  context: MessageContext,
  environment: RuntimeEnvironment,
  config: MapStreamConfig
): ProcessWorkflowJob {
  void context;
  void environment;
  void config;
  return new ProcessWorkflowJob();
}
