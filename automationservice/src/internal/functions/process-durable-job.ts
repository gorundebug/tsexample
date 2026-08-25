/** User-owned function implementation. The generator preserves this file. */

import type {
  Collector,
  MessageContext,
  RuntimeEnvironment,
  Stream,
  MapStreamConfig,
} from "@gorundebug/tsservicelib/runtime";
import { durableCallSuccess } from "@gorundebug/tsservicelib/runtime";
import type {
  MapFunction,
} from "@gorundebug/tsservicelib/transformation";

/** Process one accepted automation job and return its result. */
export class ProcessDurableJob implements MapFunction<string, string> {
  public async map(context: MessageContext, _stream: Stream, value: Readonly<string>, out: Collector<string>): Promise<void> {
    await out.out(context, `processed:${value}`);
    durableCallSuccess(context);
  }
}

/** Construct ProcessDurableJob once while the service graph is initialized. */
export function makeProcessDurableJob(
  context: MessageContext,
  environment: RuntimeEnvironment,
  config: MapStreamConfig,
): ProcessDurableJob {
  void context; void environment; void config;
  return new ProcessDurableJob();
}
