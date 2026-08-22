/**
 * User-owned OrderState business type. The generator preserves this file.
 * Processing result of an order. Fields: OrderID string, Status string (CONFIRMED — all items reserved; PARTIALLY_CONFIRMED — some items out of stock; TIMED_OUT — order timed out), ConfirmedItems []OrderItemResult, TotalAmount float64, ProcessedAt time.Time.
 */
import type { OrderItemResult } from "@gorundebug/model";

export interface OrderState {
  readonly orderId: string;
  readonly status: string;
  readonly confirmedItems: readonly OrderItemResult[];
  readonly totalAmount: number;
  readonly processedAt: Date;
}
