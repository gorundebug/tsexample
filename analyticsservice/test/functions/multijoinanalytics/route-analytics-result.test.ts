import assert from "node:assert/strict";
import test from "node:test";

import { RouteAnalyticsResult } from "#internal/functions/multijoinanalytics/route-analytics-result.js";

void test("RouteAnalyticsResult exposes its canonical function contract", () => {
  const function_ = new RouteAnalyticsResult();
  assert.equal(typeof function_.buildSwitch, "function");
});
