# Automation Service

Generated TypeScript service package.

```sh
make init            # install pinned dependencies
make build           # compile the service
make test            # run Node tests
make coverage        # run tests with Node coverage
make typecheck       # strict TypeScript project-reference check
make lint            # typecheck and ESLint
make fmt             # format sources with Prettier
make docker-build    # build the autonomous runtime image from copied sources
make docker-up       # build and start only this service
make docker-up-dev   # start with this directory mounted read-only
make debug DEBUG_PORT=2345 # start Node inspector using this host port
make docker-down
make docker-down-dev
make docker-clean    # stop the service and remove its volumes
make clean           # remove TypeScript build/cache artifacts
make help
```

Direct commands default to pinned registry packages (`USE_LOCAL_MODULES=0`) and
ignore an enclosing pnpm workspace. A generated project explicitly passes
`USE_LOCAL_MODULES=1`. For a separately obtained service plus unpublished
modules, place the modules next to it using their generated directory names:

```sh
make build USE_LOCAL_MODULES=1
make docker-build USE_LOCAL_MODULES=1
```

After publishing and pinning those packages, omit the flag or pass
`USE_LOCAL_MODULES=0`. Make does not auto-detect sibling packages.
`DEPENDENCY_PROXY_DIR` independently controls download routing.

The inspector always listens on `2345` inside the container; `DEBUG_PORT`
selects the forwarded host port.

The default application listeners are HTTP `9094`
and gRPC `9204`. The generated
`AUTOMATION_SERVICE_HTTP_PORT` and
`AUTOMATION_SERVICE_GRPC_PORT` variables change the
listener and container-side mapping; the corresponding `_HOST_HTTP_PORT` and
`_HOST_GRPC_PORT` variables change only host forwarding.

Use `make debug` to start the development image with the Node inspector on
`localhost:2345`. Source maps are enabled. Send `SIGUSR1` for a Node diagnostic
report or `SIGUSR2` for a heap snapshot; artifacts are written below
`.artifacts/node-diagnostics` in development and `/tmp/node-diagnostics` in the
minimal runtime image.
