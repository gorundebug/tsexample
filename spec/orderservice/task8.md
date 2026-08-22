# Task 8/8: `SoftDeadline`

> Rules: [`spec/rules.md`](../rules.md)

| Field | Value |
|-------|-------|
| Language | `unknown` |
| Kind | `delay` |
| File | `orderservice/src/internal/functions/soft-deadline.ts` |
| Test | `orderservice/test/functions/soft-deadline.test.ts` |
| Service | `Order Service` |


## Behaviour

Trigger the timeout branch shortly before the request deadline, leaving the configured duration to assemble a response.
When no request deadline exists, use the configured duration itself. Never wait past an existing deadline.




## Stream types
- Input: `Order` — `orderservice/src/internal/types/order.ts`
- Output: `Order` — `orderservice/src/internal/types/order.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `unknown` section
- [ ] Open `orderservice/src/internal/functions/soft-deadline.ts` and preserve its generated contract
- [ ] Inspect input type `Order` in `orderservice/src/internal/types/order.ts`
- [ ] Inspect output type `Order` in `orderservice/src/internal/types/order.ts`
- [ ] Implement meaningful assertions in `orderservice/test/functions/soft-deadline.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] orderservice/task8.md — SoftDeadline — unknown — done`