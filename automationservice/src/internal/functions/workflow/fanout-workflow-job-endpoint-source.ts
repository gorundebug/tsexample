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

export type FanoutWorkflowJobEndpointSourceHandlerState = undefined;

/** Implement FanoutWorkflowJobEndpointSource. */
export class FanoutWorkflowJobEndpointSource implements TemporalEndpointHandler<FanoutWorkflowJobEndpointSourceHandlerState, string, string, string, Error> {
  public beginRequest(context: MessageContext, _stream: StreamContext<string, string, Error>): { readonly context: MessageContext; readonly state: FanoutWorkflowJobEndpointSourceHandlerState } {
    return { context, state: undefined };
  }

  public consumeMessage(context: MessageContext, stream: StreamContext<string, string, Error>, _state: FanoutWorkflowJobEndpointSourceHandlerState, value: Readonly<string>): void | Promise<void> {
    return stream.collect(context, value);
  }

  public endRequest(_context: MessageContext, _stream: StreamContext<string, string, Error>, _error: Error | undefined, _state: FanoutWorkflowJobEndpointSourceHandlerState): void {}
}

/** Construct FanoutWorkflowJobEndpointSource once while the service graph is initialized. */
export async function makeFanoutWorkflowJobEndpointSource(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: TemporalEndpointConfig,
): Promise<FanoutWorkflowJobEndpointSource> {
  return new FanoutWorkflowJobEndpointSource();
}
