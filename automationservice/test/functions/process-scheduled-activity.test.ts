import assert from "node:assert/strict";
import test from "node:test";

import { ProcessScheduledActivity } from "../../src/internal/functions/process-scheduled-activity.js";

void test("ProcessScheduledActivity exposes its canonical function contract", () => {
  const function_ = new ProcessScheduledActivity();
  assert.equal(typeof function_.map, "function");
});
