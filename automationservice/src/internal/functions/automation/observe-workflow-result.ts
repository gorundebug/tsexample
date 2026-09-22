/** User-owned function implementation. The generator preserves this file. */

import type { Collector, MessageContext, RuntimeEnvironment, Stream } from "@gorundebug/tsservicelib/runtime/graph";
import type { MapFunction } from "@gorundebug/tsservicelib/transformation";

/** Preserve the result returned through the on-demand Workflow endpoint. */
export class ObserveWorkflowResult implements MapFunction<string, string> {
  public map(
    context: MessageContext,
    _stream: Stream,
    value: Readonly<string>,
    out: Collector<string>
  ): void | Promise<void> {
    return out.out(context, value);
  }
}

/** Construct ObserveWorkflowResult once while the service graph is initialized. */
export async function makeObserveWorkflowResult(
  context: MessageContext,
  environment: RuntimeEnvironment
): Promise<ObserveWorkflowResult> {
  void context;
  void environment;

  return new ObserveWorkflowResult();
}
