# Task 1/4: `DurablePause`

> Rules: [`spec/rules.md`](../rules.md)

| Field | Value |
|-------|-------|
| Language | `TypeScript` |
| Kind | `delay` |
| File | `automationservice/src/internal/functions/durable-pause.ts` |
| Test | `automationservice/test/functions/durable-pause.test.ts` |
| Service | `Automation Service` |


## Behaviour

Suspend a DurableCall through a Temporal timer, then resume the pipeline without occupying an Activity slot.




## Stream types

## Checklist

- [ ] Read [`spec/rules.md`](../rules.md), especially the `TypeScript` section
- [ ] Open `automationservice/src/internal/functions/durable-pause.ts` and preserve its generated contract
- [ ] Implement meaningful assertions in `automationservice/test/functions/durable-pause.test.ts`
- [ ] Re-read this checklist
- [ ] Append to `spec/progress.md`: `- [x] automationservice/task1.md — DurablePause — TypeScript — done`