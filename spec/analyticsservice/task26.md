# Task 26/26: `InvokeAnalyticsSubstream`

> Rules: [`spec/rules.md`](../rules.md)

| Field | Value |
|-------|-------|
| Language | `TypeScript` |
| Kind | `map` |
| File | `analyticsservice/src/internal/functions/invoke-analytics-substream.ts` |
| Test | `analyticsservice/test/functions/invoke-analytics-substream.test.ts` |
| Service | `Analytics Service` |


## Behaviour

Invoke the service-local analytics SubStream and emit its returned result.




## Stream types
- Input: `AnalyticsEvent` — `analyticsservice/src/internal/types/analytics-event.ts`
- Output: `AnalyticsResult` — `analyticsservice/src/internal/types/analytics-result.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `TypeScript` section
- [ ] Open `analyticsservice/src/internal/functions/invoke-analytics-substream.ts` and preserve its generated contract
- [ ] Inspect input type `AnalyticsEvent` in `analyticsservice/src/internal/types/analytics-event.ts`
- [ ] Inspect output type `AnalyticsResult` in `analyticsservice/src/internal/types/analytics-result.ts`
- [ ] Implement meaningful assertions in `analyticsservice/test/functions/invoke-analytics-substream.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] analyticsservice/task26.md — InvokeAnalyticsSubstream — TypeScript — done`