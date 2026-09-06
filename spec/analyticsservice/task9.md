# Task 9/17: `StandardAnalyticsSink`

> Rules: [`spec/rules.md`](../rules.md)

| Field | Value |
|-------|-------|
| Language | `TypeScript` |
| Kind | `custom-sink` |
| File | `analyticsservice/src/internal/functions/standard-analytics-sink.ts` |
| Test | `analyticsservice/test/functions/standard-analytics-sink.test.ts` |
| Service | `Analytics Service` |


## Behaviour

Validate and record analytics results routed to the standard Case branch.




## Stream types
- Input: `AnalyticsResult` — `analyticsservice/src/internal/types/analytics-result.ts`
- Output: `AnalyticsResult` — `analyticsservice/src/internal/types/analytics-result.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `TypeScript` section
- [ ] Open `analyticsservice/src/internal/functions/standard-analytics-sink.ts` and preserve its generated contract
- [ ] Inspect input type `AnalyticsResult` in `analyticsservice/src/internal/types/analytics-result.ts`
- [ ] Inspect output type `AnalyticsResult` in `analyticsservice/src/internal/types/analytics-result.ts`
- [ ] Implement meaningful assertions in `analyticsservice/test/functions/standard-analytics-sink.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] analyticsservice/task9.md — StandardAnalyticsSink — TypeScript — done`