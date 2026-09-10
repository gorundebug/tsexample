import assert from "node:assert/strict";
import test from "node:test";

import { CycleAnalyticsResultSink } from "#internal/functions/endpoint/cycle-analytics-result-sink.js";

void test("CycleAnalyticsResultSink exposes its canonical function contract", () => {
  const function_ = new CycleAnalyticsResultSink();
  assert.equal(typeof function_.getStreamId, "function");
  assert.equal(typeof function_.beginRequest, "function");
  assert.equal(typeof function_.consumeMessage, "function");
  assert.equal(typeof function_.endRequest, "function");
});
