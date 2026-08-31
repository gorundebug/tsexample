import assert from "node:assert/strict";
import test from "node:test";
import {
  FunctionCollector,
  MessageContext,
  ScheduleBackend,
  makeScheduleTrigger
} from "@gorundebug/tsservicelib/runtime";

import { TemporalActivityScheduleSource } from "#internal/functions/activity/temporal-activity-schedule-source.js";

void test("TemporalActivityScheduleSource converts the trigger to an Activity input", async () => {
  const function_ = new TemporalActivityScheduleSource();
  const collected: string[] = [];
  const trigger = makeScheduleTrigger(
    1,
    "activity-schedule",
    "2026-08-25T00:00:00Z",
    "2026-08-25T00:00:01Z",
    ScheduleBackend.Temporal
  );

  await function_.onTrigger(
    new MessageContext(),
    trigger,
    new FunctionCollector((_context, value) => {
      collected.push(value);
    })
  );

  assert.deepEqual(collected, [`scheduled-activity:activity-schedule:${trigger.triggerId}`]);
});
