import assert from "node:assert/strict";
import test from "node:test";

import { ProcessScheduledWorkflow } from "../../src/internal/functions/process-scheduled-workflow.js";

void test("ProcessScheduledWorkflow exposes its canonical function contract", () => {
  const function_ = new ProcessScheduledWorkflow();
  assert.equal(typeof function_.map, "function");
});
