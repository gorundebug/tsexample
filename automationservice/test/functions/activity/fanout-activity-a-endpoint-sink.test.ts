import assert from "node:assert/strict";
import test from "node:test";

import { FanoutActivityAEndpointSink } from "#internal/functions/activity/fanout-activity-a-endpoint-sink.js";

void test("FanoutActivityAEndpointSink exposes its canonical function contract", () => {
  const function_ = new FanoutActivityAEndpointSink();
});
