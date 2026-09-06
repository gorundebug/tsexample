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

export type AnalyticsShipmentsSourceHandlerState = undefined;

/** Produce a deterministic shipment analytics event for the canonical multi-way join example. */
export class AnalyticsShipmentsSource implements DataProducer<AnalyticsEvent>, CustomSourceEndpointHandler<AnalyticsShipmentsSourceHandlerState, AnalyticsEvent, AnalyticsEvent, Error> {
  public async start(context: Context, consumer: Consumer<AnalyticsEvent>): Promise<void> {
    const messageContext = MessageContext.fromContext(context);
    await consumer.consume(messageContext, { key: "high-value", value: 30, kind: "shipment" });
    await consumer.consume(messageContext, { key: "standard", value: 3, kind: "shipment" });
  }

  public stop(_context: Context): Promise<void> {
    return Promise.resolve();
  }

  public concurrency(_stream: StreamContext<AnalyticsEvent, AnalyticsEvent, Error>): number { return 0; }

  public beginRequest(context: MessageContext, _stream: StreamContext<AnalyticsEvent, AnalyticsEvent, Error>): { readonly context: MessageContext; readonly state: AnalyticsShipmentsSourceHandlerState } {
    return { context, state: undefined };
  }

  public async consumeMessage(context: MessageContext, stream: StreamContext<AnalyticsEvent, AnalyticsEvent, Error>, _state: AnalyticsShipmentsSourceHandlerState, value: Readonly<AnalyticsEvent>, result: CustomResultContext<AnalyticsShipmentsSourceHandlerState, AnalyticsEvent, AnalyticsEvent, Error>): Promise<void> {
    await stream.collect(context, value);
    result.done();
  }

  public getMessageId(_context: MessageContext, _stream: StreamContext<AnalyticsEvent, AnalyticsEvent, Error>, _state: AnalyticsShipmentsSourceHandlerState, _value: Readonly<AnalyticsEvent>): string {
    return "";
  }

  public endRequest(_context: MessageContext, _stream: StreamContext<AnalyticsEvent, AnalyticsEvent, Error>, _error: Error | undefined, _state: AnalyticsShipmentsSourceHandlerState): void {}
}

/** Construct AnalyticsShipmentsSource asynchronously while the service graph is initialized. */
export async function makeAnalyticsShipmentsSource(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: CustomEndpointConfig,
): Promise<AnalyticsShipmentsSource> {
  return new AnalyticsShipmentsSource();
}
