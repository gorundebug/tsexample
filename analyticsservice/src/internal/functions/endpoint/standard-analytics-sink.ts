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
import type { AnalyticsResult } from "#internal/types/index.generated.js";

export type StandardAnalyticsSinkHandlerState = undefined;

/** Validate and record analytics results routed to the standard Case branch. */
export class StandardAnalyticsSink implements CustomSinkEndpointHandler<StandardAnalyticsSinkHandlerState, AnalyticsResult, Error> {
  public getStreamId(_context: MessageContext, _value: Readonly<AnalyticsResult>): string { return ""; }

  public beginRequest(context: MessageContext, _stream: Stream): { readonly context: MessageContext; readonly state: StandardAnalyticsSinkHandlerState } {
    return { context, state: undefined };
  }

  public consumeMessage(_context: MessageContext, _stream: Stream, _state: StandardAnalyticsSinkHandlerState, value: Readonly<AnalyticsResult>, _resultStream: Collector<Error>): void {
    if (value.key !== "standard" || value.total !== 6 || value.kind !== "multi") {
      throw new Error(`unexpected standard analytics result: ${JSON.stringify(value)}`);
    }
  }

  public endRequest(_context: MessageContext, _stream: Stream, _error: Error | undefined, _state: StandardAnalyticsSinkHandlerState): void {}
}

/** Construct StandardAnalyticsSink asynchronously while the service graph is initialized. */
export async function makeStandardAnalyticsSink(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: CustomEndpointConfig,
): Promise<StandardAnalyticsSink> {
  return new StandardAnalyticsSink();
}
