import assert from "node:assert/strict";
import test from "node:test";

import { KeyOrdersForJoin } from "#internal/functions/joinanalytics/key-orders-for-join.js";

void test("KeyOrdersForJoin exposes its canonical function contract", () => {
  const function_ = new KeyOrdersForJoin();
  assert.equal(typeof function_.keyBy, "function");
});
