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

export type FanoutActivityBEndpointSourceHandlerState = undefined;

/** Implement FanoutActivityBEndpointSource. */
export class FanoutActivityBEndpointSource implements TemporalEndpointHandler<FanoutActivityBEndpointSourceHandlerState, string, string, string, Error> {
  public beginRequest(context: MessageContext, _stream: StreamContext<string, string, Error>): { readonly context: MessageContext; readonly state: FanoutActivityBEndpointSourceHandlerState } {
    return { context, state: undefined };
  }

  public consumeMessage(context: MessageContext, stream: StreamContext<string, string, Error>, _state: FanoutActivityBEndpointSourceHandlerState, value: Readonly<string>): void | Promise<void> {
    return stream.collect(context, value);
  }

  public endRequest(_context: MessageContext, _stream: StreamContext<string, string, Error>, _error: Error | undefined, _state: FanoutActivityBEndpointSourceHandlerState): void {}
}

/** Construct FanoutActivityBEndpointSource once while the service graph is initialized. */
export async function makeFanoutActivityBEndpointSource(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: TemporalEndpointConfig,
): Promise<FanoutActivityBEndpointSource> {
  return new FanoutActivityBEndpointSource();
}
