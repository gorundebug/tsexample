import assert from "node:assert/strict";
import test from "node:test";
import {
  DurableCallContext,
  FunctionCollector,
  MessageContext,
  TemporalContinueAsNewRequest
} from "@gorundebug/tsservicelib/runtime";

import { ProcessWorkflowJob } from "../../../src/internal/functions/automation/process-workflow-job.js";

void test("ProcessWorkflowJob continues once and returns its final result", async () => {
  const function_ = new ProcessWorkflowJob();
  const collected: string[] = [];
  const collector = new FunctionCollector<string>((_context, value) => {
    collected.push(value);
  });
  const first = new MessageContext().withDurableCallContext(
    new DurableCallContext("workflow-1", "Workflow", {
      timer: async () => {}
    })
  );

  await assert.rejects(
    function_.map(first, undefined!, "job-1", collector),
    (error: unknown) =>
      error instanceof TemporalContinueAsNewRequest && error.nextInput === "continued:job-1"
  );

  const second = new MessageContext().withDurableCallContext(
    new DurableCallContext("workflow-2", "Workflow", {
      timer: async () => {}
    })
  );
  await function_.map(second, undefined!, "sequential:b:sequential:a:continued:job-1", collector);
  assert.deepEqual(collected, ["workflow:processed:sequential:b:sequential:a:job-1"]);
});
