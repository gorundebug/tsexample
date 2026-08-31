import assert from "node:assert/strict";
import test from "node:test";

import { MessageContext } from "@gorundebug/tsservicelib/runtime";

import { SoftDeadline } from "#internal/functions/order/soft-deadline.js";
import { delayStream } from "../../support/stream.js";

const order = {
  id: "order-1", customerId: "customer-1", items: [], totalAmount: 0,
  createdAt: new Date(), traceId: "",
};

void test("SoftDeadline reserves the configured response margin", () => {
  const function_ = new SoftDeadline();
  const duration = function_.duration(new MessageContext().bounded(1_000), delayStream(200), order);
  assert.ok(duration >= 700 && duration <= 900, `unexpected duration ${String(duration)}ms`);
});

void test("SoftDeadline uses the configured duration without a request deadline", () => {
  assert.equal(new SoftDeadline().duration(new MessageContext(), delayStream(300), order), 300);
});

void test("SoftDeadline clamps a margin beyond the request deadline to zero", () => {
  assert.equal(new SoftDeadline().duration(new MessageContext().bounded(100), delayStream(5_000), order), 0);
});
