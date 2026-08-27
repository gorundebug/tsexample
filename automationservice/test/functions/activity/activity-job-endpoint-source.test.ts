import assert from "node:assert/strict";
import test from "node:test";

import { ActivityJobEndpointSource } from "../../../src/internal/functions/activity/activity-job-endpoint-source.js";

void test("ActivityJobEndpointSource exposes its canonical function contract", () => {
  const function_ = new ActivityJobEndpointSource();
});
