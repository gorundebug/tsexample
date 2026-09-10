import assert from "node:assert/strict";
import test from "node:test";

import { AdvanceCycleAnalytics } from "#internal/functions/cycleanalytics/advance-cycle-analytics.js";

void test("AdvanceCycleAnalytics exposes its canonical function contract", () => {
  const function_ = new AdvanceCycleAnalytics();
  assert.equal(typeof function_.map, "function");
});
