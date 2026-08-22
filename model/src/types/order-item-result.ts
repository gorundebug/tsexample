/**
 * User-owned OrderItemResult business type. The generator preserves this file.
 * Inventory reservation result for a single order item. Fields: OrderID string, ItemID string, SKU string, RequestedQty int, AvailableQty int, Reserved bool, Status string (CONFIRMED / OUT_OF_STOCK / PROCESSING_ERROR), UnitPrice float64, Error string.
 */
export interface OrderItemResult {
  readonly orderId: string;
  readonly itemId: string;
  readonly sku: string;
  readonly requestedQty: number;
  readonly availableQty: number;
  readonly reserved: boolean;
  readonly status: string;
  readonly unitPrice: number;
  readonly error: string;
}
