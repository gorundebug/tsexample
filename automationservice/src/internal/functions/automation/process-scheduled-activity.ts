/** User-owned function implementation. The generator preserves this file. */

import type {
  Collector,
  MessageContext,
  RuntimeEnvironment,
  Stream,
  MapStreamConfig
} from "@gorundebug/tsservicelib/runtime/graph";
import { durableCallHeartbeat } from "@gorundebug/tsservicelib/runtime/graph";
import type { MapFunction } from "@gorundebug/tsservicelib/transformation";

/** Return the visible result of one scheduled Activity execution. */
export class ProcessScheduledActivity implements MapFunction<string, string> {
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

/** Construct ProcessScheduledActivity once while the service graph is initialized. */
export function makeProcessScheduledActivity(
  context: MessageContext,
  environment: RuntimeEnvironment,
  config: MapStreamConfig
): ProcessScheduledActivity {
  void context;
  void environment;
  void config;
  return new ProcessScheduledActivity();
}
