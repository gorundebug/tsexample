import assert from "node:assert/strict";
import test from "node:test";

import {
  FunctionCollector,
  MessageContext,
  ScheduleBackend,
  makeScheduleTrigger,
} from "@gorundebug/tsservicelib/runtime";

import { LocalJob } from "../../src/internal/functions/local-job.js";
import { TestStream } from "../support/stream.js";

void test("LocalJob formats the scheduled trigger", async () => {
  const function_ = new LocalJob();
  const collected: string[] = [];
  const trigger = makeScheduleTrigger(
    1, "local-cleanup", "2026-08-24T00:00:00Z", "2026-08-24T00:00:01Z", ScheduleBackend.Local,
  );

  await function_.map(new MessageContext(), new TestStream(), trigger, new FunctionCollector((_context, value) => {
    collected.push(value);
  }));

  assert.deepEqual(collected, [`local:local-cleanup:${trigger.triggerId}`]);
});
