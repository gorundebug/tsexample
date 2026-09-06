import assert from "node:assert/strict";
import test from "node:test";

import { KeyPaymentsForMultiJoin } from "#internal/functions/multijoinanalytics/key-payments-for-multi-join.js";

void test("KeyPaymentsForMultiJoin exposes its canonical function contract", () => {
  const function_ = new KeyPaymentsForMultiJoin();
  assert.equal(typeof function_.keyBy, "function");
});
