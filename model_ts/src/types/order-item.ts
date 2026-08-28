/**
 * User-owned OrderItem business type. The generator preserves this file.
 * A single line item within an order. Fields: OrderID string, ItemID string, SKU string, Quantity int.
 */
export interface OrderItem {
  readonly orderId: string;
  readonly itemId: string;
  readonly sku: string;
  readonly quantity: number;
  readonly unitPrice: number;
}
