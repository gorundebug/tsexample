# Task 21/22: `MultiJoinAnalyticsEvents`

> Rules: [`spec/rules.md`](../rules.md)

| Field | Value |
|-------|-------|
| Language | `TypeScript` |
| Kind | `multiJoin` |
| File | `analyticsservice/src/internal/functions/multi-join-analytics-events.ts` |
| Test | `analyticsservice/test/functions/multi-join-analytics-events.test.ts` |
| Service | `Analytics Service` |


## Behaviour

Combine matching order, payment, and shipment analytics events.




## Stream types
- Output: `AnalyticsResult` — `analyticsservice/src/internal/types/analytics-result.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `TypeScript` section
- [ ] Open `analyticsservice/src/internal/functions/multi-join-analytics-events.ts` and preserve its generated contract
- [ ] Inspect output type `AnalyticsResult` in `analyticsservice/src/internal/types/analytics-result.ts`
- [ ] Implement meaningful assertions in `analyticsservice/test/functions/multi-join-analytics-events.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] analyticsservice/task21.md — MultiJoinAnalyticsEvents — TypeScript — done`