# Task 15/26: `SubstreamAnalyticsInputSource`

> Rules: [`spec/rules.md`](../rules.md)

| Field | Value |
|-------|-------|
| Language | `TypeScript` |
| Kind | `custom-source` |
| File | `analyticsservice/src/internal/functions/substream-analytics-input-source.ts` |
| Test | `analyticsservice/test/functions/substream-analytics-input-source.test.ts` |
| Service | `Analytics Service` |


## Behaviour

Produce one deterministic analytics event that invokes the service-local SubStream example.




## Stream types
- Input: `AnalyticsEvent` — `analyticsservice/src/internal/types/analytics-event.ts`
- Output: `AnalyticsEvent` — `analyticsservice/src/internal/types/analytics-event.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `TypeScript` section
- [ ] Open `analyticsservice/src/internal/functions/substream-analytics-input-source.ts` and preserve its generated contract
- [ ] Inspect input type `AnalyticsEvent` in `analyticsservice/src/internal/types/analytics-event.ts`
- [ ] Inspect output type `AnalyticsEvent` in `analyticsservice/src/internal/types/analytics-event.ts`
- [ ] Implement meaningful assertions in `analyticsservice/test/functions/substream-analytics-input-source.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] analyticsservice/task15.md — SubstreamAnalyticsInputSource — TypeScript — done`