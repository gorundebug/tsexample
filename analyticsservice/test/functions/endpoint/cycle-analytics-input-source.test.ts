import assert from "node:assert/strict";
import test from "node:test";

import { CycleAnalyticsInputSource } from "#internal/functions/endpoint/cycle-analytics-input-source.js";

void test("CycleAnalyticsInputSource exposes its canonical function contract", () => {
  const function_ = new CycleAnalyticsInputSource();
  assert.equal(typeof function_.concurrency, "function");
  assert.equal(typeof function_.beginRequest, "function");
  assert.equal(typeof function_.consumeMessage, "function");
  assert.equal(typeof function_.getMessageId, "function");
  assert.equal(typeof function_.endRequest, "function");
});
