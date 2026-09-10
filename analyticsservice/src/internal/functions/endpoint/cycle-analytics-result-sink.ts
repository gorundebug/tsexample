/** User-owned endpoint implementation. The generator preserves this file. */

import type {
  CustomEndpointConfig,
  MessageContext,
  RuntimeEnvironment,
  Collector,
  Stream,
} from "@gorundebug/tsservicelib/runtime/graph";
import type {
  EndpointHandler as CustomSinkEndpointHandler,
} from "@gorundebug/tsservicelib/datasink/localsink";
import type { AnalyticsEvent } from "#internal/types/index.generated.js";

export type CycleAnalyticsResultSinkHandlerState = undefined;

/** Validate the terminal event emitted after three passes through the feedback cycle. */
export class CycleAnalyticsResultSink implements CustomSinkEndpointHandler<CycleAnalyticsResultSinkHandlerState, AnalyticsEvent, Error> {
  public getStreamId(_context: MessageContext, _value: Readonly<AnalyticsEvent>): string { return ""; }

  public beginRequest(context: MessageContext, _stream: Stream): { readonly context: MessageContext; readonly state: CycleAnalyticsResultSinkHandlerState } {
    return { context, state: undefined };
  }

  public consumeMessage(_context: MessageContext, _stream: Stream, _state: CycleAnalyticsResultSinkHandlerState, value: Readonly<AnalyticsEvent>, _resultStream: Collector<Error>): void {
    if (value.key !== "cycle" || value.kind !== "cycle" || value.value !== 3) {
      throw new Error(`unexpected cycle analytics result: ${JSON.stringify(value)}`);
    }
  }

  public endRequest(_context: MessageContext, _stream: Stream, _error: Error | undefined, _state: CycleAnalyticsResultSinkHandlerState): void {}
}

/** Construct CycleAnalyticsResultSink asynchronously while the service graph is initialized. */
export async function makeCycleAnalyticsResultSink(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: CustomEndpointConfig,
): Promise<CycleAnalyticsResultSink> {
  return new CycleAnalyticsResultSink();
}
