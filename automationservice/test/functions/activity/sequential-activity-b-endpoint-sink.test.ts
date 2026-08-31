import assert from "node:assert/strict";
import test from "node:test";

import { SequentialActivityBEndpointSink } from "#internal/functions/activity/sequential-activity-b-endpoint-sink.js";

void test("SequentialActivityBEndpointSink exposes its canonical function contract", () => {
  const function_ = new SequentialActivityBEndpointSink();
});
