import assert from "node:assert/strict";
import test from "node:test";

import {
  FunctionCollector,
  MessageContext,
  ScheduleBackend,
  makeScheduleTrigger
} from "@gorundebug/tsservicelib/runtime";

import { LocalScheduleSource } from "../../../src/internal/functions/cron/local-schedule-source.js";

void test("LocalScheduleSource converts the trigger to the input value", async () => {
  const function_ = new LocalScheduleSource();
  const collected: string[] = [];
  const trigger = makeScheduleTrigger(
    1,
    "local-cleanup",
    "2026-08-24T00:00:00Z",
    "2026-08-24T00:00:01Z",
    ScheduleBackend.Local
  );

  await function_.onTrigger(
    new MessageContext(),
    trigger,
    new FunctionCollector((_context, value) => {
      collected.push(value);
    })
  );

  assert.deepEqual(collected, ["local:local-cleanup:" + trigger.triggerId]);
});
