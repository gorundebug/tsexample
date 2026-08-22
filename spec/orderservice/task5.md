# Task 5/8: `ProcessOrder`

> Rules: [`spec/rules.md`](../rules.md)

| Field | Value |
|-------|-------|
| Language | `unknown` |
| Kind | `http-source` |
| File | `orderservice/src/internal/functions/process-order.ts` |
| Test | `orderservice/test/functions/process-order.test.ts` |
| Service | `Order Service` |


## Behaviour

Accept orders with at least one item and positive quantities; reject malformed or invalid requests as client errors.
Reuse X-Request-ID when supplied, otherwise generate an order ID. Preserve customer, item, price, and X-Trace data, and apply the configured timeout of five seconds by default.
Return one response per order. When all items finish, use CONFIRMED only if every item was reserved; otherwise use PARTIALLY_CONFIRMED. If the deadline wins, return TIMED_OUT with the item results received so far.
Calculate the total from processed item prices, falling back to the submitted total when no item result arrived, and include individual item failures in the response.



## External contract

| Field | Value |
|-------|-------|
| Format | `openapi` |
| Request | `unknown` |
| Response | `unknown` |


## Stream types
- Input: `Order` — `orderservice/src/internal/types/order.ts`
- Output: `OrderState` — `orderservice/src/internal/types/order-state.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `unknown` section
- [ ] Open `orderservice/src/internal/functions/process-order.ts` and preserve its generated contract
- [ ] Inspect input type `Order` in `orderservice/src/internal/types/order.ts`
- [ ] Inspect output type `OrderState` in `orderservice/src/internal/types/order-state.ts`
- [ ] Implement meaningful assertions in `orderservice/test/functions/process-order.test.ts`
- [ ] Verify the endpoint/result lifecycle, including completion and error paths
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] orderservice/task5.md — ProcessOrder — unknown — done`