# Task 1/2: `CountOrderProcessed`

> Rules: [`spec/rules.md`](../rules.md)

| Field | Value |
|-------|-------|
| Language | `TypeScript` |
| Kind | `process` |
| File | `analyticsservice/src/internal/functions/count-order-processed.ts` |
| Test | `analyticsservice/test/functions/count-order-processed.test.ts` |
| Service | `Analytics Service` |


## Behaviour

Count successful and unsuccessful orders independently, then return the event unchanged.




## Stream types
- Input: `OrderProcessed` — `model/src/types/order-processed.ts`
- Output: `OrderProcessed` — `model/src/types/order-processed.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `TypeScript` section
- [ ] Open `analyticsservice/src/internal/functions/count-order-processed.ts` and preserve its generated contract
- [ ] Inspect input type `OrderProcessed` in `model/src/types/order-processed.ts`
- [ ] Inspect output type `OrderProcessed` in `model/src/types/order-processed.ts`
- [ ] Implement meaningful assertions in `analyticsservice/test/functions/count-order-processed.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] analyticsservice/task1.md — CountOrderProcessed — TypeScript — done`