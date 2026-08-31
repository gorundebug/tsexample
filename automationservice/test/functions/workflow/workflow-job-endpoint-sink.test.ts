import assert from "node:assert/strict";
import test from "node:test";

import { WorkflowJobEndpointSink } from "#internal/functions/workflow/workflow-job-endpoint-sink.js";

void test("WorkflowJobEndpointSink exposes its canonical function contract", () => {
  const function_ = new WorkflowJobEndpointSink();
});
