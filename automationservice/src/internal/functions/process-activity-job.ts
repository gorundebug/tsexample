/** User-owned function implementation. The generator preserves this file. */

import type {
  Collector,
  MessageContext,
  RuntimeEnvironment,
  Stream,
  MapStreamConfig
} from "@gorundebug/tsservicelib/runtime";
import { durableCallHeartbeat } from "@gorundebug/tsservicelib/runtime";
import type { MapFunction } from "@gorundebug/tsservicelib/transformation";

/** Record Activity progress with DurableCallHeartbeat and return the processed job result. */
export class ProcessActivityJob implements MapFunction<string, string> {
  public async map(
    context: MessageContext,
    _stream: Stream,
    value: Readonly<string>,
    out: Collector<string>
  ): Promise<void> {
    durableCallHeartbeat(context, `processing:${value}`);
    await out.out(context, `activity:processed:${value}`);
  }
}

/** Construct ProcessActivityJob once while the service graph is initialized. */
export function makeProcessActivityJob(
  context: MessageContext,
  environment: RuntimeEnvironment,
  config: MapStreamConfig
): ProcessActivityJob {
  void context;
  void environment;
  void config;
  return new ProcessActivityJob();
}
