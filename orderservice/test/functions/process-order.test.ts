import assert from "node:assert/strict";
import test from "node:test";

import { createServer } from "node:http";
import type { AddressInfo } from "node:net";

import type { ProcessOrderRequest, ProcessOrderResponse } from "@gorundebug/order-service-api";
import { MessageContext } from "@gorundebug/tsservicelib/runtime";
import type {
  HandlerData,
  ResultCallback,
  ResultContext,
} from "@gorundebug/tsservicelib/datasource/http";

import { ProcessOrder } from "../../src/internal/functions/process-order.js";
import type { Order, OrderState } from "../../src/internal/types/index.generated.js";
import { makeTestStreamContext } from "../support/stream.js";

void test("ProcessOrder validates, maps and correlates a complete HTTP order", async () => {
  const response = await runRequest({
    customer_id: "customer-1",
    items: [
      { item_id: "item-1", sku: "SKU-001", quantity: 2, unit_price: 10 },
      { item_id: "item-2", sku: "SKU-002", quantity: 1, unit_price: 5 },
    ],
  }, async (context, stream, state, data, result) => {
    const orders: Order[] = [];
    const errors: Error[] = [];
    const collectingStream = makeTestStreamContext<Order, OrderState, Error>(orders, errors);
    await new ProcessOrder(5_000).consumeMessage(context, collectingStream, state, data, result);

    assert.equal(orders.length, 1);
    const order = orders.at(0);
    assert.ok(order !== undefined);
    assert.equal(order.id, "order-from-header");
    assert.equal(order.customerId, "customer-1");
    assert.equal(order.totalAmount, 25);
    assert.equal(order.traceId, "trace-1");
    assert.equal(result.messageId, "order-from-header");
    assert.ok(result.callback !== undefined);

    const firstDone = await result.callback(context, stream, state, itemState("item-1", true), data);
    assert.equal(firstDone, false);
    assert.equal(data.response.writableEnded, false);
    const secondDone = await result.callback(context, stream, state, itemState("item-2", false), data);
    assert.equal(secondDone, true);
    assert.equal(result.doneCalls, 1);
    assert.deepEqual(errors, []);
  });

  assert.equal(response.status, 200);
  const body: unknown = await response.json();
  assert.ok(isProcessOrderResponse(body));
  assert.equal(body.order_id, "order-from-header");
  assert.equal(body.status, "PARTIALLY_CONFIRMED");
  assert.equal(body.total_amount, 25);
  assert.equal(body.confirmed_items?.length, 2);
});

void test("ProcessOrder rejects an empty order as a client error", async () => {
  const response = await runRequest({ items: [] }, () => {
    assert.fail("consume callback must not run for an invalid request");
    return Promise.resolve();
  });
  assert.equal(response.status, 400);
  assert.match(await response.text(), /items must not be empty/);
});

void test("ProcessOrder rejects request shapes that violate the generated OpenAPI schema", async () => {
  const response = await runRequest({
    items: [{ item_id: "item-1", sku: "SKU-001", quantity: "2" }],
  }, () => {
    assert.fail("consume callback must not run for a malformed request");
    return Promise.resolve();
  });
  assert.equal(response.status, 400);
  assert.match(await response.text(), /invalid JSON body/);
});

void test("ProcessOrder keeps positive quantity as a business validation rule", async () => {
  const response = await runRequest({
    items: [{ item_id: "item-1", sku: "SKU-001", quantity: 0 }],
  }, () => {
    assert.fail("consume callback must not run for a business-invalid request");
    return Promise.resolve();
  });
  assert.equal(response.status, 400);
  assert.match(await response.text(), /all quantities must be positive/);
});

function itemState(itemId: string, reserved: boolean): OrderState {
  return {
    orderId: "order-from-header",
    status: reserved ? "CONFIRMED" : "PARTIALLY_CONFIRMED",
    confirmedItems: [{
      orderId: "order-from-header",
      itemId,
      sku: itemId === "item-1" ? "SKU-001" : "SKU-002",
      requestedQty: itemId === "item-1" ? 2 : 1,
      availableQty: reserved ? 2 : 0,
      reserved,
      status: reserved ? "CONFIRMED" : "OUT_OF_STOCK",
      unitPrice: itemId === "item-1" ? 10 : 5,
      error: "",
    }],
    totalAmount: 0,
    processedAt: new Date(),
  };
}

async function runRequest(
  body: unknown,
  consume: (
    context: MessageContext,
    stream: ReturnType<typeof makeTestStreamContext<Order, OrderState, Error>>,
    state: ProcessOrderHandlerState,
    data: HandlerData,
    result: RecordingResult,
  ) => Promise<void>,
): Promise<Response> {
  const endpoint = new ProcessOrder(5_000);
  const server = createServer((request, response) => {
    void (async () => {
      const data: HandlerData = { request, response };
      const stream = makeTestStreamContext<Order, OrderState, Error>([], []);
      try {
        const { context, state } = await endpoint.beginRequest(new MessageContext(), stream, data);
        const result = new RecordingResult();
        await consume(context, stream, state, data, result);
      } catch {
        // beginRequest already wrote the canonical client-error response.
      }
    })();
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address() as AddressInfo;
  try {
    return await fetch(`http://127.0.0.1:${String(address.port)}/v1/processorder`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-request-id": "order-from-header",
        "x-trace": "trace-1",
      },
      body: JSON.stringify(body),
    });
  } finally {
    await new Promise<void>((resolve, reject) => server.close((error) => {
      if (error === undefined) resolve();
      else reject(error);
    }));
  }
}

type ProcessOrderHandlerState = Awaited<ReturnType<ProcessOrder["beginRequest"]>>["state"];

class RecordingResult
  implements ResultContext<ProcessOrderHandlerState, ProcessOrderRequest, ProcessOrderResponse, Order, OrderState, Error>
{
  public messageId: string | undefined;
  public callback: ResultCallback<ProcessOrderHandlerState, ProcessOrderRequest, ProcessOrderResponse, Order, OrderState, Error> | undefined;
  public doneCalls = 0;

  public setResultCallback(
    messageId: string,
    callback: ResultCallback<ProcessOrderHandlerState, ProcessOrderRequest, ProcessOrderResponse, Order, OrderState, Error>,
  ): void {
    this.messageId = messageId;
    this.callback = callback;
  }

  public done(): void {
    this.doneCalls += 1;
  }
}

function isProcessOrderResponse(value: unknown): value is ProcessOrderResponse {
  if (!isRecord(value)) return false;
  return (
    typeof value["order_id"] === "string" &&
    typeof value["status"] === "string" &&
    typeof value["total_amount"] === "number" &&
    typeof value["processed_at"] === "string" &&
    Array.isArray(value["confirmed_items"])
  );
}

function isRecord(value: unknown): value is Readonly<Record<string, unknown>> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
