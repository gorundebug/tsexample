# Task 10/17: `JoinOrderPaymentAnalytics`

> Rules: [`spec/rules.md`](../rules.md)

| Field | Value |
|-------|-------|
| Language | `TypeScript` |
| Kind | `join` |
| File | `analyticsservice/src/internal/functions/join-order-payment-analytics.ts` |
| Test | `analyticsservice/test/functions/join-order-payment-analytics.test.ts` |
| Service | `Analytics Service` |


## Behaviour

Join matching order and payment analytics events and emit their combined total.




## Stream types
- Output: `AnalyticsResult` — `analyticsservice/src/internal/types/analytics-result.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `TypeScript` section
- [ ] Open `analyticsservice/src/internal/functions/join-order-payment-analytics.ts` and preserve its generated contract
- [ ] Inspect output type `AnalyticsResult` in `analyticsservice/src/internal/types/analytics-result.ts`
- [ ] Implement meaningful assertions in `analyticsservice/test/functions/join-order-payment-analytics.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] analyticsservice/task10.md — JoinOrderPaymentAnalytics — TypeScript — done`