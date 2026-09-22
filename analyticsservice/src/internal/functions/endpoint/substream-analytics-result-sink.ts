/** User-owned endpoint implementation. The generator preserves this file. */

import type { MessageContext, RuntimeEnvironment, Collector, Stream } from "@gorundebug/tsservicelib/runtime/graph";
import type {
  EndpointHandler as CustomSinkEndpointHandler,
} from "@gorundebug/tsservicelib/datasink/localsink";
import type { AnalyticsResult } from "#internal/types/index.generated.js";

export type SubstreamAnalyticsResultSinkHandlerState = undefined;

/** Validate and record the result returned by the service-local SubStream example. */
export class SubstreamAnalyticsResultSink implements CustomSinkEndpointHandler<SubstreamAnalyticsResultSinkHandlerState, AnalyticsResult, Error> {
  public getStreamId(_context: MessageContext, _value: Readonly<AnalyticsResult>): string { return ""; }

  public beginRequest(context: MessageContext, _stream: Stream): { readonly context: MessageContext; readonly state: SubstreamAnalyticsResultSinkHandlerState } {
    return { context, state: undefined };
  }

  public consumeMessage(_context: MessageContext, _stream: Stream, _state: SubstreamAnalyticsResultSinkHandlerState, value: Readonly<AnalyticsResult>, _resultStream: Collector<Error>): void {
    if (value.key !== "substream" || value.total !== 14 || value.kind !== "substream") {
      throw new Error(`unexpected substream analytics result: ${JSON.stringify(value)}`);
    }
  }

  public endRequest(_context: MessageContext, _stream: Stream, _error: Error | undefined, _state: SubstreamAnalyticsResultSinkHandlerState): void {}
}

/** Construct SubstreamAnalyticsResultSink asynchronously while the service graph is initialized. */
export async function makeSubstreamAnalyticsResultSink(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
): Promise<SubstreamAnalyticsResultSink> {
  return new SubstreamAnalyticsResultSink();
}
