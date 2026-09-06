import assert from "node:assert/strict";
import test from "node:test";

import { StandardAnalyticsSink } from "#internal/functions/endpoint/standard-analytics-sink.js";

void test("StandardAnalyticsSink exposes its canonical function contract", () => {
  const function_ = new StandardAnalyticsSink();
  assert.equal(typeof function_.getStreamId, "function");
  assert.equal(typeof function_.beginRequest, "function");
  assert.equal(typeof function_.consumeMessage, "function");
  assert.equal(typeof function_.endRequest, "function");
});
