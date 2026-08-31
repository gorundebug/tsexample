import assert from "node:assert/strict";
import test from "node:test";

import { FanoutWorkflowJobEndpointSink } from "#internal/functions/workflow/fanout-workflow-job-endpoint-sink.js";

void test("FanoutWorkflowJobEndpointSink exposes its canonical function contract", () => {
  const function_ = new FanoutWorkflowJobEndpointSink();
});
