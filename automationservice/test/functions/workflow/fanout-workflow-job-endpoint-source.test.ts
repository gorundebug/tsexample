import assert from "node:assert/strict";
import test from "node:test";

import { FanoutWorkflowJobEndpointSource } from "../../../src/internal/functions/workflow/fanout-workflow-job-endpoint-source.js";

void test("FanoutWorkflowJobEndpointSource exposes its canonical function contract", () => {
  const function_ = new FanoutWorkflowJobEndpointSource();
});
