import assert from "node:assert/strict";
import test from "node:test";

import type { SubStream } from "@gorundebug/tsservicelib/runtime/graph";
import type { AnalyticsEvent, AnalyticsResult } from "#internal/types/index.generated.js";
import { InvokeAnalyticsSubstream } from "#internal/functions/substreamanalytics/invoke-analytics-substream.js";

void test("InvokeAnalyticsSubstream exposes its canonical function contract", () => {
  const substream: SubStream<AnalyticsEvent, AnalyticsResult> = {
    consume: async () => undefined,
  };
  const function_ = new InvokeAnalyticsSubstream(substream);
  assert.equal(typeof function_.map, "function");
});
