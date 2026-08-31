import assert from "node:assert/strict";
import test from "node:test";

import { ObserveActivityResult } from "#internal/functions/automation/observe-activity-result.js";

void test("ObserveActivityResult exposes its canonical function contract", () => {
  const function_ = new ObserveActivityResult();
  assert.equal(typeof function_.map, "function");
});
