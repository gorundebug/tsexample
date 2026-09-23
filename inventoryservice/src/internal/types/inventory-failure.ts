import type { OrderItem } from '@gorundebug/model';

/** Inventory shortage data carried by the business error branch. */
export interface InventoryFailure {
  readonly item: Readonly<OrderItem>;
  readonly availableQty: number;
}
