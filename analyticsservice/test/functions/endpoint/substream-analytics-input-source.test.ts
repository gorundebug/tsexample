import assert from "node:assert/strict";
import test from "node:test";

import { SubstreamAnalyticsInputSource } from "#internal/functions/endpoint/substream-analytics-input-source.js";

void test("SubstreamAnalyticsInputSource exposes its canonical function contract", () => {
  const function_ = new SubstreamAnalyticsInputSource();
  assert.equal(typeof function_.concurrency, "function");
  assert.equal(typeof function_.beginRequest, "function");
  assert.equal(typeof function_.consumeMessage, "function");
  assert.equal(typeof function_.getMessageId, "function");
  assert.equal(typeof function_.endRequest, "function");
});
