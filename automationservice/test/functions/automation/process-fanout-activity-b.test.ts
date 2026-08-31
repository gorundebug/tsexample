import assert from "node:assert/strict";
import test from "node:test";

import { ProcessFanoutActivityB } from "#internal/functions/automation/process-fanout-activity-b.js";

void test("ProcessFanoutActivityB exposes its canonical function contract", () => {
  const function_ = new ProcessFanoutActivityB();
  assert.equal(typeof function_.map, "function");
});
