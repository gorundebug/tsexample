import assert from "node:assert/strict";
import test from "node:test";

import {
  FunctionCollector,
  MessageContext,
  ScheduleBackend,
  type ScheduleTrigger,
  makeScheduleTrigger,
} from "@gorundebug/tsservicelib/runtime";

import { LocalSchedule } from "../../src/internal/functions/local-schedule.js";

void test("LocalSchedule emits the trigger", async () => {
  const function_ = new LocalSchedule();
  const collected: ScheduleTrigger[] = [];
  const trigger = makeScheduleTrigger(
    1, "local-cleanup", "2026-08-24T00:00:00Z", "2026-08-24T00:00:01Z", ScheduleBackend.Local,
  );

  await function_.onTrigger(
    new MessageContext(),
    trigger,
    new FunctionCollector((_context, value) => { collected.push(value); }),
  );

  assert.deepEqual(collected, [trigger]);
});
