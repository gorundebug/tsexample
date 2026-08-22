import assert from "node:assert/strict";
import test from "node:test";

import type { OrderProcessed } from "@gorundebug/model";
import {
  FunctionCollector,
  MessageContext,
  type RuntimeEnvironment,
  type Stream,
  type StreamConfig,
} from "@gorundebug/tsservicelib/runtime";
import { TestMetrics } from "@gorundebug/tsservicelib/runtime/testmetrics";

import { CountOrderProcessed } from "../../src/internal/functions/count-order-processed.js";

void test("CountOrderProcessed counts successful and unsuccessful orders independently", async () => {
  const metrics = new TestMetrics();
  const counter = metrics
    .scope("analytics")
    .counterVec("orders_total", "Number of processed orders by result");
  const function_ = new CountOrderProcessed(counter);
  const collected: OrderProcessed[] = [];
  const out = new FunctionCollector<OrderProcessed>((_context, value) => {
    collected.push(value);
  });
  const errorOut = new FunctionCollector<Error>(() => undefined);
  const confirmed = order("confirmed", "CONFIRMED");
  const failed = order("failed", "PARTIALLY_CONFIRMED");

  const stream = new TestStream();
  await function_.process(new MessageContext(), stream, confirmed, out, errorOut);
  await function_.process(new MessageContext(), stream, failed, out, errorOut);

  assert.deepEqual(collected, [confirmed, failed]);
  assert.equal(metrics.counterValue("analytics_orders_total", { result: "successful" }), 1);
  assert.equal(metrics.counterValue("analytics_orders_total", { result: "unsuccessful" }), 1);
});

function order(orderId: string, status: string): OrderProcessed {
  return {
    orderId,
    status,
    processedAt: new Date("2026-08-18T00:00:00.000Z"),
    totalItems: 1,
    confirmedItems: status === "CONFIRMED" ? 1 : 0,
    failureReason: status === "CONFIRMED" ? "" : status,
  };
}

class TestStream implements Stream {
  public readonly id = 1;
  public readonly name = "countOrderProcessed";
  public readonly transformationName = "process";

  public runtimeEnvironment(): RuntimeEnvironment {
    throw new Error("not used by CountOrderProcessed");
  }

  public config(): StreamConfig {
    throw new Error("not used by CountOrderProcessed");
  }
}
