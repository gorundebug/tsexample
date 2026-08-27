import assert from "node:assert/strict";
import test from "node:test";

import { ProcessSequentialActivityA } from "../../../src/internal/functions/automation/process-sequential-activity-a.js";

void test("ProcessSequentialActivityA exposes its canonical function contract", () => {
  const function_ = new ProcessSequentialActivityA();
  assert.equal(typeof function_.map, "function");
});
