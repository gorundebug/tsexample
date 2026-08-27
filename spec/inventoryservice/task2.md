# Task 2/2: `GetInventoryItemData`

> Rules: [`spec/rules.md`](../rules.md)

| Field | Value |
|-------|-------|
| Language | `TypeScript` |
| Kind | `process` |
| File | `inventoryservice/src/internal/functions/get-inventory-item-data.ts` |
| Test | `inventoryservice/test/functions/get-inventory-item-data.test.ts` |
| Service | `Inventory Service` |


## Behaviour

Reserve the requested quantity without allowing concurrent orders to overdraw stock.
On success, return CONFIRMED with the requested quantity available. Otherwise return OUT_OF_STOCK with the current available quantity.
Preserve the order and item identity, requested quantity, and unit price.
The example starts with SKU-001: 100, SKU-002: 50, and SKU-003: 25.




## Stream types
- Input: `OrderItem` — `model/src/types/order-item.ts`
- Output: `OrderItemResult` — `model/src/types/order-item-result.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `TypeScript` section
- [ ] Open `inventoryservice/src/internal/functions/get-inventory-item-data.ts` and preserve its generated contract
- [ ] Inspect input type `OrderItem` in `model/src/types/order-item.ts`
- [ ] Inspect output type `OrderItemResult` in `model/src/types/order-item-result.ts`
- [ ] Implement meaningful assertions in `inventoryservice/test/functions/get-inventory-item-data.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] inventoryservice/task2.md — GetInventoryItemData — TypeScript — done`