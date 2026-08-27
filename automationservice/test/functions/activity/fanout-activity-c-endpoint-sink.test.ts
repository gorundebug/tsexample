import assert from "node:assert/strict";
import test from "node:test";

import { FanoutActivityCEndpointSink } from "../../../src/internal/functions/activity/fanout-activity-c-endpoint-sink.js";

void test("FanoutActivityCEndpointSink exposes its canonical function contract", () => {
  const function_ = new FanoutActivityCEndpointSink();
});
