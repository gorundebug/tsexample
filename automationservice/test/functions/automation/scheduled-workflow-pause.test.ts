import assert from "node:assert/strict";
import test from "node:test";

import { ScheduledWorkflowPause } from "#internal/functions/automation/scheduled-workflow-pause.js";

void test("ScheduledWorkflowPause exposes its canonical function contract", () => {
  const function_ = new ScheduledWorkflowPause();
  assert.equal(typeof function_.duration, "function");
  assert.equal(typeof function_.delayError, "function");
});
