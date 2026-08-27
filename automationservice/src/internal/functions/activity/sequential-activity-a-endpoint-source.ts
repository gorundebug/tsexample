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

export type SequentialActivityAEndpointSourceHandlerState = undefined;

/** Implement SequentialActivityAEndpointSource. */
export class SequentialActivityAEndpointSource implements TemporalEndpointHandler<SequentialActivityAEndpointSourceHandlerState, string, string, string, Error> {
  public beginRequest(context: MessageContext, _stream: StreamContext<string, string, Error>): { readonly context: MessageContext; readonly state: SequentialActivityAEndpointSourceHandlerState } {
    return { context, state: undefined };
  }

  public consumeMessage(context: MessageContext, stream: StreamContext<string, string, Error>, _state: SequentialActivityAEndpointSourceHandlerState, value: Readonly<string>): void | Promise<void> {
    return stream.collect(context, value);
  }

  public endRequest(_context: MessageContext, _stream: StreamContext<string, string, Error>, _error: Error | undefined, _state: SequentialActivityAEndpointSourceHandlerState): void {}
}

/** Construct SequentialActivityAEndpointSource once while the service graph is initialized. */
export function makeSequentialActivityAEndpointSource(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: TemporalEndpointConfig,
): SequentialActivityAEndpointSource {
  return new SequentialActivityAEndpointSource();
}
