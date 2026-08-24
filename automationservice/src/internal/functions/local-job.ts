/** User-owned function implementation. The generator preserves this file. */

import type {
  Collector,
  MessageContext,
  RuntimeEnvironment,
  Stream,
  ScheduleTrigger,
  MapStreamConfig,
} from "@gorundebug/tsservicelib/runtime";
import type {
  MapFunction,
} from "@gorundebug/tsservicelib/transformation";

/** Create a job message identifying the local scheduled firing. */
export class LocalJob implements MapFunction<ScheduleTrigger, string> {
  public map(context: MessageContext, _stream: Stream, value: Readonly<ScheduleTrigger>, out: Collector<string>): void | Promise<void> {
    return out.out(context, `local:${value.scheduleId}:${value.triggerId}`);
  }
}

/** Construct LocalJob once while the service graph is initialized. */
export function makeLocalJob(
  context: MessageContext,
  environment: RuntimeEnvironment,
  config: MapStreamConfig,
): LocalJob {
  void context; void environment; void config;
  return new LocalJob();
}
