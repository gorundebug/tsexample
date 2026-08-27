import assert from "node:assert/strict";
import test from "node:test";

import { FanoutActivityBEndpointSource } from "../../../src/internal/functions/activity/fanout-activity-b-endpoint-source.js";

void test("FanoutActivityBEndpointSource exposes its canonical function contract", () => {
  const function_ = new FanoutActivityBEndpointSource();
});
