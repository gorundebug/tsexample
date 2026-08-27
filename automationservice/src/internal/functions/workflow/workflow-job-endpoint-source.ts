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

export type WorkflowJobEndpointSourceHandlerState = undefined;

/** Implement WorkflowJobEndpointSource. */
export class WorkflowJobEndpointSource implements TemporalEndpointHandler<WorkflowJobEndpointSourceHandlerState, string, string, string, Error> {
  public beginRequest(context: MessageContext, _stream: StreamContext<string, string, Error>): { readonly context: MessageContext; readonly state: WorkflowJobEndpointSourceHandlerState } {
    return { context, state: undefined };
  }

  public consumeMessage(context: MessageContext, stream: StreamContext<string, string, Error>, _state: WorkflowJobEndpointSourceHandlerState, value: Readonly<string>): void | Promise<void> {
    return stream.collect(context, value);
  }

  public endRequest(_context: MessageContext, _stream: StreamContext<string, string, Error>, _error: Error | undefined, _state: WorkflowJobEndpointSourceHandlerState): void {}
}

/** Construct WorkflowJobEndpointSource once while the service graph is initialized. */
export function makeWorkflowJobEndpointSource(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: TemporalEndpointConfig,
): WorkflowJobEndpointSource {
  return new WorkflowJobEndpointSource();
}
