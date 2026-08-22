import assert from "node:assert/strict";
import test from "node:test";

import { FunctionCollector, MessageContext } from "@gorundebug/tsservicelib/runtime";

import { MapOrderItemResultToOrderState } from "../../src/internal/functions/map-order-item-result-to-order-state.js";
import type { OrderState } from "../../src/internal/types/index.generated.js";
import { TestStream } from "../support/stream.js";

void test("MapOrderItemResultToOrderState maps reserved and rejected items", async () => {
  const function_ = new MapOrderItemResultToOrderState();
  const states: OrderState[] = [];
  const out = new FunctionCollector<OrderState>((_context, value) => {
    states.push(value);
  });

  await function_.map(new MessageContext(), new TestStream(), {
    orderId: "order-1", itemId: "item-1", sku: "SKU-001", requestedQty: 2,
    availableQty: 2, reserved: true, status: "CONFIRMED", unitPrice: 5, error: "",
  }, out);
  await function_.map(new MessageContext(), new TestStream(), {
    orderId: "order-2", itemId: "item-2", sku: "SKU-002", requestedQty: 4,
    availableQty: 1, reserved: false, status: "OUT_OF_STOCK", unitPrice: 7, error: "",
  }, out);

  assert.equal(states.length, 2);
  const confirmed = states.at(0);
  const rejected = states.at(1);
  assert.ok(confirmed !== undefined);
  assert.ok(rejected !== undefined);
  assert.equal(confirmed.orderId, "order-1");
  assert.equal(confirmed.status, "CONFIRMED");
  assert.equal(confirmed.confirmedItems.length, 1);
  assert.equal(rejected.orderId, "order-2");
  assert.equal(rejected.status, "PARTIALLY_CONFIRMED");
});
