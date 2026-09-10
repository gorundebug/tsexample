# Task 6/22: `AnalyticsOrdersSource`

> Rules: [`spec/rules.md`](../rules.md)

| Field | Value |
|-------|-------|
| Language | `TypeScript` |
| Kind | `custom-source` |
| File | `analyticsservice/src/internal/functions/analytics-orders-source.ts` |
| Test | `analyticsservice/test/functions/analytics-orders-source.test.ts` |
| Service | `Analytics Service` |


## Behaviour

Produce a deterministic order analytics event for the canonical join examples.




## Stream types
- Input: `AnalyticsEvent` — `analyticsservice/src/internal/types/analytics-event.ts`
- Output: `AnalyticsEvent` — `analyticsservice/src/internal/types/analytics-event.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `TypeScript` section
- [ ] Open `analyticsservice/src/internal/functions/analytics-orders-source.ts` and preserve its generated contract
- [ ] Inspect input type `AnalyticsEvent` in `analyticsservice/src/internal/types/analytics-event.ts`
- [ ] Inspect output type `AnalyticsEvent` in `analyticsservice/src/internal/types/analytics-event.ts`
- [ ] Implement meaningful assertions in `analyticsservice/test/functions/analytics-orders-source.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] analyticsservice/task6.md — AnalyticsOrdersSource — TypeScript — done`