import assert from "node:assert/strict";
import test from "node:test";

import { CompleteCycleAnalytics } from "#internal/functions/cycleanalytics/complete-cycle-analytics.js";

void test("CompleteCycleAnalytics exposes its canonical function contract", () => {
  const function_ = new CompleteCycleAnalytics();
  assert.equal(typeof function_.filter, "function");
});
