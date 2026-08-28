# Task 3/3: `OrderProcessedEndpointSource`

> Rules: [`spec/rules.md`](../rules.md)

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
- Input: `OrderProcessed` — `model_ts/src/types/order-processed.ts`
- Output: `OrderProcessed` — `model_ts/src/types/order-processed.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `TypeScript` section
- [ ] Open `analyticsservice/src/internal/functions/order-processed-endpoint-source.ts` and preserve its generated contract
- [ ] Inspect input type `OrderProcessed` in `model_ts/src/types/order-processed.ts`
- [ ] Inspect output type `OrderProcessed` in `model_ts/src/types/order-processed.ts`
- [ ] Implement meaningful assertions in `analyticsservice/test/functions/order-processed-endpoint-source.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] analyticsservice/task3.md — OrderProcessedEndpointSource — TypeScript — done`