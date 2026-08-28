import assert from "node:assert/strict";
import test from "node:test";

import { AnalyticsScheduleSource } from "../../../src/internal/functions/cron/analytics-schedule-source.js";

void test("AnalyticsScheduleSource exposes its canonical function contract", () => {
  const function_ = new AnalyticsScheduleSource();
  assert.equal(typeof function_.onTrigger, "function");
});
