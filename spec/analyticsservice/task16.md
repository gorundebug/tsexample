# Task 16/26: `SubstreamAnalyticsResultSink`

> Rules: [`spec/rules.md`](../rules.md)

| Field | Value |
|-------|-------|
| Language | `TypeScript` |
| Kind | `custom-sink` |
| File | `analyticsservice/src/internal/functions/substream-analytics-result-sink.ts` |
| Test | `analyticsservice/test/functions/substream-analytics-result-sink.test.ts` |
| Service | `Analytics Service` |


## Behaviour

Validate and record the result returned by the service-local SubStream example.




## Stream types
- Input: `AnalyticsResult` — `analyticsservice/src/internal/types/analytics-result.ts`
- Output: `AnalyticsResult` — `analyticsservice/src/internal/types/analytics-result.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `TypeScript` section
- [ ] Open `analyticsservice/src/internal/functions/substream-analytics-result-sink.ts` and preserve its generated contract
- [ ] Inspect input type `AnalyticsResult` in `analyticsservice/src/internal/types/analytics-result.ts`
- [ ] Inspect output type `AnalyticsResult` in `analyticsservice/src/internal/types/analytics-result.ts`
- [ ] Implement meaningful assertions in `analyticsservice/test/functions/substream-analytics-result-sink.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] analyticsservice/task16.md — SubstreamAnalyticsResultSink — TypeScript — done`