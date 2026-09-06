import assert from "node:assert/strict";
import test from "node:test";

import { KeyPaymentsForJoin } from "#internal/functions/joinanalytics/key-payments-for-join.js";

void test("KeyPaymentsForJoin exposes its canonical function contract", () => {
  const function_ = new KeyPaymentsForJoin();
  assert.equal(typeof function_.keyBy, "function");
});
