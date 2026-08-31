import assert from "node:assert/strict";
import test from "node:test";

import { ObserveFanoutActivityC } from "#internal/functions/automation/observe-fanout-activity-c.js";

void test("ObserveFanoutActivityC exposes its canonical function contract", () => {
  const function_ = new ObserveFanoutActivityC();
  assert.equal(typeof function_.map, "function");
});
