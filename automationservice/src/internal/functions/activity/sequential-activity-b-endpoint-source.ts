/** User-owned endpoint implementation. The generator preserves this file. */

import type {
  TemporalEndpointConfig,
  MessageContext,
  RuntimeEnvironment,
  StreamContext,
} from "@gorundebug/tsservicelib/runtime/graph";
import type {
  TemporalEndpointHandler,
} from "@gorundebug/tsservicelib/datasource/temporal";

export type SequentialActivityBEndpointSourceHandlerState = undefined;

/** Implement SequentialActivityBEndpointSource. */
export class SequentialActivityBEndpointSource implements TemporalEndpointHandler<SequentialActivityBEndpointSourceHandlerState, string, string, string, Error> {
  public beginRequest(context: MessageContext, _stream: StreamContext<string, string, Error>): { readonly context: MessageContext; readonly state: SequentialActivityBEndpointSourceHandlerState } {
    return { context, state: undefined };
  }

  public consumeMessage(context: MessageContext, stream: StreamContext<string, string, Error>, _state: SequentialActivityBEndpointSourceHandlerState, value: Readonly<string>): void | Promise<void> {
    return stream.collect(context, value);
  }

  public endRequest(_context: MessageContext, _stream: StreamContext<string, string, Error>, _error: Error | undefined, _state: SequentialActivityBEndpointSourceHandlerState): void {}
}

/** Construct SequentialActivityBEndpointSource once while the service graph is initialized. */
export function makeSequentialActivityBEndpointSource(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: TemporalEndpointConfig,
): SequentialActivityBEndpointSource {
  return new SequentialActivityBEndpointSource();
}
