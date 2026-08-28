import assert from "node:assert/strict";
import test from "node:test";

test("generated package exports load as ESM", async () => {
  const packageExports = await import("../dist/index.generated.js");
  assert.equal(typeof packageExports, "object");
});
