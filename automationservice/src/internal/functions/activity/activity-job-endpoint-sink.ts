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

export type ActivityJobEndpointSinkHandlerState = undefined;

/** Implement ActivityJobEndpointSink. */
export class ActivityJobEndpointSink implements TemporalEndpointHandler<ActivityJobEndpointSinkHandlerState, string> {
  public beginRequest(_context: MessageContext, _stream: Stream): Promise<ActivityJobEndpointSinkHandlerState> {
    return Promise.resolve(undefined);
  }

  public getMessageId(context: MessageContext, _stream: Stream, _state: ActivityJobEndpointSinkHandlerState, _value: Readonly<string>): string {
    return context.streamId() ?? "";
  }

  public endRequest(_context: MessageContext, _stream: Stream, _error: Error | undefined, _state: ActivityJobEndpointSinkHandlerState): Promise<void> {
    return Promise.resolve();
  }
}

/** Construct ActivityJobEndpointSink once while the service graph is initialized. */
export function makeActivityJobEndpointSink(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: TemporalEndpointConfig,
): ActivityJobEndpointSink {
  return new ActivityJobEndpointSink();
}
