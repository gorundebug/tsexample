import assert from "node:assert/strict";
import test from "node:test";
import {
  FunctionCollector,
  MessageContext,
  ScheduleBackend,
  makeScheduleTrigger
} from "@gorundebug/tsservicelib/runtime";

import { TemporalWorkflowSchedule } from "../../src/internal/functions/temporal-workflow-schedule.js";

void test("TemporalWorkflowSchedule converts the trigger to a Workflow input", async () => {
  const function_ = new TemporalWorkflowSchedule();
  const collected: string[] = [];
  const trigger = makeScheduleTrigger(
    2,
    "workflow-schedule",
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

  assert.deepEqual(collected, [`scheduled-workflow:workflow-schedule:${trigger.triggerId}`]);
});
