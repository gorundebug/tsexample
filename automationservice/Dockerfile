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
COPY prepare-local-build.generated.sh /usr/local/bin/prepare-local-build
SHELL ["/usr/local/bin/servicegen-download-env", "/bin/sh", "-c"]
RUN corepack enable \
    && corepack prepare pnpm@11.18.0 --activate \
    && corepack pnpm config set registry "${NPM_CONFIG_REGISTRY}"
WORKDIR /workspace
COPY package*.json ./
COPY --from=tsservicelib-source . /workspace/.tsservicelib
COPY . .
RUN node - <<'NODE'
const fs = require('node:fs');
const path = require('node:path');
const modules = [
  { name: "@gorundebug/tsservicelib", source: '.tsservicelib' },
];
const manifests = ['package.json', ...modules.map(({ source }) => path.join(source, 'package.json'))];
for (const manifest of manifests) {
  const pkg = JSON.parse(fs.readFileSync(manifest, 'utf8'));
  for (const field of ['dependencies', 'devDependencies', 'optionalDependencies']) {
    for (const module of modules) {
      if (pkg[field]?.[module.name] !== undefined) {
        const target = path.relative(path.dirname(manifest), module.source);
        pkg[field][module.name] = `file:${target || '.'}`;
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
    && corepack pnpm --filter @gorundebug/tsservicelib run build

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
COPY --from=builder /workspace/dist ./dist
COPY --from=builder /workspace/config ./config
COPY --from=builder /workspace/scripts/node-diagnostics.generated.mjs ./scripts/node-diagnostics.generated.mjs
USER node
ENTRYPOINT ["node", "--enable-source-maps", "--report-on-fatalerror", "--report-on-signal", "--report-signal=SIGUSR1", "--report-directory=/tmp/node-diagnostics", "--diagnostic-dir=/tmp/node-diagnostics", "--import=/app/scripts/node-diagnostics.generated.mjs", "dist/main.generated.js"]
