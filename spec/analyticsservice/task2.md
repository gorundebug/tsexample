# Task 2/2: `OrderProcessedEndpoint`

> Rules: [`spec/rules.md`](../rules.md)

| Field | Value |
|-------|-------|
| Language | `unknown` |
| Kind | `kafka-source` |
| File | `analyticsservice/src/internal/functions/order-processed-endpoint.ts` |
| Test | `analyticsservice/test/functions/order-processed-endpoint.test.ts` |
| Service | `Analytics Service` |


## Behaviour

Exchange OrderProcessed events keyed by order ID.
Producers include the final status, processing time, total and confirmed item counts, and a failure reason for unsuccessful orders.
Consumers decode the event and mark its Kafka message processed only after the pipeline handles it successfully.




## Stream types
- Input: `OrderProcessed` — `model/src/types/order-processed.ts`
- Output: `OrderProcessed` — `model/src/types/order-processed.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `unknown` section
- [ ] Open `analyticsservice/src/internal/functions/order-processed-endpoint.ts` and preserve its generated contract
- [ ] Inspect input type `OrderProcessed` in `model/src/types/order-processed.ts`
- [ ] Inspect output type `OrderProcessed` in `model/src/types/order-processed.ts`
- [ ] Implement meaningful assertions in `analyticsservice/test/functions/order-processed-endpoint.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] analyticsservice/task2.md — OrderProcessedEndpoint — unknown — done`