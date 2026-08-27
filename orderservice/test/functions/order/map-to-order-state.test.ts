import assert from "node:assert/strict";
import test from "node:test";

import { FunctionCollector, MessageContext } from "@gorundebug/tsservicelib/runtime";

import { MapToOrderState } from "../../../src/internal/functions/order/map-to-order-state.js";
import type { OrderState } from "../../../src/internal/types/index.generated.js";
import { TestStream } from "../../support/stream.js";

void test("MapToOrderState creates the timeout branch without inventing item results", async () => {
  const function_ = new MapToOrderState();
  const states: OrderState[] = [];

  await function_.map(new MessageContext(), new TestStream(), {
    id: "order-789",
    customerId: "customer-1",
    items: [],
    totalAmount: 150,
    createdAt: new Date("2026-08-16T12:00:00.000Z"),
    traceId: "trace-1",
  }, new FunctionCollector((_context, value) => {
    states.push(value);
  }));

  assert.equal(states.length, 1);
  const state = states.at(0);
  assert.ok(state !== undefined);
  assert.equal(state.orderId, "order-789");
  assert.equal(state.status, "TIMED_OUT");
  assert.equal(state.totalAmount, 150);
  assert.deepEqual(state.confirmedItems, []);
});
