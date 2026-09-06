/** User-owned function implementation. The generator preserves this file. */

import type {
  Collector,
  MessageContext,
  RuntimeEnvironment,
  Stream,
  KeyByStreamConfig,
} from "@gorundebug/tsservicelib/runtime/graph";
import type {
  KeyByFunction,
} from "@gorundebug/tsservicelib/transformation";
import type { AnalyticsEvent } from "#internal/types/index.generated.js";
import type { KeyValue } from "@gorundebug/tsservicelib/runtime/graph";

/** Key the shipment analytics event for the multi-way join. */
export class KeyShipmentsForMultiJoin implements KeyByFunction<AnalyticsEvent, string, AnalyticsEvent> {
  public keyBy(context: MessageContext, _stream: Stream, value: Readonly<AnalyticsEvent>, out: Collector<KeyValue<string, AnalyticsEvent>>): void | Promise<void> {
    return out.out(context, { key: value.key, value });
  }
}

/** Construct KeyShipmentsForMultiJoin asynchronously while the service graph is initialized. */
export async function makeKeyShipmentsForMultiJoin(
  context: MessageContext,
  environment: RuntimeEnvironment,
  config: KeyByStreamConfig,
): Promise<KeyShipmentsForMultiJoin> {
  void context; void environment; void config;
  return new KeyShipmentsForMultiJoin();
}
