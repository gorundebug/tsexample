import assert from "node:assert/strict";
import test from "node:test";

import { ActivityJobEndpointSink } from "../../../src/internal/functions/activity/activity-job-endpoint-sink.js";

void test("ActivityJobEndpointSink exposes its canonical function contract", () => {
  const function_ = new ActivityJobEndpointSink();
});
