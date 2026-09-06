# Task 14/17: `KeyPaymentsForMultiJoin`

> Rules: [`spec/rules.md`](../rules.md)

| Field | Value |
|-------|-------|
| Language | `TypeScript` |
| Kind | `keyBy` |
| File | `analyticsservice/src/internal/functions/key-payments-for-multi-join.ts` |
| Test | `analyticsservice/test/functions/key-payments-for-multi-join.test.ts` |
| Service | `Analytics Service` |


## Behaviour

Key the payment analytics event for the multi-way join.




## Stream types
- Input: `AnalyticsEvent` — `analyticsservice/src/internal/types/analytics-event.ts`
- Output: `AnalyticsEvent` — `analyticsservice/src/internal/types/analytics-event.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `TypeScript` section
- [ ] Open `analyticsservice/src/internal/functions/key-payments-for-multi-join.ts` and preserve its generated contract
- [ ] Inspect input type `AnalyticsEvent` in `analyticsservice/src/internal/types/analytics-event.ts`
- [ ] Inspect output type `AnalyticsEvent` in `analyticsservice/src/internal/types/analytics-event.ts`
- [ ] Implement meaningful assertions in `analyticsservice/test/functions/key-payments-for-multi-join.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] analyticsservice/task14.md — KeyPaymentsForMultiJoin — TypeScript — done`