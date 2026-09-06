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

export type JoinedAnalyticsSinkHandlerState = undefined;

/** Validate and record the result of the two-way analytics join. */
export class JoinedAnalyticsSink implements CustomSinkEndpointHandler<JoinedAnalyticsSinkHandlerState, AnalyticsResult, Error> {
  public getStreamId(_context: MessageContext, _value: Readonly<AnalyticsResult>): string { return ""; }

  public beginRequest(context: MessageContext, _stream: Stream): { readonly context: MessageContext; readonly state: JoinedAnalyticsSinkHandlerState } {
    return { context, state: undefined };
  }

  public consumeMessage(_context: MessageContext, _stream: Stream, _state: JoinedAnalyticsSinkHandlerState, value: Readonly<AnalyticsResult>, _resultStream: Collector<Error>): void {
    const expected: Readonly<Record<string, number>> = { "high-value": 30, standard: 3 };
    if (value.kind !== "join" || expected[value.key] !== value.total) {
      throw new Error(`unexpected joined analytics result: ${JSON.stringify(value)}`);
    }
  }

  public endRequest(_context: MessageContext, _stream: Stream, _error: Error | undefined, _state: JoinedAnalyticsSinkHandlerState): void {}
}

/** Construct JoinedAnalyticsSink asynchronously while the service graph is initialized. */
export async function makeJoinedAnalyticsSink(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: CustomEndpointConfig,
): Promise<JoinedAnalyticsSink> {
  return new JoinedAnalyticsSink();
}
