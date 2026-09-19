# Task 10/26: `CycleAnalyticsResultSink`

> Rules: [`spec/rules.md`](../rules.md)

| Field | Value |
|-------|-------|
| Language | `TypeScript` |
| Kind | `custom-sink` |
| File | `analyticsservice/src/internal/functions/cycle-analytics-result-sink.ts` |
| Test | `analyticsservice/test/functions/cycle-analytics-result-sink.test.ts` |
| Service | `Analytics Service` |


## Behaviour

Validate the terminal event emitted after three passes through the feedback cycle.




## Stream types
- Input: `AnalyticsEvent` — `analyticsservice/src/internal/types/analytics-event.ts`
- Output: `AnalyticsEvent` — `analyticsservice/src/internal/types/analytics-event.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `TypeScript` section
- [ ] Open `analyticsservice/src/internal/functions/cycle-analytics-result-sink.ts` and preserve its generated contract
- [ ] Inspect input type `AnalyticsEvent` in `analyticsservice/src/internal/types/analytics-event.ts`
- [ ] Inspect output type `AnalyticsEvent` in `analyticsservice/src/internal/types/analytics-event.ts`
- [ ] Implement meaningful assertions in `analyticsservice/test/functions/cycle-analytics-result-sink.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] analyticsservice/task10.md — CycleAnalyticsResultSink — TypeScript — done`