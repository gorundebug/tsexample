import type { OrderItemResult } from "@gorundebug/model";
import { FunctionCollector, MessageContext } from "@gorundebug/tsservicelib/runtime";
import { TestTypedStream } from "../../support/stream.js";
import type { InventoryFailure } from '../../../src/internal/types/inventory-failure.js';
import assert from "node:assert/strict";
import test from "node:test";

import { GetInventoryItemError } from "#internal/functions/inventory-item/get-inventory-item-error.js";

void test("GetInventoryItemError exposes its canonical function contract", () => {
  const function_ = new GetInventoryItemError();
  assert.equal(typeof function_.map, "function");
});

void test('preserves inventory failure fields without an exception', async () => {
  const result: OrderItemResult[] = [];
  const context = new MessageContext();
  const failure: InventoryFailure = {
    item: { orderId: 'order-1', itemId: 'item-1', sku: 'SKU-001', quantity: 3, unitPrice: 12.5 },
    availableQty: 2,
  };
  await new GetInventoryItemError().map(context, new TestTypedStream<InventoryFailure>(), failure,
    new FunctionCollector<OrderItemResult>((_ctx, value) => { result.push(value); }));
  assert.deepEqual(result, [{ orderId: 'order-1', itemId: 'item-1', sku: 'SKU-001',
    requestedQty: 3, availableQty: 2, reserved: false, status: 'OUT_OF_STOCK',
    unitPrice: 12.5, error: 'inventory is out of stock' }]);
});
