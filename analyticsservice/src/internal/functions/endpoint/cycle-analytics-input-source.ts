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

export type CycleAnalyticsInputSourceHandlerState = undefined;

/** Produce one deterministic analytics event that exercises the finite feedback cycle. */
export class CycleAnalyticsInputSource implements DataProducer<AnalyticsEvent>, CustomSourceEndpointHandler<CycleAnalyticsInputSourceHandlerState, AnalyticsEvent, AnalyticsEvent, Error> {
  public async start(context: Context, consumer: Consumer<AnalyticsEvent>): Promise<void> {
    await consumer.consume(MessageContext.fromContext(context), { key: "cycle", value: 0, kind: "cycle" });
  }

  public stop(_context: Context): Promise<void> {
    return Promise.resolve();
  }

  public concurrency(_stream: StreamContext<AnalyticsEvent, AnalyticsEvent, Error>): number { return 0; }

  public beginRequest(context: MessageContext, _stream: StreamContext<AnalyticsEvent, AnalyticsEvent, Error>): { readonly context: MessageContext; readonly state: CycleAnalyticsInputSourceHandlerState } {
    return { context, state: undefined };
  }

  public async consumeMessage(context: MessageContext, stream: StreamContext<AnalyticsEvent, AnalyticsEvent, Error>, _state: CycleAnalyticsInputSourceHandlerState, value: Readonly<AnalyticsEvent>, result: CustomResultContext<CycleAnalyticsInputSourceHandlerState, AnalyticsEvent, AnalyticsEvent, Error>): Promise<void> {
    await stream.collect(context, value);
    result.done();
  }

  public getMessageId(_context: MessageContext, _stream: StreamContext<AnalyticsEvent, AnalyticsEvent, Error>, _state: CycleAnalyticsInputSourceHandlerState, _value: Readonly<AnalyticsEvent>): string {
    return "";
  }

  public endRequest(_context: MessageContext, _stream: StreamContext<AnalyticsEvent, AnalyticsEvent, Error>, _error: Error | undefined, _state: CycleAnalyticsInputSourceHandlerState): void {}
}

/** Construct CycleAnalyticsInputSource asynchronously while the service graph is initialized. */
export async function makeCycleAnalyticsInputSource(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: CustomEndpointConfig,
): Promise<CycleAnalyticsInputSource> {
  return new CycleAnalyticsInputSource();
}
