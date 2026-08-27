import assert from "node:assert/strict";
import test from "node:test";

import type { OrderProcessed } from "@gorundebug/model";
import { FunctionCollector, MessageContext } from "@gorundebug/tsservicelib/runtime";

import { MapToOrderProcessed } from "../../../src/internal/functions/order/map-to-order-processed.js";
import { TestStream } from "../../support/stream.js";

void test("MapToOrderProcessed preserves state and counts reserved items", async () => {
  const function_ = new MapToOrderProcessed();
  const events: OrderProcessed[] = [];
  const processedAt = new Date("2026-08-16T12:30:00.000Z");

  await function_.map(new MessageContext(), new TestStream(), {
    orderId: "order-123",
    status: "PARTIALLY_CONFIRMED",
    processedAt,
    totalAmount: 10,
    confirmedItems: [
      { orderId: "order-123", itemId: "one", sku: "A", requestedQty: 1, availableQty: 1, reserved: true, status: "CONFIRMED", unitPrice: 5, error: "" },
      { orderId: "order-123", itemId: "two", sku: "B", requestedQty: 1, availableQty: 0, reserved: false, status: "OUT_OF_STOCK", unitPrice: 5, error: "" },
    ],
  }, new FunctionCollector((_context, value) => {
    events.push(value);
  }));

  assert.deepEqual(events, [{
    orderId: "order-123",
    status: "PARTIALLY_CONFIRMED",
    processedAt,
    totalItems: 2,
    confirmedItems: 1,
    failureReason: "PARTIALLY_CONFIRMED",
  }]);
});
