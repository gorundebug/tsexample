import assert from "node:assert/strict";
import test from "node:test";

import { ScheduledActivityPause } from "../../src/internal/functions/scheduled-activity-pause.js";

void test("ScheduledActivityPause exposes its canonical function contract", () => {
  const function_ = new ScheduledActivityPause();
  assert.equal(typeof function_.duration, "function");
  assert.equal(typeof function_.delayError, "function");
});
