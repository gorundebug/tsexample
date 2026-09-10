# Task 4/22: `CompleteCycleAnalytics`

> Rules: [`spec/rules.md`](../rules.md)

| Field | Value |
|-------|-------|
| Language | `TypeScript` |
| Kind | `filter` |
| File | `analyticsservice/src/internal/functions/complete-cycle-analytics.ts` |
| Test | `analyticsservice/test/functions/complete-cycle-analytics.test.ts` |
| Service | `Analytics Service` |


## Behaviour

Keep the terminal analytics event once its cycle counter reaches three.




## Stream types
- Input: `AnalyticsEvent` — `analyticsservice/src/internal/types/analytics-event.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `TypeScript` section
- [ ] Open `analyticsservice/src/internal/functions/complete-cycle-analytics.ts` and preserve its generated contract
- [ ] Inspect input type `AnalyticsEvent` in `analyticsservice/src/internal/types/analytics-event.ts`
- [ ] Implement meaningful assertions in `analyticsservice/test/functions/complete-cycle-analytics.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] analyticsservice/task4.md — CompleteCycleAnalytics — TypeScript — done`