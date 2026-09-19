/** User-owned function implementation. The generator preserves this file. */

import type {
  Collector,
  MessageContext,
  RuntimeEnvironment,
  Stream,
  MapStreamConfig,
} from "@gorundebug/tsservicelib/runtime/graph";
import type { SubStream } from "@gorundebug/tsservicelib/runtime/graph";
import { SubStreamCollectorFunc } from "@gorundebug/tsservicelib/runtime/graph";
import type {
  MapFunction,
} from "@gorundebug/tsservicelib/transformation";
import type { AnalyticsEvent, AnalyticsResult } from "#internal/types/index.generated.js";

/** Invoke the service-local analytics SubStream and emit its returned result. */
export class InvokeAnalyticsSubstream implements MapFunction<AnalyticsEvent, AnalyticsResult> {
  public constructor(private readonly substream: SubStream<AnalyticsEvent, AnalyticsResult>) {}

  public map(context: MessageContext, stream: Stream, value: Readonly<AnalyticsEvent>, out: Collector<AnalyticsResult>): void | Promise<void> {
    void stream;
    return this.substream.consume(context, value, new SubStreamCollectorFunc(
      async (resultContext, result) => {
        await out.out(resultContext, result);
        return true;
      },
    ));
  }
}

/** Construct InvokeAnalyticsSubstream asynchronously while the service graph is initialized. */
export async function makeInvokeAnalyticsSubstream(
  context: MessageContext,
  environment: RuntimeEnvironment,
  config: MapStreamConfig,
): Promise<InvokeAnalyticsSubstream> {
  void context; void environment; void config;
  throw new Error(
    "InvokeAnalyticsSubstream must be constructed by Service.customMakersInit with the analyzeAnalyticsSubstream handle",
  );
}
