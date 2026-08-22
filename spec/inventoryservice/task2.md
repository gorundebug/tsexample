# Task 2/2: `ProcessOrderItem`

> Rules: [`spec/rules.md`](../rules.md)

| Field | Value |
|-------|-------|
| Language | `unknown` |
| Kind | `grpc-source` |
| File | `inventoryservice/src/internal/functions/process-order-item.ts` |
| Test | `inventoryservice/test/functions/process-order-item.test.ts` |
| Service | `Inventory Service` |


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

- [ ] Read [`spec/rules.md`](../rules.md), especially the `unknown` section
- [ ] Open `inventoryservice/src/internal/functions/process-order-item.ts` and preserve its generated contract
- [ ] Inspect input type `OrderItem` in `model/src/types/order-item.ts`
- [ ] Inspect output type `OrderItemResult` in `model/src/types/order-item-result.ts`
- [ ] Implement meaningful assertions in `inventoryservice/test/functions/process-order-item.test.ts`
- [ ] Verify the endpoint/result lifecycle, including completion and error paths
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] inventoryservice/task2.md — ProcessOrderItem — unknown — done`