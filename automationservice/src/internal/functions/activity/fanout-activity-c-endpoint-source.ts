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

export type FanoutActivityCEndpointSourceHandlerState = undefined;

/** Implement FanoutActivityCEndpointSource. */
export class FanoutActivityCEndpointSource implements TemporalEndpointHandler<FanoutActivityCEndpointSourceHandlerState, string, string, string, Error> {
  public beginRequest(context: MessageContext, _stream: StreamContext<string, string, Error>): { readonly context: MessageContext; readonly state: FanoutActivityCEndpointSourceHandlerState } {
    return { context, state: undefined };
  }

  public consumeMessage(context: MessageContext, stream: StreamContext<string, string, Error>, _state: FanoutActivityCEndpointSourceHandlerState, value: Readonly<string>): void | Promise<void> {
    return stream.collect(context, value);
  }

  public endRequest(_context: MessageContext, _stream: StreamContext<string, string, Error>, _error: Error | undefined, _state: FanoutActivityCEndpointSourceHandlerState): void {}
}

/** Construct FanoutActivityCEndpointSource once while the service graph is initialized. */
export function makeFanoutActivityCEndpointSource(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: TemporalEndpointConfig,
): FanoutActivityCEndpointSource {
  return new FanoutActivityCEndpointSource();
}
