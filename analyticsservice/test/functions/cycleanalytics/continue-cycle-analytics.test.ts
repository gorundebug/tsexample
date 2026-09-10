import assert from "node:assert/strict";
import test from "node:test";

import { ContinueCycleAnalytics } from "#internal/functions/cycleanalytics/continue-cycle-analytics.js";

void test("ContinueCycleAnalytics exposes its canonical function contract", () => {
  const function_ = new ContinueCycleAnalytics();
  assert.equal(typeof function_.filter, "function");
});
