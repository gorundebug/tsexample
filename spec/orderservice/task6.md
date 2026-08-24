# Task 6/8: `ProcessOrderItem`

> Rules: [`spec/rules.md`](../rules.md)

| Field | Value |
|-------|-------|
| Language | `TypeScript` |
| Kind | `grpc-sink` |
| File | `orderservice/src/internal/functions/process-order-item.ts` |
| Test | `orderservice/test/functions/process-order-item.test.ts` |
| Service | `Order Service` |


## Behaviour

Reserve inventory for one order item using its order ID, item ID, SKU, and quantity.
Return the available quantity, reservation outcome, and status. The caller combines this response with the original identity, requested quantity, and unit price.
If the inventory call fails, the caller returns a non-reserved PROCESSING_ERROR result with the failure message.



## External contract

| Field | Value |
|-------|-------|
| Format | `proto` |
| Request | `ProcessOrderItemRequest` |
| Response | `ProcessOrderItemResponse` |


## Stream types
- Input: `OrderItem` — `model/src/types/order-item.ts`
- Output: `OrderItemResult` — `model/src/types/order-item-result.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `TypeScript` section
- [ ] Open `orderservice/src/internal/functions/process-order-item.ts` and preserve its generated contract
- [ ] Inspect input type `OrderItem` in `model/src/types/order-item.ts`
- [ ] Inspect output type `OrderItemResult` in `model/src/types/order-item-result.ts`
- [ ] Implement meaningful assertions in `orderservice/test/functions/process-order-item.test.ts`
- [ ] Verify the endpoint/result lifecycle, including completion and error paths
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] orderservice/task6.md — ProcessOrderItem — TypeScript — done`