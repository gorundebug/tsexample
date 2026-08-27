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

export type SequentialActivityBEndpointSinkHandlerState = undefined;

/** Implement SequentialActivityBEndpointSink. */
export class SequentialActivityBEndpointSink implements TemporalEndpointHandler<SequentialActivityBEndpointSinkHandlerState, string> {
  public beginRequest(_context: MessageContext, _stream: Stream): Promise<SequentialActivityBEndpointSinkHandlerState> {
    return Promise.resolve(undefined);
  }

  public getMessageId(context: MessageContext, _stream: Stream, _state: SequentialActivityBEndpointSinkHandlerState, _value: Readonly<string>): string {
    return context.streamId() ?? "";
  }

  public endRequest(_context: MessageContext, _stream: Stream, _error: Error | undefined, _state: SequentialActivityBEndpointSinkHandlerState): Promise<void> {
    return Promise.resolve();
  }
}

/** Construct SequentialActivityBEndpointSink once while the service graph is initialized. */
export function makeSequentialActivityBEndpointSink(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: TemporalEndpointConfig,
): SequentialActivityBEndpointSink {
  return new SequentialActivityBEndpointSink();
}
