#!/usr/bin/env bash
set -euo pipefail

export PATH="$PWD/node_modules/.bin:$PATH"
mkdir -p src/generated/http
openapi-typescript openapi/orderserviceapi/orderserviceapi.generated.yaml --output src/generated/http/index.generated.ts
openapi-ts --file openapi-ts.config.generated.mjs --no-log-file
prettier --write src/generated/http
