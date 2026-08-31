import assert from "node:assert/strict";
import test from "node:test";

import { ProcessSequentialActivityB } from "#internal/functions/automation/process-sequential-activity-b.js";

void test("ProcessSequentialActivityB exposes its canonical function contract", () => {
  const function_ = new ProcessSequentialActivityB();
  assert.equal(typeof function_.map, "function");
});
