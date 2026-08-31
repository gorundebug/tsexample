import assert from "node:assert/strict";
import test from "node:test";

import { WorkflowJobEndpointSource } from "#internal/functions/workflow/workflow-job-endpoint-source.js";

void test("WorkflowJobEndpointSource exposes its canonical function contract", () => {
  const function_ = new WorkflowJobEndpointSource();
});
