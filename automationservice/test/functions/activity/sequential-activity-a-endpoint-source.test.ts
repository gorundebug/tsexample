import assert from "node:assert/strict";
import test from "node:test";

import { SequentialActivityAEndpointSource } from "../../../src/internal/functions/activity/sequential-activity-a-endpoint-source.js";

void test("SequentialActivityAEndpointSource exposes its canonical function contract", () => {
  const function_ = new SequentialActivityAEndpointSource();
});
