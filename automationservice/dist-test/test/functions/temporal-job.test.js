import assert from "node:assert/strict";
import test from "node:test";
import { FunctionCollector, MessageContext, ScheduleBackend, makeScheduleTrigger, } from "@gorundebug/tsservicelib/runtime";
import { TemporalJob } from "../../src/internal/functions/temporal-job.js";
import { TestStream } from "../support/stream.js";
void test("TemporalJob formats the scheduled trigger", async () => {
    const function_ = new TemporalJob();
    const collected = [];
    const trigger = makeScheduleTrigger(2, "durable-report", "2026-08-24T00:00:00Z", "2026-08-24T00:00:01Z", ScheduleBackend.Temporal);
    await function_.map(new MessageContext(), new TestStream(), trigger, new FunctionCollector((_context, value) => {
        collected.push(value);
    }));
    assert.deepEqual(collected, [`temporal:durable-report:${trigger.triggerId}`]);
});
//# sourceMappingURL=temporal-job.test.js.map