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

export type HighValueAnalyticsSinkHandlerState = undefined;

/** Validate and record analytics results routed to the high-value Case branch. */
export class HighValueAnalyticsSink implements CustomSinkEndpointHandler<HighValueAnalyticsSinkHandlerState, AnalyticsResult, Error> {
  public getStreamId(_context: MessageContext, _value: Readonly<AnalyticsResult>): string { return ""; }

  public beginRequest(context: MessageContext, _stream: Stream): { readonly context: MessageContext; readonly state: HighValueAnalyticsSinkHandlerState } {
    return { context, state: undefined };
  }

  public consumeMessage(_context: MessageContext, _stream: Stream, _state: HighValueAnalyticsSinkHandlerState, value: Readonly<AnalyticsResult>, _resultStream: Collector<Error>): void {
    if (value.key !== "high-value" || value.total !== 60 || value.kind !== "multi") {
      throw new Error(`unexpected high-value analytics result: ${JSON.stringify(value)}`);
    }
  }

  public endRequest(_context: MessageContext, _stream: Stream, _error: Error | undefined, _state: HighValueAnalyticsSinkHandlerState): void {}
}

/** Construct HighValueAnalyticsSink asynchronously while the service graph is initialized. */
export async function makeHighValueAnalyticsSink(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: CustomEndpointConfig,
): Promise<HighValueAnalyticsSink> {
  return new HighValueAnalyticsSink();
}
