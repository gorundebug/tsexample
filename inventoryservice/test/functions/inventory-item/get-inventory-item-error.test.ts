import assert from "node:assert/strict";
import test from "node:test";

import { GetInventoryItemError } from "#internal/functions/inventory-item/get-inventory-item-error.js";

void test("GetInventoryItemError exposes its canonical function contract", () => {
  const function_ = new GetInventoryItemError();
  assert.equal(typeof function_.map, "function");
});
