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

export type ActivityJobEndpointSourceHandlerState = undefined;

/** Implement ActivityJobEndpointSource. */
export class ActivityJobEndpointSource implements TemporalEndpointHandler<ActivityJobEndpointSourceHandlerState, string, string, string, Error> {
  public beginRequest(context: MessageContext, _stream: StreamContext<string, string, Error>): { readonly context: MessageContext; readonly state: ActivityJobEndpointSourceHandlerState } {
    return { context, state: undefined };
  }

  public consumeMessage(context: MessageContext, stream: StreamContext<string, string, Error>, _state: ActivityJobEndpointSourceHandlerState, value: Readonly<string>): void | Promise<void> {
    return stream.collect(context, value);
  }

  public endRequest(_context: MessageContext, _stream: StreamContext<string, string, Error>, _error: Error | undefined, _state: ActivityJobEndpointSourceHandlerState): void {}
}

/** Construct ActivityJobEndpointSource once while the service graph is initialized. */
export function makeActivityJobEndpointSource(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: TemporalEndpointConfig,
): ActivityJobEndpointSource {
  return new ActivityJobEndpointSource();
}
