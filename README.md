# Example

Generated TypeScript workspace. Every service and contract/model module is an
independent npm package, while the root workspace provides one command surface
for local development and Docker execution.

## Packages

### Services

- [`analyticsservice`](./analyticsservice/README.md)
- [`inventoryservice`](./inventoryservice/README.md)
- [`orderservice`](./orderservice/README.md)

### Contract and model modules

- [`inventory_service_api`](./inventory_service_api/README.md)
- [`model`](./model/README.md)
- [`order_service_api`](./order_service_api/README.md)

## Docker-first start

Only Git, Docker and Docker Compose v2 are required. Start the complete example
with `make docker-up`.

The first run downloads the pinned Node and package dependencies. Subsequent
builds reuse the versioned BuildKit and pnpm caches.

Useful commands:

```sh
make build          # generate contracts and build every workspace package
make test           # run all service tests
make lint           # run strict ESLint checks
make docker-build   # build independent production service images
make docker-up      # start the Kafka-enabled canonical example
make docker-down    # stop services and remove project volumes
make benchmark      # compare framework/native (use BENCHMARK_ARGS="...")
make profile        # collect profiles (use PROFILING_ARGS="...")
make typescript-package # create standalone service repositories under dist/
make debug-analyticsservice # Node inspector on localhost:2345
make debug-inventoryservice # Node inspector on localhost:2346
make debug-orderservice # Node inspector on localhost:2347
```

The benchmark and profile targets use the corresponding embedded toolkits in a
sibling `conformance` checkout by default. Set `CONFORMANCE_DIR` when it lives
elsewhere. Both receive this workspace's parent as their dependency root, so
they test the current sources rather than silently cloning another example.

Debug targets use the source-mounted development image with source maps.
`SIGUSR1` writes a Node diagnostic report and `SIGUSR2` writes a heap snapshot
under `.artifacts/node-diagnostics/<service>`. Minimal runtime images retain
the same diagnostics under `/tmp/node-diagnostics` without build tooling.

The canonical order endpoint is
`POST http://localhost:9091/v1/processorder`. Status and metrics are exposed by
Order, Inventory and Analytics on ports 9091, 9092 and 9093 respectively.

Set `ORDER_PROCESSED_ENABLED=false` only for benchmark or profiling runs. The
normal example keeps Kafka enabled and runs Redpanda together with all three
services.
