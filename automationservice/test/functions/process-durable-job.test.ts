import assert from "node:assert/strict";
import test from "node:test";

import { FunctionCollector, MessageContext } from "@gorundebug/tsservicelib/runtime";

import { ProcessDurableJob } from "../../src/internal/functions/process-durable-job.js";
import { TestStream } from "../support/stream.js";

void test("ProcessDurableJob returns a stable result", async () => {
  const function_ = new ProcessDurableJob();
  const collected: string[] = [];

  await function_.map(new MessageContext(), new TestStream(), "job-42", new FunctionCollector((_context, value) => {
    collected.push(value);
  }));

  assert.deepEqual(collected, ["processed:job-42"]);
});
