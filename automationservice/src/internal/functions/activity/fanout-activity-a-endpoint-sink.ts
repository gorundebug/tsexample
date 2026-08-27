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

export type FanoutActivityAEndpointSinkHandlerState = undefined;

/** Implement FanoutActivityAEndpointSink. */
export class FanoutActivityAEndpointSink implements TemporalEndpointHandler<FanoutActivityAEndpointSinkHandlerState, string> {
  public beginRequest(_context: MessageContext, _stream: Stream): Promise<FanoutActivityAEndpointSinkHandlerState> {
    return Promise.resolve(undefined);
  }

  public getMessageId(context: MessageContext, _stream: Stream, _state: FanoutActivityAEndpointSinkHandlerState, _value: Readonly<string>): string {
    return context.streamId() ?? "";
  }

  public endRequest(_context: MessageContext, _stream: Stream, _error: Error | undefined, _state: FanoutActivityAEndpointSinkHandlerState): Promise<void> {
    return Promise.resolve();
  }
}

/** Construct FanoutActivityAEndpointSink once while the service graph is initialized. */
export function makeFanoutActivityAEndpointSink(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: TemporalEndpointConfig,
): FanoutActivityAEndpointSink {
  return new FanoutActivityAEndpointSink();
}
