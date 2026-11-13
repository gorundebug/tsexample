# Task 15/26: `SubstreamAnalyticsInputSource`

> Rules: [`spec/rules.md`](../rules.md)

Paths and commands below are relative to the generated project root.

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
- Emits into graph: `AnalyticsEvent` — `analyticsservice/src/internal/types/analytics-event.ts`
- Receives graph result: `AnalyticsEvent` — `analyticsservice/src/internal/types/analytics-event.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `TypeScript` section
- [ ] Open `analyticsservice/src/internal/functions/substream-analytics-input-source.ts` and preserve its generated contract
- [ ] Inspect emitted message type `AnalyticsEvent` in `analyticsservice/src/internal/types/analytics-event.ts`
- [ ] Inspect graph result type `AnalyticsEvent` in `analyticsservice/src/internal/types/analytics-event.ts`
- [ ] Implement meaningful assertions in `analyticsservice/test/functions/substream-analytics-input-source.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] analyticsservice/task15.md — SubstreamAnalyticsInputSource — TypeScript — done`