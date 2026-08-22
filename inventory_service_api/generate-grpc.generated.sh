#!/usr/bin/env bash
set -euo pipefail

# Generated protobuf sources remain static and typed; no dynamic proto loader.
export PATH="$PWD/node_modules/.bin:$PATH"
"${BUF:-buf}" generate --template buf.gen.generated.yaml --path proto/inventoryserviceapi/inventoryserviceapi.generated.proto --path proto/inventoryserviceapi/processorderitem/processorderitem.proto
prettier --write src/generated/grpc
