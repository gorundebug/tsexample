import assert from "node:assert/strict";
import test from "node:test";

import { SequentialActivityBEndpointSource } from "../../../src/internal/functions/activity/sequential-activity-b-endpoint-source.js";

void test("SequentialActivityBEndpointSource exposes its canonical function contract", () => {
  const function_ = new SequentialActivityBEndpointSource();
});
