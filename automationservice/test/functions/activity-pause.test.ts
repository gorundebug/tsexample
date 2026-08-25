import assert from "node:assert/strict";
import test from "node:test";

import { ActivityPause } from "../../src/internal/functions/activity-pause.js";

void test("ActivityPause exposes its canonical function contract", () => {
  const function_ = new ActivityPause();
  assert.equal(typeof function_.duration, "function");
  assert.equal(typeof function_.delayError, "function");
});
