# Task 5/22: `ContinueCycleAnalytics`

> Rules: [`spec/rules.md`](../rules.md)

| Field | Value |
|-------|-------|
| Language | `TypeScript` |
| Kind | `filter` |
| File | `analyticsservice/src/internal/functions/continue-cycle-analytics.ts` |
| Test | `analyticsservice/test/functions/continue-cycle-analytics.test.ts` |
| Service | `Analytics Service` |


## Behaviour

Keep intermediate analytics events whose cycle counter is below three.




## Stream types
- Input: `AnalyticsEvent` — `analyticsservice/src/internal/types/analytics-event.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `TypeScript` section
- [ ] Open `analyticsservice/src/internal/functions/continue-cycle-analytics.ts` and preserve its generated contract
- [ ] Inspect input type `AnalyticsEvent` in `analyticsservice/src/internal/types/analytics-event.ts`
- [ ] Implement meaningful assertions in `analyticsservice/test/functions/continue-cycle-analytics.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] analyticsservice/task5.md — ContinueCycleAnalytics — TypeScript — done`