# Task 1/3: `ProcessOrderItemSource`

> Rules: [`spec/rules.md`](../rules.md)

Paths and commands below are relative to the generated project root.

| Field | Value |
|-------|-------|
| Language | `TypeScript` |
| Kind | `grpc-source` |
| File | `inventoryservice/src/internal/functions/process-order-item-source.ts` |
| Test | `inventoryservice/test/functions/process-order-item-source.test.ts` |
| Service | `Inventory Service` |


## Behaviour

Reserve inventory for one order item using its order ID, item ID, SKU, and quantity.
Return the available quantity, reservation outcome, and status. The caller combines this response with the original identity, requested quantity, and unit price.
If the inventory call fails, the caller returns a non-reserved PROCESSING_ERROR result with the failure message.



## External contract

| Field | Value |
|-------|-------|
| Format | `proto` |
| Request | `InventoryServiceApiProcessOrderItemMessages.ProcessOrderItemRequest` |
| Response | `InventoryServiceApiProcessOrderItemMessages.ProcessOrderItemResponse` |


## Stream types
- Emits into graph: `OrderItem` — `model_ts/src/types/order-item.ts`
- Receives graph result: `OrderItemResult` — `model_ts/src/types/order-item-result.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `TypeScript` section
- [ ] Open `inventoryservice/src/internal/functions/process-order-item-source.ts` and preserve its generated contract
- [ ] Inspect emitted message type `OrderItem` in `model_ts/src/types/order-item.ts`
- [ ] Inspect graph result type `OrderItemResult` in `model_ts/src/types/order-item-result.ts`

- [ ] Implement meaningful assertions in `inventoryservice/test/functions/process-order-item-source.test.ts`
- [ ] Verify the endpoint/result lifecycle, including completion and error paths
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] inventoryservice/task1.md — ProcessOrderItemSource — TypeScript — done`