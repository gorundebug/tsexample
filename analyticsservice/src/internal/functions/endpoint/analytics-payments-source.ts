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

export type AnalyticsPaymentsSourceHandlerState = undefined;

/** Produce a deterministic payment analytics event for the canonical join examples. */
export class AnalyticsPaymentsSource implements DataProducer<AnalyticsEvent>, CustomSourceEndpointHandler<AnalyticsPaymentsSourceHandlerState, AnalyticsEvent, AnalyticsEvent, Error> {
  public async start(context: Context, consumer: Consumer<AnalyticsEvent>): Promise<void> {
    const messageContext = MessageContext.fromContext(context);
    await consumer.consume(messageContext, { key: "high-value", value: 20, kind: "payment" });
    await consumer.consume(messageContext, { key: "standard", value: 2, kind: "payment" });
  }

  public stop(_context: Context): Promise<void> {
    return Promise.resolve();
  }

  public concurrency(_stream: StreamContext<AnalyticsEvent, AnalyticsEvent, Error>): number { return 0; }

  public beginRequest(context: MessageContext, _stream: StreamContext<AnalyticsEvent, AnalyticsEvent, Error>): { readonly context: MessageContext; readonly state: AnalyticsPaymentsSourceHandlerState } {
    return { context, state: undefined };
  }

  public async consumeMessage(context: MessageContext, stream: StreamContext<AnalyticsEvent, AnalyticsEvent, Error>, _state: AnalyticsPaymentsSourceHandlerState, value: Readonly<AnalyticsEvent>, result: CustomResultContext<AnalyticsPaymentsSourceHandlerState, AnalyticsEvent, AnalyticsEvent, Error>): Promise<void> {
    await stream.collect(context, value);
    result.done();
  }

  public getMessageId(_context: MessageContext, _stream: StreamContext<AnalyticsEvent, AnalyticsEvent, Error>, _state: AnalyticsPaymentsSourceHandlerState, _value: Readonly<AnalyticsEvent>): string {
    return "";
  }

  public endRequest(_context: MessageContext, _stream: StreamContext<AnalyticsEvent, AnalyticsEvent, Error>, _error: Error | undefined, _state: AnalyticsPaymentsSourceHandlerState): void {}
}

/** Construct AnalyticsPaymentsSource asynchronously while the service graph is initialized. */
export async function makeAnalyticsPaymentsSource(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: CustomEndpointConfig,
): Promise<AnalyticsPaymentsSource> {
  return new AnalyticsPaymentsSource();
}
