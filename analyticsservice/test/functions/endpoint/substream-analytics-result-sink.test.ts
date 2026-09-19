import assert from "node:assert/strict";
import test from "node:test";

import { SubstreamAnalyticsResultSink } from "#internal/functions/endpoint/substream-analytics-result-sink.js";

void test("SubstreamAnalyticsResultSink exposes its canonical function contract", () => {
  const function_ = new SubstreamAnalyticsResultSink();
  assert.equal(typeof function_.getStreamId, "function");
  assert.equal(typeof function_.beginRequest, "function");
  assert.equal(typeof function_.consumeMessage, "function");
  assert.equal(typeof function_.endRequest, "function");
});
