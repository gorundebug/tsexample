/**
 * User-owned OrderProcessed business type. The generator preserves this file.
 * Final order-processing event. Fields: OrderID string, Status string, ProcessedAt time.Time, TotalItems int, ConfirmedItems int, FailureReason string.
 */
export interface OrderProcessed {
  readonly orderId: string;
  readonly status: string;
  readonly processedAt: Date;
  readonly totalItems: number;
  readonly confirmedItems: number;
  readonly failureReason: string;
}
