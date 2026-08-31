import assert from "node:assert/strict";
import test from "node:test";

import type { OrderItemResult } from "@gorundebug/model";
import { FunctionCollector, MessageContext } from "@gorundebug/tsservicelib/runtime";

import { GetInventoryItemData } from "#internal/functions/inventory-item/get-inventory-item-data.js";
import { TestTypedStream } from "../../support/stream.js";

void test("GetInventoryItemData reserves available stock", async () => {
  const function_ = new GetInventoryItemData({ "SKU-001": 10 });
  const results: OrderItemResult[] = [];
  const errors: OrderItemResult[] = [];

  await function_.process(
    new MessageContext(),
    new TestTypedStream(),
    { orderId: "order-1", itemId: "item-1", sku: "SKU-001", quantity: 3, unitPrice: 12.5 },
    new FunctionCollector((_context, value) => {
      results.push(value);
    }),
    new FunctionCollector((_context, value) => {
      errors.push(value);
    }),
  );

  assert.deepEqual(errors, []);
  assert.deepEqual(results, [
    {
      orderId: "order-1",
      itemId: "item-1",
      sku: "SKU-001",
      requestedQty: 3,
      availableQty: 3,
      reserved: true,
      status: "CONFIRMED",
      unitPrice: 12.5,
      error: "",
    },
  ]);
});

void test("GetInventoryItemData reports current stock without overdrawing it", async () => {
  const function_ = new GetInventoryItemData({ "SKU-001": 2 });
  const results: OrderItemResult[] = [];
  const errors: OrderItemResult[] = [];
  const out = new FunctionCollector<OrderItemResult>((_context, value) => {
    results.push(value);
  });
  const errorOut = new FunctionCollector<OrderItemResult>((_context, value) => {
    errors.push(value);
  });

  await function_.process(
    new MessageContext(),
    new TestTypedStream(),
    { orderId: "order-1", itemId: "item-1", sku: "SKU-001", quantity: 3, unitPrice: 2 },
    out,
    errorOut,
  );
  await function_.process(
    new MessageContext(),
    new TestTypedStream(),
    { orderId: "order-2", itemId: "item-2", sku: "SKU-001", quantity: 2, unitPrice: 2 },
    out,
    errorOut,
  );

  assert.equal(errors.length, 1);
  const rejected = errors.at(0);
  assert.ok(rejected !== undefined);
  assert.equal(rejected.availableQty, 2);
  assert.equal(rejected.status, "OUT_OF_STOCK");
  assert.equal(results.length, 1);
  const accepted = results.at(0);
  assert.ok(accepted !== undefined);
  assert.equal(accepted.reserved, true);
});
