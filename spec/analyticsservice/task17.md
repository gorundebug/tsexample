# Task 17/17: `RouteAnalyticsResult`

> Rules: [`spec/rules.md`](../rules.md)

| Field | Value |
|-------|-------|
| Language | `TypeScript` |
| Kind | `case` |
| File | `analyticsservice/src/internal/functions/route-analytics-result.ts` |
| Test | `analyticsservice/test/functions/route-analytics-result.test.ts` |
| Service | `Analytics Service` |


## Behaviour

Route high-value analytics results to the first branch and all others to the second branch.




## Stream types
- Input: `AnalyticsResult` — `analyticsservice/src/internal/types/analytics-result.ts`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `TypeScript` section
- [ ] Open `analyticsservice/src/internal/functions/route-analytics-result.ts` and preserve its generated contract
- [ ] Inspect input type `AnalyticsResult` in `analyticsservice/src/internal/types/analytics-result.ts`
- [ ] Implement meaningful assertions in `analyticsservice/test/functions/route-analytics-result.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] analyticsservice/task17.md — RouteAnalyticsResult — TypeScript — done`