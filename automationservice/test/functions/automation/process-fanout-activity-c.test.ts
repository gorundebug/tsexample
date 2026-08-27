import assert from "node:assert/strict";
import test from "node:test";

import { ProcessFanoutActivityC } from "../../../src/internal/functions/automation/process-fanout-activity-c.js";

void test("ProcessFanoutActivityC exposes its canonical function contract", () => {
  const function_ = new ProcessFanoutActivityC();
  assert.equal(typeof function_.map, "function");
});
