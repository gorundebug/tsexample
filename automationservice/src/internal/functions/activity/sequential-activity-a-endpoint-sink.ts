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

export type SequentialActivityAEndpointSinkHandlerState = undefined;

/** Implement SequentialActivityAEndpointSink. */
export class SequentialActivityAEndpointSink implements TemporalEndpointHandler<SequentialActivityAEndpointSinkHandlerState, string> {
  public beginRequest(_context: MessageContext, _stream: Stream): Promise<SequentialActivityAEndpointSinkHandlerState> {
    return Promise.resolve(undefined);
  }

  public getMessageId(context: MessageContext, _stream: Stream, _state: SequentialActivityAEndpointSinkHandlerState, _value: Readonly<string>): string {
    return context.streamId() ?? "";
  }

  public endRequest(_context: MessageContext, _stream: Stream, _error: Error | undefined, _state: SequentialActivityAEndpointSinkHandlerState): Promise<void> {
    return Promise.resolve();
  }
}

/** Construct SequentialActivityAEndpointSink once while the service graph is initialized. */
export function makeSequentialActivityAEndpointSink(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: TemporalEndpointConfig,
): SequentialActivityAEndpointSink {
  return new SequentialActivityAEndpointSink();
}
