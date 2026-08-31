import assert from "node:assert/strict";
import test from "node:test";

import { create } from "@bufbuild/protobuf";
import {
  ProcessOrderItemRequestSchema,
  type ProcessOrderItemResponse,
} from "@gorundebug/inventory-service-api";
import type { OrderItem, OrderItemResult } from "@gorundebug/model";
import { MessageContext } from "@gorundebug/tsservicelib/runtime";
import type {
  ResultCallback,
  ResultContext,
  Sender,
} from "@gorundebug/tsservicelib/datasource/grpc";

import { ProcessOrderItemSource } from "#internal/functions/endpoint/process-order-item-source.js";
import { makeTestStreamContext } from "../../support/stream.js";

void test("ProcessOrderItemSource maps a request and sends the correlated result", async () => {
  const function_ = new ProcessOrderItemSource();
  const values: OrderItem[] = [];
  const errors: Error[] = [];
  const stream = makeTestStreamContext<OrderItem, OrderItemResult, Error>(values, errors);
  const context = new MessageContext();
  const request = create(ProcessOrderItemRequestSchema, {
    orderId: "order-1",
    itemId: "item-1",
    sku: "SKU-001",
    quantity: 3,
  });
  const result = new RecordingResult();
  const sender = new RecordingSender();

  await function_.consumeMessage(context, stream, undefined, request, result, sender);

  assert.deepEqual(values, [
    { orderId: "order-1", itemId: "item-1", sku: "SKU-001", quantity: 3, unitPrice: 0 },
  ]);
  assert.deepEqual(errors, []);
  assert.equal(result.messageId, "item-1");
  assert.ok(result.callback !== undefined);
  const completed = await result.callback(
    context,
    stream,
    undefined,
    {
      orderId: "order-1",
      itemId: "item-1",
      sku: "SKU-001",
      requestedQty: 3,
      availableQty: 3,
      reserved: true,
      status: "CONFIRMED",
      unitPrice: 0,
      error: "",
    },
    sender,
  );
  assert.equal(completed, true);
  assert.deepEqual(sender.values.map((value) => ({
    availableQty: value.availableQty,
    reserved: value.reserved,
    status: value.status,
  })), [{ availableQty: 3, reserved: true, status: "CONFIRMED" }]);
});

class RecordingSender implements Sender<ProcessOrderItemResponse> {
  public readonly values: ProcessOrderItemResponse[] = [];

  public send(_context: MessageContext, value: ProcessOrderItemResponse): Promise<void> {
    this.values.push(value);
    return Promise.resolve();
  }
}

class RecordingResult
  implements ResultContext<undefined, OrderItem, ProcessOrderItemResponse, OrderItemResult, Error>
{
  public messageId: string | undefined;
  public callback: ResultCallback<undefined, OrderItem, ProcessOrderItemResponse, OrderItemResult, Error> | undefined;

  public setResultCallback(
    messageId: string,
    callback: ResultCallback<undefined, OrderItem, ProcessOrderItemResponse, OrderItemResult, Error>,
  ): void {
    this.messageId = messageId;
    this.callback = callback;
  }

  public done(): void {}
}
