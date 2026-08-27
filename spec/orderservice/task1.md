# Task 1/8: `OrderProcessedEndpointSink`

> Rules: [`spec/rules.md`](../rules.md)

| Field | Value |
|-------|-------|
| Language | `TypeScript` |
| Kind | `kafka-sink` |
| File | `orderservice/src/internal/functions/order-processed-endpoint-sink.ts` |
| Test | `orderservice/test/functions/order-processed-endpoint-sink.test.ts` |
| Service | `Order Service` |


## Behaviour

Exchange OrderProcessed events keyed by order ID.
Producers include the final status, processing time, total and confirmed item counts, and a failure reason for unsuccessful orders.
Consumers decode the event and mark its Kafka message processed only after the pipeline handles it successfully.




## Stream types
- Input: `OrderProcessed` — `model/src/types/order-processed.ts`
- Output: `OrderProcessed` — `model/src/types/order-processed.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `TypeScript` section
- [ ] Open `orderservice/src/internal/functions/order-processed-endpoint-sink.ts` and preserve its generated contract
- [ ] Inspect input type `OrderProcessed` in `model/src/types/order-processed.ts`
- [ ] Inspect output type `OrderProcessed` in `model/src/types/order-processed.ts`
- [ ] Implement meaningful assertions in `orderservice/test/functions/order-processed-endpoint-sink.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] orderservice/task1.md — OrderProcessedEndpointSink — TypeScript — done`