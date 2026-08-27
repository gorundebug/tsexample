import assert from "node:assert/strict";
import test from "node:test";

import type { OrderProcessed } from "@gorundebug/model";
import { MessageContext } from "@gorundebug/tsservicelib/runtime";
import { SinkMessage } from "@gorundebug/tsservicelib/datasink/kafka";

import { OrderProcessedEndpointSink } from "../../../src/internal/functions/endpoint/order-processed-endpoint-sink.js";
import { TestStream } from "../../support/stream.js";

const event: OrderProcessed = {
  orderId: "order-1",
  status: "PARTIALLY_CONFIRMED",
  processedAt: new Date("2026-08-18T00:00:00.000Z"),
  totalItems: 2,
  confirmedItems: 1,
  failureReason: "PARTIALLY_CONFIRMED",
};

void test("OrderProcessedEndpointSink writes the canonical keyed Kafka payload", async () => {
  let sentKey: Uint8Array | undefined;
  let sentValue: Uint8Array = new Uint8Array();
  let delivery: Promise<void> = Promise.resolve();
  const results: Error[] = [];
  const message = new SinkMessage<Error>("order-processed", (key, value, onDelivery) => {
    sentKey = key;
    sentValue = value;
    delivery = Promise.resolve(onDelivery({ partition: 2, offset: 9n }, undefined));
  }, (_context, error) => {
    results.push(error);
  });

  new OrderProcessedEndpointSink().consumeMessage(
    new MessageContext(), new TestStream(), undefined, event, message,
  );
  await delivery;

  assert.equal(Buffer.from(sentKey ?? []).toString("utf8"), "order-1");
  assert.deepEqual(JSON.parse(Buffer.from(sentValue).toString("utf8")), {
    order_id: "order-1",
    status: "PARTIALLY_CONFIRMED",
    processed_at: "2026-08-18T00:00:00.000Z",
    total_items: 2,
    confirmed_items: 1,
    failure_reason: "PARTIALLY_CONFIRMED",
  });
  assert.deepEqual(results, []);
});

void test("OrderProcessedEndpointSink emits only Kafka delivery failures", async () => {
  const results: Error[] = [];
  let delivery: Promise<void> = Promise.resolve();
  const message = new SinkMessage<Error>("order-processed", (_key, _value, onDelivery) => {
    delivery = Promise.resolve(onDelivery(undefined, new Error("broker unavailable")));
  },
  (_context, error) => {
    results.push(error);
  });

  new OrderProcessedEndpointSink().consumeMessage(
    new MessageContext(), new TestStream(), undefined, event, message,
  );
  await delivery;

  assert.equal(results.length, 1);
  assert.equal(results[0]?.message, "broker unavailable");
});
