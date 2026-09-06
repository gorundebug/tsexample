/** User-owned endpoint implementation. The generator preserves this file. */

import { MessageContext } from "@gorundebug/tsservicelib/runtime/graph";
import type {
  CustomEndpointConfig,
  Consumer,
  Context,
  RuntimeEnvironment,
  StreamContext,
} from "@gorundebug/tsservicelib/runtime/graph";
import type {
  DataProducer,
  EndpointHandler as CustomSourceEndpointHandler,
  ResultContext as CustomResultContext,
} from "@gorundebug/tsservicelib/datasource/localsource";
import type { AnalyticsEvent } from "#internal/types/index.generated.js";

export type AnalyticsOrdersSourceHandlerState = undefined;

/** Produce a deterministic order analytics event for the canonical join examples. */
export class AnalyticsOrdersSource implements DataProducer<AnalyticsEvent>, CustomSourceEndpointHandler<AnalyticsOrdersSourceHandlerState, AnalyticsEvent, AnalyticsEvent, Error> {
  public async start(context: Context, consumer: Consumer<AnalyticsEvent>): Promise<void> {
    const messageContext = MessageContext.fromContext(context);
    await consumer.consume(messageContext, { key: "high-value", value: 10, kind: "order" });
    await consumer.consume(messageContext, { key: "standard", value: 1, kind: "order" });
  }

  public stop(_context: Context): Promise<void> {
    return Promise.resolve();
  }

  public concurrency(_stream: StreamContext<AnalyticsEvent, AnalyticsEvent, Error>): number { return 0; }

  public beginRequest(context: MessageContext, _stream: StreamContext<AnalyticsEvent, AnalyticsEvent, Error>): { readonly context: MessageContext; readonly state: AnalyticsOrdersSourceHandlerState } {
    return { context, state: undefined };
  }

  public async consumeMessage(context: MessageContext, stream: StreamContext<AnalyticsEvent, AnalyticsEvent, Error>, _state: AnalyticsOrdersSourceHandlerState, value: Readonly<AnalyticsEvent>, result: CustomResultContext<AnalyticsOrdersSourceHandlerState, AnalyticsEvent, AnalyticsEvent, Error>): Promise<void> {
    await stream.collect(context, value);
    result.done();
  }

  public getMessageId(_context: MessageContext, _stream: StreamContext<AnalyticsEvent, AnalyticsEvent, Error>, _state: AnalyticsOrdersSourceHandlerState, _value: Readonly<AnalyticsEvent>): string {
    return "";
  }

  public endRequest(_context: MessageContext, _stream: StreamContext<AnalyticsEvent, AnalyticsEvent, Error>, _error: Error | undefined, _state: AnalyticsOrdersSourceHandlerState): void {}
}

/** Construct AnalyticsOrdersSource asynchronously while the service graph is initialized. */
export async function makeAnalyticsOrdersSource(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: CustomEndpointConfig,
): Promise<AnalyticsOrdersSource> {
  return new AnalyticsOrdersSource();
}
