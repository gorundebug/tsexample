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

export type FanoutActivityCEndpointSinkHandlerState = undefined;

/** Implement FanoutActivityCEndpointSink. */
export class FanoutActivityCEndpointSink implements TemporalEndpointHandler<FanoutActivityCEndpointSinkHandlerState, string> {
  public beginRequest(_context: MessageContext, _stream: Stream): Promise<FanoutActivityCEndpointSinkHandlerState> {
    return Promise.resolve(undefined);
  }

  public getMessageId(context: MessageContext, _stream: Stream, _state: FanoutActivityCEndpointSinkHandlerState, _value: Readonly<string>): string {
    return context.streamId() ?? "";
  }

  public endRequest(_context: MessageContext, _stream: Stream, _error: Error | undefined, _state: FanoutActivityCEndpointSinkHandlerState): Promise<void> {
    return Promise.resolve();
  }
}

/** Construct FanoutActivityCEndpointSink once while the service graph is initialized. */
export function makeFanoutActivityCEndpointSink(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: TemporalEndpointConfig,
): FanoutActivityCEndpointSink {
  return new FanoutActivityCEndpointSink();
}
