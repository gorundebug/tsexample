# Task 1/3: `LocalJob`

> Rules: [`spec/rules.md`](../rules.md)

| Field | Value |
|-------|-------|
| Language | `unknown` |
| Kind | `map` |
| File | `automationservice/src/internal/functions/local-job.ts` |
| Test | `automationservice/test/functions/local-job.test.ts` |
| Service | `Automation Service` |


## Behaviour

Create a job message identifying the local scheduled firing.




## Stream types
- Input: `ScheduleTrigger`

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `unknown` section
- [ ] Open `automationservice/src/internal/functions/local-job.ts` and preserve its generated contract
- [ ] Implement meaningful assertions in `automationservice/test/functions/local-job.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] automationservice/task1.md — LocalJob — unknown — done`