import assert from "node:assert/strict";
import test from "node:test";

import type { OrderProcessed } from "@gorundebug/model";
import { MessageContext } from "@gorundebug/tsservicelib/runtime";
import {
  ConsumerMessage,
  type KafkaConsumerControl,
  type KafkaRecord,
  type ResultCallback,
  type ResultContext,
} from "@gorundebug/tsservicelib/datasource/kafka";

import { OrderProcessedEndpointSource } from "#internal/functions/endpoint/order-processed-endpoint-source.js";
import { makeTestStreamContext } from "../../support/stream.js";

void test("OrderProcessedEndpointSource decodes an event and acknowledges it after the result", async () => {
  const function_ = new OrderProcessedEndpointSource();
  const values: OrderProcessed[] = [];
  const errors: Error[] = [];
  const stream = makeTestStreamContext<OrderProcessed, OrderProcessed, Error>(values, errors);
  const control = new RecordingControl();
  const message = new ConsumerMessage(record({
    order_id: "order-1",
    status: "CONFIRMED",
    processed_at: "2026-08-18T00:00:00.000Z",
    total_items: 2,
    confirmed_items: 2,
  }), control);
  const result = new RecordingResult();
  const context = new MessageContext();

  await function_.consumeMessage(context, stream, undefined, message, result);

  assert.deepEqual(values, [{
    orderId: "order-1",
    status: "CONFIRMED",
    processedAt: new Date("2026-08-18T00:00:00.000Z"),
    totalItems: 2,
    confirmedItems: 2,
    failureReason: "",
  }]);
  assert.equal(result.messageId, "order-1");
  assert.deepEqual(control.marked, []);
  assert.ok(result.callback !== undefined);
  const processed = values[0];
  assert.ok(processed !== undefined);

  assert.equal(await result.callback(context, stream, undefined, processed), true);
  assert.equal(result.doneCalls, 1);
  assert.deepEqual(control.marked, [""]);
  assert.deepEqual(errors, []);
});

void test("OrderProcessedEndpointSource rejects malformed wire data", async () => {
  const stream = makeTestStreamContext<OrderProcessed, OrderProcessed, Error>([], []);
  const message = new ConsumerMessage(record({ order_id: 42 }), new RecordingControl());
  await assert.rejects(
    new OrderProcessedEndpointSource().consumeMessage(
      new MessageContext(), stream, undefined, message, new RecordingResult(),
    ),
    /order_id must be a string/,
  );
});

function record(value: unknown): KafkaRecord {
  return {
    topic: "order-processed",
    partition: 0,
    offset: 1n,
    key: Buffer.from("order-1"),
    value: Buffer.from(JSON.stringify(value)),
    headers: new Map(),
  };
}

class RecordingControl implements KafkaConsumerControl {
  public readonly marked: string[] = [];

  public mark(_record: KafkaRecord, metadata: string): void {
    this.marked.push(metadata);
  }

  public commit(_record: KafkaRecord): Promise<void> {
    return Promise.resolve();
  }
}

class RecordingResult implements ResultContext<undefined, OrderProcessed, OrderProcessed, Error> {
  public messageId: string | undefined;
  public callback: ResultCallback<undefined, OrderProcessed, OrderProcessed, Error> | undefined;
  public doneCalls = 0;

  public setResultCallback(
    messageId: string,
    callback: ResultCallback<undefined, OrderProcessed, OrderProcessed, Error>,
  ): void {
    this.messageId = messageId;
    this.callback = callback;
  }

  public done(): void {
    this.doneCalls += 1;
  }
}
