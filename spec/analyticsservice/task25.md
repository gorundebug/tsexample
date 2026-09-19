# Task 25/26: `BuildSubstreamAnalyticsResult`

> Rules: [`spec/rules.md`](../rules.md)

| Field | Value |
|-------|-------|
| Language | `TypeScript` |
| Kind | `map` |
| File | `analyticsservice/src/internal/functions/build-substream-analytics-result.ts` |
| Test | `analyticsservice/test/functions/build-substream-analytics-result.test.ts` |
| Service | `Analytics Service` |


## Behaviour

Transform one callable SubStream input into its analytics result.




## Stream types
- Input: `AnalyticsEvent` — `analyticsservice/src/internal/types/analytics-event.ts`
- Output: `AnalyticsResult` — `analyticsservice/src/internal/types/analytics-result.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `TypeScript` section
- [ ] Open `analyticsservice/src/internal/functions/build-substream-analytics-result.ts` and preserve its generated contract
- [ ] Inspect input type `AnalyticsEvent` in `analyticsservice/src/internal/types/analytics-event.ts`
- [ ] Inspect output type `AnalyticsResult` in `analyticsservice/src/internal/types/analytics-result.ts`
- [ ] Implement meaningful assertions in `analyticsservice/test/functions/build-substream-analytics-result.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] analyticsservice/task25.md — BuildSubstreamAnalyticsResult — TypeScript — done`