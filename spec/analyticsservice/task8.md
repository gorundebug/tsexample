# Task 8/26: `AnalyticsShipmentsSource`

> Rules: [`spec/rules.md`](../rules.md)

Paths and commands below are relative to the generated project root.

| Field | Value |
|-------|-------|
| Language | `TypeScript` |
| Kind | `custom-source` |
| File | `analyticsservice/src/internal/functions/analytics-shipments-source.ts` |
| Test | `analyticsservice/test/functions/analytics-shipments-source.test.ts` |
| Service | `Analytics Service` |


## Behaviour

Produce a deterministic shipment analytics event for the canonical multi-way join example.




## Stream types
- Emits into graph: `AnalyticsEvent` — `analyticsservice/src/internal/types/analytics-event.ts`
- Receives graph result: `AnalyticsEvent` — `analyticsservice/src/internal/types/analytics-event.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `TypeScript` section
- [ ] Open `analyticsservice/src/internal/functions/analytics-shipments-source.ts` and preserve its generated contract
- [ ] Inspect emitted message type `AnalyticsEvent` in `analyticsservice/src/internal/types/analytics-event.ts`
- [ ] Inspect graph result type `AnalyticsEvent` in `analyticsservice/src/internal/types/analytics-event.ts`
- [ ] Implement meaningful assertions in `analyticsservice/test/functions/analytics-shipments-source.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] analyticsservice/task8.md — AnalyticsShipmentsSource — TypeScript — done`