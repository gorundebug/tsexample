import assert from "node:assert/strict";
import test from "node:test";

import {
  FunctionCollector,
  MessageContext,
  ScheduleBackend,
  makeScheduleTrigger,
} from "@gorundebug/tsservicelib/runtime";

import { TemporalSchedule } from "../../src/internal/functions/temporal-schedule.js";

void test("TemporalSchedule converts the trigger to the input value", async () => {
  const function_ = new TemporalSchedule();
  const collected: string[] = [];
  const trigger = makeScheduleTrigger(
    2, "temporal-cleanup", "2026-08-24T00:00:00Z", "2026-08-24T00:00:01Z", ScheduleBackend.Temporal,
  );

  await function_.onTrigger(
    new MessageContext(),
    trigger,
    new FunctionCollector((_context, value) => { collected.push(value); }),
  );

  assert.deepEqual(collected, ["temporal:temporal-cleanup:" + trigger.triggerId]);
});
