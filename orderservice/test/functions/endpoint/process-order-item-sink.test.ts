import assert from "node:assert/strict";
import test from "node:test";

import { create } from "@bufbuild/protobuf";
import {
  ProcessOrderItemResponseSchema,
  type ProcessOrderItemRequest,
} from "@gorundebug/inventory-service-api";
import type { OrderItem, OrderItemResult } from "@gorundebug/model";
import { MessageContext } from "@gorundebug/tsservicelib/runtime";
import type {
  ResultContext,
  Sender,
} from "@gorundebug/tsservicelib/datasink/grpc";

import { ProcessOrderItemSink } from "../../../src/internal/functions/endpoint/process-order-item-sink.js";
import type { OrderState } from "../../../src/internal/types/index.generated.js";
import { makeTestSinkStreamContext } from "../../support/stream.js";

void test("ProcessOrderItemSink sends canonical inventory input and restores caller-owned fields", async () => {
  const function_ = new ProcessOrderItemSink();
  const values: OrderItemResult[] = [];
  const errors: OrderState[] = [];
  const stream = makeTestSinkStreamContext<OrderItem, OrderItemResult, OrderState>(values, errors);
  const context = new MessageContext();
  const { state } = function_.beginRequest(context, stream);
  const sender = new RecordingSender();

  await function_.consumeMessage(context, stream, state, {
    orderId: "order-1", itemId: "item-1", sku: "SKU-001", quantity: 3, unitPrice: 12.5,
  }, sender, noopResult);
  await function_.handleResponse(context, stream, state, create(ProcessOrderItemResponseSchema, {
    availableQty: 3,
    reserved: true,
    status: "CONFIRMED",
  }));

  assert.deepEqual(sender.requests.map((request) => ({
    orderId: request.orderId,
    itemId: request.itemId,
    sku: request.sku,
    quantity: request.quantity,
  })), [{ orderId: "order-1", itemId: "item-1", sku: "SKU-001", quantity: 3 }]);
  assert.deepEqual(values, [{
    orderId: "order-1", itemId: "item-1", sku: "SKU-001", requestedQty: 3,
    availableQty: 3, reserved: true, status: "CONFIRMED", unitPrice: 12.5, error: "",
  }]);
  assert.deepEqual(errors, []);
});

void test("ProcessOrderItemSink turns transport failure into PROCESSING_ERROR", async () => {
  const function_ = new ProcessOrderItemSink();
  const values: OrderItemResult[] = [];
  const errors: OrderState[] = [];
  const stream = makeTestSinkStreamContext<OrderItem, OrderItemResult, OrderState>(values, errors);
  const context = new MessageContext();
  const { state } = function_.beginRequest(context, stream);
  await function_.consumeMessage(context, stream, state, {
    orderId: "order-2", itemId: "item-2", sku: "SKU-002", quantity: 4, unitPrice: 7,
  }, new RecordingSender(), noopResult);
  await function_.endRequest(context, stream, new Error("inventory unavailable"), state);

  assert.equal(values.length, 1);
  const result = values.at(0);
  assert.ok(result !== undefined);
  assert.equal(result.status, "PROCESSING_ERROR");
  assert.equal(result.error, "inventory unavailable");
  assert.equal(result.unitPrice, 7);
});

class RecordingSender implements Sender<ProcessOrderItemRequest> {
  public readonly requests: ProcessOrderItemRequest[] = [];

  public send(_context: MessageContext, request: ProcessOrderItemRequest): Promise<void> {
    this.requests.push(request);
    return Promise.resolve();
  }
}

const noopResult: ResultContext = { done: () => undefined };
