import assert from "node:assert/strict";
import test from "node:test";

import { AnalyticsPaymentsSource } from "#internal/functions/endpoint/analytics-payments-source.js";

void test("AnalyticsPaymentsSource exposes its canonical function contract", () => {
  const function_ = new AnalyticsPaymentsSource();
  assert.equal(typeof function_.concurrency, "function");
  assert.equal(typeof function_.beginRequest, "function");
  assert.equal(typeof function_.consumeMessage, "function");
  assert.equal(typeof function_.getMessageId, "function");
  assert.equal(typeof function_.endRequest, "function");
});
