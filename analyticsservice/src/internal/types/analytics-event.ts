/**
 * User-owned AnalyticsEvent business type. The generator preserves this file.
 * Input for the canonical analytics joins. Fields: Key AnalyticsKey, Value int, Kind string.
 */
export interface AnalyticsEvent {
  readonly key: string;
  readonly value: number;
  readonly kind: string;
}
