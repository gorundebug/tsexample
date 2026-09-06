/**
 * User-owned AnalyticsResult business type. The generator preserves this file.
 * Output of the canonical analytics joins. Fields: Key AnalyticsKey, Total int, Kind string.
 */
export interface AnalyticsResult {
  readonly key: string;
  readonly total: number;
  readonly kind: string;
}
