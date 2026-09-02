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

export type FanoutActivityBEndpointSinkHandlerState = undefined;

/** Implement FanoutActivityBEndpointSink. */
export class FanoutActivityBEndpointSink implements TemporalEndpointHandler<FanoutActivityBEndpointSinkHandlerState, string> {
  public beginRequest(_context: MessageContext, _stream: Stream): Promise<FanoutActivityBEndpointSinkHandlerState> {
    return Promise.resolve(undefined);
  }

  public getMessageId(context: MessageContext, _stream: Stream, _state: FanoutActivityBEndpointSinkHandlerState, _value: Readonly<string>): string {
    return context.streamId() ?? "";
  }

  public endRequest(_context: MessageContext, _stream: Stream, _error: Error | undefined, _state: FanoutActivityBEndpointSinkHandlerState): Promise<void> {
    return Promise.resolve();
  }
}

/** Construct FanoutActivityBEndpointSink once while the service graph is initialized. */
export async function makeFanoutActivityBEndpointSink(
  _context: MessageContext,
  _environment: RuntimeEnvironment,
  _config: TemporalEndpointConfig,
): Promise<FanoutActivityBEndpointSink> {
  return new FanoutActivityBEndpointSink();
}
