import assert from "node:assert/strict";
import test from "node:test";

import { ObserveFanoutActivityB } from "../../src/internal/functions/observe-fanout-activity-b.js";

void test("ObserveFanoutActivityB exposes its canonical function contract", () => {
  const function_ = new ObserveFanoutActivityB();
  assert.equal(typeof function_.map, "function");
});
