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

/** Create a job message identifying the durable scheduled firing. */
export class TemporalJob implements MapFunction<ScheduleTrigger, string> {
  public map(context: MessageContext, _stream: Stream, value: Readonly<ScheduleTrigger>, out: Collector<string>): void | Promise<void> {
    return out.out(context, `temporal:${value.scheduleId}:${value.triggerId}`);
  }
}

/** Construct TemporalJob once while the service graph is initialized. */
export function makeTemporalJob(
  context: MessageContext,
  environment: RuntimeEnvironment,
  config: MapStreamConfig,
): TemporalJob {
  void context; void environment; void config;
  return new TemporalJob();
}
