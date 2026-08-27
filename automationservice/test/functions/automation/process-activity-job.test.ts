import assert from "node:assert/strict";
import test from "node:test";
import {
  DurableCallContext,
  FunctionCollector,
  MessageContext
} from "@gorundebug/tsservicelib/runtime";

import { ProcessActivityJob } from "../../../src/internal/functions/automation/process-activity-job.js";

void test("ProcessActivityJob records progress and returns a result", async () => {
  const function_ = new ProcessActivityJob();
  const heartbeats: unknown[] = [];
  const collected: string[] = [];
  const context = new MessageContext().withDurableCallContext(
    new DurableCallContext("activity-1", "Activity", {
      heartbeat: (value) => heartbeats.push(value)
    })
  );

  await function_.map(
    context,
    undefined!,
    "job-1",
    new FunctionCollector((_context, value) => {
      collected.push(value);
    })
  );

  assert.deepEqual(heartbeats, ["processing:job-1"]);
  assert.deepEqual(collected, ["activity:processed:job-1"]);
});
