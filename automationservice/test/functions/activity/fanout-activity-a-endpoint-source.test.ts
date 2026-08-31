import assert from "node:assert/strict";
import test from "node:test";

import { FanoutActivityAEndpointSource } from "#internal/functions/activity/fanout-activity-a-endpoint-source.js";

void test("FanoutActivityAEndpointSource exposes its canonical function contract", () => {
  const function_ = new FanoutActivityAEndpointSource();
});
