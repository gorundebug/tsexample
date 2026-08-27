# Task 4/8: `MapOrderItemResultToOrderState`

> Rules: [`spec/rules.md`](../rules.md)

| Field | Value |
|-------|-------|
| Language | `TypeScript` |
| Kind | `map` |
| File | `orderservice/src/internal/functions/map-order-item-result-to-order-state.ts` |
| Test | `orderservice/test/functions/map-order-item-result-to-order-state.test.ts` |
| Service | `Order Service` |


## Behaviour

Produce an order result containing one inventory result and preserving its order ID.
Mark it CONFIRMED when the item was reserved; otherwise mark it PARTIALLY_CONFIRMED.
Record the time when this result is produced.




## Stream types
- Input: `OrderItemResult` — `model/src/types/order-item-result.ts`
- Output: `OrderState` — `orderservice/src/internal/types/order-state.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `TypeScript` section
- [ ] Open `orderservice/src/internal/functions/map-order-item-result-to-order-state.ts` and preserve its generated contract
- [ ] Inspect input type `OrderItemResult` in `model/src/types/order-item-result.ts`
- [ ] Inspect output type `OrderState` in `orderservice/src/internal/types/order-state.ts`
- [ ] Implement meaningful assertions in `orderservice/test/functions/map-order-item-result-to-order-state.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] orderservice/task4.md — MapOrderItemResultToOrderState — TypeScript — done`