import assert from "node:assert/strict";
import test from "node:test";

import { BuildSubstreamAnalyticsResult } from "#internal/functions/substreamanalytics/build-substream-analytics-result.js";

void test("BuildSubstreamAnalyticsResult exposes its canonical function contract", () => {
  const function_ = new BuildSubstreamAnalyticsResult();
  assert.equal(typeof function_.map, "function");
});
