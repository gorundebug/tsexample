import assert from "node:assert/strict";
import test from "node:test";

import { AnalyticsShipmentsSource } from "#internal/functions/endpoint/analytics-shipments-source.js";

void test("AnalyticsShipmentsSource exposes its canonical function contract", () => {
  const function_ = new AnalyticsShipmentsSource();
  assert.equal(typeof function_.concurrency, "function");
  assert.equal(typeof function_.beginRequest, "function");
  assert.equal(typeof function_.consumeMessage, "function");
  assert.equal(typeof function_.getMessageId, "function");
  assert.equal(typeof function_.endRequest, "function");
});
