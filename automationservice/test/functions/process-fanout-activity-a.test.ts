import assert from "node:assert/strict";
import test from "node:test";

import { ProcessFanoutActivityA } from "../../src/internal/functions/process-fanout-activity-a.js";

void test("ProcessFanoutActivityA exposes its canonical function contract", () => {
  const function_ = new ProcessFanoutActivityA();
  assert.equal(typeof function_.map, "function");
});
