import assert from "node:assert/strict";
import test from "node:test";

import { DurablePause } from "../../src/internal/functions/durable-pause.js";

void test("DurablePause exposes its canonical function contract", () => {
  const function_ = new DurablePause();
  assert.equal(typeof function_.duration, "function");
  assert.equal(typeof function_.delayError, "function");
});
