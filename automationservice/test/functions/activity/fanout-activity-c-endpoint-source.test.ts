import assert from "node:assert/strict";
import test from "node:test";

import { FanoutActivityCEndpointSource } from "../../../src/internal/functions/activity/fanout-activity-c-endpoint-source.js";

void test("FanoutActivityCEndpointSource exposes its canonical function contract", () => {
  const function_ = new FanoutActivityCEndpointSource();
});
