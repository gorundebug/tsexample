# Task 3/8: `MapToOrderState`

> Rules: [`spec/rules.md`](../rules.md)

| Field | Value |
|-------|-------|
| Language | `TypeScript` |
| Kind | `map` |
| File | `orderservice/src/internal/functions/map-to-order-state.ts` |
| Test | `orderservice/test/functions/map-to-order-state.test.ts` |
| Service | `Order Service` |


## Behaviour

Produce a TIMED_OUT order result that preserves the order ID and submitted total.
Do not add item results at this stage; results received before the timeout are included in the final response.




## Stream types
- Input: `Order` — `orderservice/src/internal/types/order.ts`
- Output: `OrderState` — `orderservice/src/internal/types/order-state.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `TypeScript` section
- [ ] Open `orderservice/src/internal/functions/map-to-order-state.ts` and preserve its generated contract
- [ ] Inspect input type `Order` in `orderservice/src/internal/types/order.ts`
- [ ] Inspect output type `OrderState` in `orderservice/src/internal/types/order-state.ts`
- [ ] Implement meaningful assertions in `orderservice/test/functions/map-to-order-state.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] orderservice/task3.md — MapToOrderState — TypeScript — done`