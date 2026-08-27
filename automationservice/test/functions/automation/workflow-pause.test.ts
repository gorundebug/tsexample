import assert from "node:assert/strict";
import test from "node:test";

import { WorkflowPause } from "../../../src/internal/functions/automation/workflow-pause.js";

void test("WorkflowPause exposes its canonical function contract", () => {
  const function_ = new WorkflowPause();
  assert.equal(typeof function_.duration, "function");
  assert.equal(typeof function_.delayError, "function");
});
