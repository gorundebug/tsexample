import assert from "node:assert/strict";
import test from "node:test";

import { FanoutActivityBEndpointSink } from "#internal/functions/activity/fanout-activity-b-endpoint-sink.js";

void test("FanoutActivityBEndpointSink exposes its canonical function contract", () => {
  const function_ = new FanoutActivityBEndpointSink();
});
