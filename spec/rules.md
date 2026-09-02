# Implementation Rules

These rules apply to every `spec/*/task*.md`. The generated graph and transport
contracts are the source of truth; business implementations and their tests are
user-owned extension points.

## Project invariants

- Project root: `example/`
- Graph: `example/graph/example.generated.yaml`
- Never edit a file whose name contains `generated`; those files are replaced
  during project merge.
- Never change generated signatures, topology wiring, IDs, config keys, or
  transport contracts in order to make an implementation easier.
- Change `.proto`/OpenAPI source and regenerate; never patch generated bindings.
- Preserve the message/stream context received from the framework.
- Do not keep mutable per-request state in function objects: function instances
  are created once and may process requests concurrently.
- Finish one task at a time and immediately copy its completion line to
  `spec/progress.md`.

## Services

| Service | Language | Directory |
|---------|----------|-----------|
| `Analytics Service` | `TypeScript` | `analyticsservice/` |
| `Automation Service` | `TypeScript` | `automationservice/` |
| `Inventory Service` | `TypeScript` | `inventoryservice/` |
| `Order Service` | `TypeScript` | `orderservice/` |












## TypeScript rules

- Business functions are user-owned classes implementing the generated
  interfaces. Keep their method signatures unchanged. Function and
  infrastructure makers always return a `Promise`; synchronous makers are not
  part of the generated contract.
- Propagate `MessageContext`, await collectors and senders, and do not create
  detached promises for graph work whose completion belongs to the request.
- Use the generated workspace commands:
  - build and strict type checking: `corepack pnpm build`
  - tests: `corepack pnpm test`
  - lint and formatting checks: `corepack pnpm lint` and `corepack pnpm format:check`
- Implement the generated `test/functions/*.test.ts` files.
- Do not modify `*.generated.ts`, generated protobuf/OpenAPI sources, or
  generated package manifests.



## Temporal Workflow determinism

- A function reached from a `temporalExecutionType: Workflow` endpoint is
  replayed by Temporal. It must be deterministic even when the same code is
  also reachable from an ordinary process-side endpoint.
- Do not perform network or filesystem I/O, read process environment or wall
  clocks, generate unrestricted random values, access process-side stores, or
  start native threads, executors, goroutines, asyncio tasks, or detached
  promises from Workflow business code.
- Use the existing generated graph APIs. `Delay` selects the official Temporal
  Workflow timer automatically; `TaskPool` and `PriorityTaskPool` select the
  generated deterministic workflow-local schedulers.
- Emit logs, metrics and traces only through the framework interfaces supplied
  to the Workflow. They are backed by the official replay-safe SDK APIs; never
  call process exporters from Workflow code.
- Go Workflow code must pass the generated `golang-workflowcheck` target.
  Python Workflows run in the official default sandbox. TypeScript Workflows
  are bundled by the official SDK, but deterministic user code remains the
  author's responsibility.


## Endpoint and serialization rules

- External request/response types belong to protobuf/OpenAPI contracts.
- Internal stream types belong to the language backend's model package.
- Convert between external and internal types in endpoint handlers.
- Add serialization only where data crosses a process/storage boundary.
- For source endpoints, verify a real request and include the command in the
  task completion entry when the task asks for it.

## Priority of truth

1. Current task file.
2. Graph definition.
3. `.proto`/OpenAPI source contracts.
4. Generated type signatures.
5. servicelib runtime semantics for the selected language.