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

export type FanoutActivityAEndpointSourceHandlerState = undefined;

/** Implement FanoutActivityAEndpointSource. */
export class FanoutActivityAEndpointSource implements TemporalEndpointHandler<FanoutActivityAEndpointSourceHandlerState, string, string, string, Error> {
  public beginRequest(context: MessageContext, _stream: StreamContext<string, string, Error>): { readonly context: MessageContext; readonly state: FanoutActivityAEndpointSourceHandlerState } {
    return { context, state: undefined };
  }

  public consumeMessage(context: MessageContext, stream: StreamContext<string, string, Error>, _state: FanoutActivityAEndpointSourceHandlerState, value: Readonly<string>): void | Promise<void> {
    return stream.collect(context, value);
  }

  public endRequest(_context: MessageContext, _stream: StreamContext<string, string, Error>, _error: Error | undefined, _state: FanoutActivityAEndpointSourceHandlerState): void {}
}

/** Construct FanoutActivityAEndpointSource once while the service graph is initialized. */
export function makeFanoutActivityAEndpointSource(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: TemporalEndpointConfig,
): FanoutActivityAEndpointSource {
  return new FanoutActivityAEndpointSource();
}
