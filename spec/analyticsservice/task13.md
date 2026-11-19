# Task 13/26: `OrderProcessedEndpointSource`

> Rules: [`spec/rules.md`](../rules.md)

Paths and commands below are relative to the generated project root.

| Field | Value |
|-------|-------|
| Language | `TypeScript` |
| Kind | `kafka-source` |
| File | `analyticsservice/src/internal/functions/order-processed-endpoint-source.ts` |
| Test | `analyticsservice/test/functions/order-processed-endpoint-source.test.ts` |
| Service | `Analytics Service` |


## Behaviour

Exchange OrderProcessed events keyed by order ID.
Producers include the final status, processing time, total and confirmed item counts, and a failure reason for unsuccessful orders.
Consumers decode the event and mark its Kafka message processed only after the pipeline handles it successfully.




## Stream types
- Emits into graph: `OrderProcessed` — `model_ts/src/types/order-processed.ts`
- Receives graph result: `OrderProcessed` — `model_ts/src/types/order-processed.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `TypeScript` section
- [ ] Open `analyticsservice/src/internal/functions/order-processed-endpoint-source.ts` and preserve its generated contract
- [ ] Inspect emitted message type `OrderProcessed` in `model_ts/src/types/order-processed.ts`
- [ ] Inspect graph result type `OrderProcessed` in `model_ts/src/types/order-processed.ts`
- [ ] Implement meaningful assertions in `analyticsservice/test/functions/order-processed-endpoint-source.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] analyticsservice/task13.md — OrderProcessedEndpointSource — TypeScript — done`