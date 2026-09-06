import assert from "node:assert/strict";
import test from "node:test";

import { KeyOrdersForMultiJoin } from "#internal/functions/multijoinanalytics/key-orders-for-multi-join.js";

void test("KeyOrdersForMultiJoin exposes its canonical function contract", () => {
  const function_ = new KeyOrdersForMultiJoin();
  assert.equal(typeof function_.keyBy, "function");
});
