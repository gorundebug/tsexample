import assert from "node:assert/strict";
import test from "node:test";

import { AnalyticsOrdersSource } from "#internal/functions/endpoint/analytics-orders-source.js";

void test("AnalyticsOrdersSource exposes its canonical function contract", () => {
  const function_ = new AnalyticsOrdersSource();
  assert.equal(typeof function_.concurrency, "function");
  assert.equal(typeof function_.beginRequest, "function");
  assert.equal(typeof function_.consumeMessage, "function");
  assert.equal(typeof function_.getMessageId, "function");
  assert.equal(typeof function_.endRequest, "function");
});
