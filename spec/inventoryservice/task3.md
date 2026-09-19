# Task 3/3: `GetInventoryItemError`

> Rules: [`spec/rules.md`](../rules.md)

| Field | Value |
|-------|-------|
| Language | `TypeScript` |
| Kind | `map` |
| File | `inventoryservice/src/internal/functions/get-inventory-item-error.ts` |
| Test | `inventoryservice/test/functions/get-inventory-item-error.test.ts` |
| Service | `Inventory Service` |


## Behaviour

When inventory processing fails, return an OUT_OF_STOCK result with no available quantity.
Preserve the order and item identity and requested quantity, and record the failure.




## Stream types
- Output: `OrderItemResult` — `model_ts/src/types/order-item-result.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `TypeScript` section
- [ ] Open `inventoryservice/src/internal/functions/get-inventory-item-error.ts` and preserve its generated contract
- [ ] Inspect output type `OrderItemResult` in `model_ts/src/types/order-item-result.ts`
- [ ] Implement meaningful assertions in `inventoryservice/test/functions/get-inventory-item-error.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] inventoryservice/task3.md — GetInventoryItemError — TypeScript — done`