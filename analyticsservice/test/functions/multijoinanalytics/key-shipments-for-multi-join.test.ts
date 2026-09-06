import assert from "node:assert/strict";
import test from "node:test";

import { KeyShipmentsForMultiJoin } from "#internal/functions/multijoinanalytics/key-shipments-for-multi-join.js";

void test("KeyShipmentsForMultiJoin exposes its canonical function contract", () => {
  const function_ = new KeyShipmentsForMultiJoin();
  assert.equal(typeof function_.keyBy, "function");
});
