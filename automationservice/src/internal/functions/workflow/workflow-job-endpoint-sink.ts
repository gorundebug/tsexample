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

export type WorkflowJobEndpointSinkHandlerState = undefined;

/** Implement WorkflowJobEndpointSink. */
export class WorkflowJobEndpointSink implements TemporalEndpointHandler<WorkflowJobEndpointSinkHandlerState, string> {
  public beginRequest(_context: MessageContext, _stream: Stream): Promise<WorkflowJobEndpointSinkHandlerState> {
    return Promise.resolve(undefined);
  }

  public getMessageId(context: MessageContext, _stream: Stream, _state: WorkflowJobEndpointSinkHandlerState, _value: Readonly<string>): string {
    return context.streamId() ?? "";
  }

  public endRequest(_context: MessageContext, _stream: Stream, _error: Error | undefined, _state: WorkflowJobEndpointSinkHandlerState): Promise<void> {
    return Promise.resolve();
  }
}

/** Construct WorkflowJobEndpointSink once while the service graph is initialized. */
export function makeWorkflowJobEndpointSink(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: TemporalEndpointConfig,
): WorkflowJobEndpointSink {
  return new WorkflowJobEndpointSink();
}
