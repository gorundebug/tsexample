/** User-owned endpoint implementation. The generator preserves this file. */

import type {
  TemporalEndpointConfig,
  MessageContext,
  RuntimeEnvironment,
  Stream,
  StreamContext,
} from "@gorundebug/tsservicelib/runtime/graph";
import type {
  TemporalEndpointHandler,
} from "@gorundebug/tsservicelib/datasink/temporal";

export type FanoutWorkflowJobEndpointSinkHandlerState = undefined;

/** Implement FanoutWorkflowJobEndpointSink. */
export class FanoutWorkflowJobEndpointSink implements TemporalEndpointHandler<FanoutWorkflowJobEndpointSinkHandlerState, string> {
  public beginRequest(_context: MessageContext, _stream: Stream): Promise<FanoutWorkflowJobEndpointSinkHandlerState> {
    return Promise.resolve(undefined);
  }

  public getMessageId(context: MessageContext, _stream: Stream, _state: FanoutWorkflowJobEndpointSinkHandlerState, _value: Readonly<string>): string {
    return context.streamId() ?? "";
  }

  public endRequest(_context: MessageContext, _stream: Stream, _error: Error | undefined, _state: FanoutWorkflowJobEndpointSinkHandlerState): Promise<void> {
    return Promise.resolve();
  }
}

/** Construct FanoutWorkflowJobEndpointSink once while the service graph is initialized. */
export async function makeFanoutWorkflowJobEndpointSink(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: TemporalEndpointConfig,
): Promise<FanoutWorkflowJobEndpointSink> {
  return new FanoutWorkflowJobEndpointSink();
}
