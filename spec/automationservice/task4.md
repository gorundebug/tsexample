# Task 4/5: `TemporalJob`

> Rules: [`spec/rules.md`](../rules.md)

| Field | Value |
|-------|-------|
| Language | `TypeScript` |
| Kind | `map` |
| File | `automationservice/src/internal/functions/temporal-job.ts` |
| Test | `automationservice/test/functions/temporal-job.test.ts` |
| Service | `Automation Service` |


## Behaviour

Create a job message identifying the durable scheduled firing.




## Stream types
- Input: `ScheduleTrigger`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `TypeScript` section
- [ ] Open `automationservice/src/internal/functions/temporal-job.ts` and preserve its generated contract
- [ ] Implement meaningful assertions in `automationservice/test/functions/temporal-job.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] automationservice/task4.md — TemporalJob — TypeScript — done`