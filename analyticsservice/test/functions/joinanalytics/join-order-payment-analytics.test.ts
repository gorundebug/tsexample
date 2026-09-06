import assert from "node:assert/strict";
import test from "node:test";

import { JoinOrderPaymentAnalytics } from "#internal/functions/joinanalytics/join-order-payment-analytics.js";

void test("JoinOrderPaymentAnalytics exposes its canonical function contract", () => {
  const function_ = new JoinOrderPaymentAnalytics();
  assert.equal(typeof function_.join, "function");
});
