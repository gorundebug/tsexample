import assert from "node:assert/strict";
import test from "node:test";

import { SequentialActivityAEndpointSink } from "../../../src/internal/functions/activity/sequential-activity-a-endpoint-sink.js";

void test("SequentialActivityAEndpointSink exposes its canonical function contract", () => {
  const function_ = new SequentialActivityAEndpointSink();
});
