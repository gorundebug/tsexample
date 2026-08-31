import assert from "node:assert/strict";
import test from "node:test";

import type { OrderItem } from "@gorundebug/model";
import { FunctionCollector, MessageContext } from "@gorundebug/tsservicelib/runtime";

import { ProcessOrderItems } from "#internal/functions/order/process-order-items.js";
import { TestStream } from "../../support/stream.js";

void test("ProcessOrderItems emits every item with its parent order ID", async () => {
  const function_ = new ProcessOrderItems();
  const items: OrderItem[] = [];

  await function_.flatMap(new MessageContext(), new TestStream(), {
    id: "order-123",
    customerId: "customer-1",
    items: [
      { orderId: "", itemId: "item-1", sku: "SKU-001", quantity: 2, unitPrice: 10 },
      { orderId: "stale", itemId: "item-2", sku: "SKU-002", quantity: 1, unitPrice: 5 },
    ],
    totalAmount: 25,
    createdAt: new Date(),
    traceId: "trace-1",
  }, new FunctionCollector((_context, value) => {
    items.push(value);
  }));

  assert.deepEqual(items.map((item) => [item.orderId, item.itemId]), [
    ["order-123", "item-1"],
    ["order-123", "item-2"],
  ]);
});

void test("ProcessOrderItems emits nothing for an empty order", async () => {
  const items: OrderItem[] = [];
  await new ProcessOrderItems().flatMap(new MessageContext(), new TestStream(), {
    id: "empty", customerId: "", items: [], totalAmount: 0, createdAt: new Date(), traceId: "",
  }, new FunctionCollector((_context, value) => {
    items.push(value);
  }));
  assert.deepEqual(items, []);
});
