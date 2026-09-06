import assert from "node:assert/strict";
import test from "node:test";

import { MultiJoinAnalyticsEvents } from "#internal/functions/multijoinanalytics/multi-join-analytics-events.js";

void test("MultiJoinAnalyticsEvents exposes its canonical function contract", () => {
  const function_ = new MultiJoinAnalyticsEvents();
  assert.equal(typeof function_.multiJoin, "function");
});
