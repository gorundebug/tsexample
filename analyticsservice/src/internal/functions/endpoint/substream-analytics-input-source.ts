/** User-owned endpoint implementation. The generator preserves this file. */

import type { Consumer, Context, MessageContext, RuntimeEnvironment, StreamContext } from "@gorundebug/tsservicelib/runtime/graph";
import type {
  DataProducer,
  EndpointHandler as CustomSourceEndpointHandler,
  ResultContext as CustomResultContext,
} from "@gorundebug/tsservicelib/datasource/localsource";
import type { AnalyticsEvent } from "#internal/types/index.generated.js";
import { MessageContext as RuntimeMessageContext } from "@gorundebug/tsservicelib/runtime/graph";

export type SubstreamAnalyticsInputSourceHandlerState = undefined;

/** Produce one deterministic analytics event that invokes the service-local SubStream example. */
export class SubstreamAnalyticsInputSource implements DataProducer<AnalyticsEvent>, CustomSourceEndpointHandler<SubstreamAnalyticsInputSourceHandlerState, AnalyticsEvent, AnalyticsEvent, Error> {
  public async start(context: Context, consumer: Consumer<AnalyticsEvent>): Promise<void> {
    await consumer.consume(RuntimeMessageContext.fromContext(context), {
      key: "substream", value: 7, kind: "input",
    });
  }

  public stop(_context: Context): Promise<void> {
    return Promise.resolve();
  }

  public concurrency(_stream: StreamContext<AnalyticsEvent, AnalyticsEvent, Error>): number { return 0; }

  public beginRequest(context: MessageContext, _stream: StreamContext<AnalyticsEvent, AnalyticsEvent, Error>): { readonly context: MessageContext; readonly state: SubstreamAnalyticsInputSourceHandlerState } {
    return { context, state: undefined };
  }

  public async consumeMessage(context: MessageContext, stream: StreamContext<AnalyticsEvent, AnalyticsEvent, Error>, _state: SubstreamAnalyticsInputSourceHandlerState, value: Readonly<AnalyticsEvent>, result: CustomResultContext<SubstreamAnalyticsInputSourceHandlerState, AnalyticsEvent, AnalyticsEvent, Error>): Promise<void> {
    await stream.collect(context, value);
    result.done();
  }

  public getMessageId(_context: MessageContext, _stream: StreamContext<AnalyticsEvent, AnalyticsEvent, Error>, _state: SubstreamAnalyticsInputSourceHandlerState, _value: Readonly<AnalyticsEvent>): string {
    return "";
  }

  public endRequest(_context: MessageContext, _stream: StreamContext<AnalyticsEvent, AnalyticsEvent, Error>, _error: Error | undefined, _state: SubstreamAnalyticsInputSourceHandlerState): void {}
}

/** Construct SubstreamAnalyticsInputSource asynchronously while the service graph is initialized. */
export async function makeSubstreamAnalyticsInputSource(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
): Promise<SubstreamAnalyticsInputSource> {
  return new SubstreamAnalyticsInputSource();
}
