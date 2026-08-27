# Task 5/8: `MapToOrderProcessed`

> Rules: [`spec/rules.md`](../rules.md)

| Field | Value |
|-------|-------|
| Language | `TypeScript` |
| Kind | `map` |
| File | `orderservice/src/internal/functions/map-to-order-processed.ts` |
| Test | `orderservice/test/functions/map-to-order-processed.test.ts` |
| Service | `Order Service` |


## Behaviour

Create an OrderProcessed event from the final order state.
Preserve the order ID, status, and processing time. Count all item results and reserved items; for unsuccessful orders use the final status as the failure reason.




## Stream types
- Input: `OrderState` — `orderservice/src/internal/types/order-state.ts`
- Output: `OrderProcessed` — `model/src/types/order-processed.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `TypeScript` section
- [ ] Open `orderservice/src/internal/functions/map-to-order-processed.ts` and preserve its generated contract
- [ ] Inspect input type `OrderState` in `orderservice/src/internal/types/order-state.ts`
- [ ] Inspect output type `OrderProcessed` in `model/src/types/order-processed.ts`
- [ ] Implement meaningful assertions in `orderservice/test/functions/map-to-order-processed.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] orderservice/task5.md — MapToOrderProcessed — TypeScript — done`