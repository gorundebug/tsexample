# Task 7/8: `ProcessOrderItems`

> Rules: [`spec/rules.md`](../rules.md)

| Field | Value |
|-------|-------|
| Language | `unknown` |
| Kind | `flatMap` |
| File | `orderservice/src/internal/functions/process-order-items.ts` |
| Test | `orderservice/test/functions/process-order-items.test.ts` |
| Service | `Order Service` |


## Behaviour

Emit every order item independently for inventory processing.
Preserve each item's data and assign the parent order ID.




## Stream types
- Input: `Order` — `orderservice/src/internal/types/order.ts`
- Output: `OrderItem` — `model/src/types/order-item.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `unknown` section
- [ ] Open `orderservice/src/internal/functions/process-order-items.ts` and preserve its generated contract
- [ ] Inspect input type `Order` in `orderservice/src/internal/types/order.ts`
- [ ] Inspect output type `OrderItem` in `model/src/types/order-item.ts`
- [ ] Implement meaningful assertions in `orderservice/test/functions/process-order-items.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] orderservice/task7.md — ProcessOrderItems — unknown — done`