/**
 * User-owned Order business type. The generator preserves this file.
 * E-commerce order submitted by a customer. Fields: ID string, CustomerID string, Items []OrderItem, CreatedAt time.Time.
 */
import type { OrderItem } from "@gorundebug/model";

export interface Order {
  readonly id: string;
  readonly customerId: string;
  readonly items: readonly OrderItem[];
  readonly totalAmount: number;
  readonly createdAt: Date;
  readonly traceId: string;
}
