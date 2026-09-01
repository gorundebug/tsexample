ARG DEPENDENCY_DOCKER_REGISTRY=docker.io
FROM ${DEPENDENCY_DOCKER_REGISTRY}/library/node:24.19.0-bookworm-slim AS development
ARG TARGETARCH
ARG NPM_CONFIG_REGISTRY=https://registry.npmjs.org/
ARG GIT_CONFIG_COUNT=0
ARG GIT_CONFIG_KEY_0=
ARG GIT_CONFIG_VALUE_0=
ARG GIT_CONFIG_KEY_1=
ARG GIT_CONFIG_VALUE_1=
ARG DEPENDENCY_GITHUB_RAW_URL=https://github.com
ENV CI=true \
    NPM_CONFIG_REGISTRY=${NPM_CONFIG_REGISTRY} \
    COREPACK_NPM_REGISTRY=${NPM_CONFIG_REGISTRY} \
    GIT_CONFIG_COUNT=${GIT_CONFIG_COUNT} \
    GIT_CONFIG_KEY_0=${GIT_CONFIG_KEY_0} \
    GIT_CONFIG_VALUE_0=${GIT_CONFIG_VALUE_0} \
    GIT_CONFIG_KEY_1=${GIT_CONFIG_KEY_1} \
    GIT_CONFIG_VALUE_1=${GIT_CONFIG_VALUE_1}
ENV DEPENDENCY_GITHUB_RAW_URL=${DEPENDENCY_GITHUB_RAW_URL}
COPY dependency-download-mirrors.generated.env /etc/servicegen/dependency-download-mirrors.generated.env
COPY dependency-download-mirrors.env /etc/servicegen/dependency-download-mirrors.env
COPY dependency-download-env.generated.sh /usr/local/bin/servicegen-download-env
COPY dependency-download-node-preload.generated.cjs /usr/local/lib/dependency-download-node-preload.generated.cjs
COPY prepare-local-build.generated.sh /usr/local/bin/prepare-local-build
SHELL ["/usr/local/bin/servicegen-download-env", "/bin/sh", "-c"]
ENV NODE_OPTIONS=--require=/usr/local/lib/dependency-download-node-preload.generated.cjs
RUN corepack enable \
    && corepack prepare pnpm@11.18.0 --activate \
    && corepack pnpm config set registry "${NPM_CONFIG_REGISTRY}"
WORKDIR /workspace
COPY package*.json ./
COPY --from=tsservicelib-source . /tmp/tsservicelib-source
RUN set -eu; \
    source_dir=/tmp/tsservicelib-source; \
    archive=$(find "$source_dir" -mindepth 1 -maxdepth 1 -type f \( -name context -o -name '*.tar' -o -name '*.tar.gz' -o -name '*.tgz' -o -name '*.tar.xz' \) -print -quit); \
    if [ -n "$archive" ]; then \
      mkdir -p /tmp/tsservicelib-archive; \
      tar -xf "$archive" -C /tmp/tsservicelib-archive; \
      source_dir=/tmp/tsservicelib-archive; \
    fi; \
    manifest="$source_dir/package.json"; \
    if [ ! -f "$manifest" ]; then manifest=$(find "$source_dir" -mindepth 2 -maxdepth 2 -type f -name package.json -print -quit); fi; \
    if [ -z "$manifest" ] || [ ! -f "$manifest" ]; then echo "tsservicelib source context has no package.json" >&2; exit 1; fi; \
    source_dir=${manifest%/package.json}; \
    if [ -z "$source_dir" ] || [ "$source_dir" = "/" ]; then echo "unsafe tsservicelib source directory" >&2; exit 1; fi; \
    mkdir -p /workspace/.tsservicelib; \
    cp -a "$source_dir/." /workspace/.tsservicelib/; \
    rm -rf /tmp/tsservicelib-source /tmp/tsservicelib-archive
COPY --from=module-inventory_service_api-source / /tmp/module-inventory_service_api-source
RUN set -eu; \
    source_dir=/tmp/module-inventory_service_api-source; \
    archive=$(find "$source_dir" -mindepth 1 -maxdepth 1 -type f \( -name context -o -name '*.tar' -o -name '*.tar.gz' -o -name '*.tgz' -o -name '*.tar.xz' \) -print -quit); \
    if [ -n "$archive" ]; then \
      mkdir -p /tmp/module-inventory_service_api-archive; \
      tar -xf "$archive" -C /tmp/module-inventory_service_api-archive; \
      source_dir=/tmp/module-inventory_service_api-archive; \
    fi; \
    manifest=$(find "$source_dir" -type f -path '*/inventory_service_api/package.json' -print -quit); \
    if [ -z "$manifest" ]; then manifest="$source_dir/package.json"; fi; \
    if [ ! -f "$manifest" ]; then manifest=$(find "$source_dir" -mindepth 2 -maxdepth 2 -type f -name package.json -print -quit); fi; \
    if [ -z "$manifest" ] || [ ! -f "$manifest" ]; then echo "module inventory_service_api source context has no package.json" >&2; exit 1; fi; \
    source_dir=${manifest%/package.json}; \
    mkdir -p /workspace/modules/inventory_service_api; \
    cp -a "$source_dir/." /workspace/modules/inventory_service_api/; \
    rm -rf /tmp/module-inventory_service_api-source /tmp/module-inventory_service_api-archive
