#!/usr/bin/env bash
set -euo pipefail

export PATH="$PWD/node_modules/.bin:$PATH"

mkdir -p "src/generated/http/orderserviceapi"
openapi-typescript "openapi/orderserviceapi/orderserviceapi.generated.yaml" --empty-objects-unknown --output "src/generated/http/orderserviceapi/index.generated.ts"
openapi-ts --file "openapi-ts.orderserviceapi.config.generated.mjs" --no-log-file

prettier --write src/generated/http
