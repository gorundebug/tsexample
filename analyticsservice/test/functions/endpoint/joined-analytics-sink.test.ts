import assert from "node:assert/strict";
import test from "node:test";

import { JoinedAnalyticsSink } from "#internal/functions/endpoint/joined-analytics-sink.js";

void test("JoinedAnalyticsSink exposes its canonical function contract", () => {
  const function_ = new JoinedAnalyticsSink();
  assert.equal(typeof function_.getStreamId, "function");
  assert.equal(typeof function_.beginRequest, "function");
  assert.equal(typeof function_.consumeMessage, "function");
  assert.equal(typeof function_.endRequest, "function");
});