COPY --from=module-model_ts-source / /tmp/module-model_ts-source
RUN set -eu; \
    source_dir=/tmp/module-model_ts-source; \
    archive=$(find "$source_dir" -mindepth 1 -maxdepth 1 -type f \( -name context -o -name '*.tar' -o -name '*.tar.gz' -o -name '*.tgz' -o -name '*.tar.xz' \) -print -quit); \
    if [ -n "$archive" ]; then \
      mkdir -p /tmp/module-model_ts-archive; \
      tar -xf "$archive" -C /tmp/module-model_ts-archive; \
      source_dir=/tmp/module-model_ts-archive; \
    fi; \
    manifest=$(find "$source_dir" -type f -path '*/model_ts/package.json' -print -quit); \
    if [ -z "$manifest" ]; then manifest="$source_dir/package.json"; fi; \
    if [ ! -f "$manifest" ]; then manifest=$(find "$source_dir" -mindepth 2 -maxdepth 2 -type f -name package.json -print -quit); fi; \
    if [ -z "$manifest" ] || [ ! -f "$manifest" ]; then echo "module model_ts source context has no package.json" >&2; exit 1; fi; \
    source_dir=${manifest%/package.json}; \
    mkdir -p /workspace/modules/model_ts; \
    cp -a "$source_dir/." /workspace/modules/model_ts/; \
    rm -rf /tmp/module-model_ts-source /tmp/module-model_ts-archive
COPY --from=module-order_service_api-source / /tmp/module-order_service_api-source
RUN set -eu; \
    source_dir=/tmp/module-order_service_api-source; \
    archive=$(find "$source_dir" -mindepth 1 -maxdepth 1 -type f \( -name context -o -name '*.tar' -o -name '*.tar.gz' -o -name '*.tgz' -o -name '*.tar.xz' \) -print -quit); \
    if [ -n "$archive" ]; then \
      mkdir -p /tmp/module-order_service_api-archive; \
      tar -xf "$archive" -C /tmp/module-order_service_api-archive; \
      source_dir=/tmp/module-order_service_api-archive; \
    fi; \
    manifest=$(find "$source_dir" -type f -path '*/order_service_api/package.json' -print -quit); \
    if [ -z "$manifest" ]; then manifest="$source_dir/package.json"; fi; \
    if [ ! -f "$manifest" ]; then manifest=$(find "$source_dir" -mindepth 2 -maxdepth 2 -type f -name package.json -print -quit); fi; \
    if [ -z "$manifest" ] || [ ! -f "$manifest" ]; then echo "module order_service_api source context has no package.json" >&2; exit 1; fi; \
    source_dir=${manifest%/package.json}; \
    mkdir -p /workspace/modules/order_service_api; \
    cp -a "$source_dir/." /workspace/modules/order_service_api/; \
    rm -rf /tmp/module-order_service_api-source /tmp/module-order_service_api-archive
COPY . .
RUN node - <<'NODE'
const fs = require('node:fs');
const path = require('node:path');
const modules = [
  { name: "@gorundebug/tsservicelib", source: '.tsservicelib' },
  { name: "@gorundebug/inventory-service-api", source: "modules/inventory_service_api" },
  { name: "@gorundebug/model", source: "modules/model_ts" },
  { name: "@gorundebug/order-service-api", source: "modules/order_service_api" },
];
const manifests = ['package.json', ...modules.map(({ source }) => path.join(source, 'package.json'))];
for (const manifest of manifests) {
  const pkg = JSON.parse(fs.readFileSync(manifest, 'utf8'));
  for (const field of ['dependencies', 'devDependencies', 'optionalDependencies']) {
    for (const module of modules) {
      if (pkg[field]?.[module.name] !== undefined) {
        pkg[field][module.name] = 'workspace:*';
      }
    }
  }
  fs.writeFileSync(manifest, `${JSON.stringify(pkg, null, 2)}\n`);
}
fs.writeFileSync(
  'pnpm-workspace.yaml',
  'packages:\n  - "."\n  - ".tsservicelib"\n  - "modules/*"\n' +
    'allowBuilds:\n' +
    "  '@confluentinc/kafka-javascript': true\n" +
    "  '@swc/core': true\n" +
    '  esbuild: true\n' +
    '  protobufjs: false\n',
);
NODE
RUN --mount=type=cache,id=servicegen-typescript-pnpm-11.18.0-${TARGETARCH},target=/pnpm/store,sharing=locked \
    corepack pnpm config set store-dir /pnpm/store \
    && corepack pnpm install --no-frozen-lockfile \
    && corepack pnpm --filter @gorundebug/tsservicelib run build \
    && corepack pnpm --recursive --filter './modules/**' run build


ENTRYPOINT ["scripts/run-service.generated.sh", "src/main.generated.ts"]

FROM development AS builder
RUN corepack pnpm build && corepack pnpm prune --prod

FROM ${DEPENDENCY_DOCKER_REGISTRY}/library/node:24.19.0-bookworm-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app
RUN mkdir -p /tmp/node-diagnostics && chown node:node /tmp/node-diagnostics
COPY --from=builder /workspace/package.json ./
COPY --from=builder /workspace/node_modules ./node_modules
COPY --from=builder /workspace/.tsservicelib ./.tsservicelib
COPY --from=builder /workspace/modules ./modules
COPY --from=builder /workspace/dist ./dist
COPY --from=builder /workspace/config ./config
COPY --from=builder /workspace/scripts/node-diagnostics.generated.mjs ./scripts/node-diagnostics.generated.mjs
USER node
ENTRYPOINT ["node", "--enable-source-maps", "--report-on-fatalerror", "--report-on-signal", "--report-signal=SIGUSR1", "--report-directory=/tmp/node-diagnostics", "--diagnostic-dir=/tmp/node-diagnostics", "--import=/app/scripts/node-diagnostics.generated.mjs", "dist/main.generated.js"]
