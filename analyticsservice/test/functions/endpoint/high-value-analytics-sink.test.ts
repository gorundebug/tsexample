import assert from "node:assert/strict";
import test from "node:test";

import { HighValueAnalyticsSink } from "#internal/functions/endpoint/high-value-analytics-sink.js";

void test("HighValueAnalyticsSink exposes its canonical function contract", () => {
  const function_ = new HighValueAnalyticsSink();
  assert.equal(typeof function_.getStreamId, "function");
  assert.equal(typeof function_.beginRequest, "function");
  assert.equal(typeof function_.consumeMessage, "function");
  assert.equal(typeof function_.endRequest, "function");
});
