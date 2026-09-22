/** User-owned function implementation. The generator preserves this file. */

import type { Collector, MessageContext, RuntimeEnvironment, Stream } from "@gorundebug/tsservicelib/runtime/graph";
import type {
  KeyByFunction,
} from "@gorundebug/tsservicelib/transformation";
import type { AnalyticsEvent } from "#internal/types/index.generated.js";
import type { KeyValue } from "@gorundebug/tsservicelib/runtime/graph";

/** Key the payment analytics event for the multi-way join. */
export class KeyPaymentsForMultiJoin implements KeyByFunction<AnalyticsEvent, string, AnalyticsEvent> {
  public keyBy(context: MessageContext, _stream: Stream, value: Readonly<AnalyticsEvent>, out: Collector<KeyValue<string, AnalyticsEvent>>): void | Promise<void> {
    return out.out(context, { key: value.key, value });
  }
}

/** Construct KeyPaymentsForMultiJoin asynchronously while the service graph is initialized. */
export async function makeKeyPaymentsForMultiJoin(
  context: MessageContext,
  environment: RuntimeEnvironment,
): Promise<KeyPaymentsForMultiJoin> {
  void context; void environment;
  return new KeyPaymentsForMultiJoin();
}
