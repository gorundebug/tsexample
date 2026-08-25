import assert from "node:assert/strict";
import test from "node:test";

import { ObserveWorkflowResult } from "../../src/internal/functions/observe-workflow-result.js";

void test("ObserveWorkflowResult exposes its canonical function contract", () => {
  const function_ = new ObserveWorkflowResult();
  assert.equal(typeof function_.map, "function");
});
