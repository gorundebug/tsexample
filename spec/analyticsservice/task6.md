# Task 6/26: `AnalyticsOrdersSource`

> Rules: [`spec/rules.md`](../rules.md)

Paths and commands below are relative to the generated project root.

| Field | Value |
|-------|-------|
| Language | `TypeScript` |
| Kind | `custom-source` |
| File | `analyticsservice/src/internal/functions/analytics-orders-source.ts` |
| Test | `analyticsservice/test/functions/analytics-orders-source.test.ts` |
| Service | `Analytics Service` |


## Behaviour

Produce a deterministic order analytics event for the canonical join examples.




## Stream types
- Emits into graph: `AnalyticsEvent` — `analyticsservice/src/internal/types/analytics-event.ts`
- Receives graph result: `AnalyticsEvent` — `analyticsservice/src/internal/types/analytics-event.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `TypeScript` section
- [ ] Open `analyticsservice/src/internal/functions/analytics-orders-source.ts` and preserve its generated contract
- [ ] Inspect emitted message type `AnalyticsEvent` in `analyticsservice/src/internal/types/analytics-event.ts`
- [ ] Inspect graph result type `AnalyticsEvent` in `analyticsservice/src/internal/types/analytics-event.ts`

- [ ] Implement meaningful assertions in `analyticsservice/test/functions/analytics-orders-source.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] analyticsservice/task6.md — AnalyticsOrdersSource — TypeScript — done`