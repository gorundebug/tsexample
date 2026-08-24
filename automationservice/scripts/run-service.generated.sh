#!/usr/bin/env sh
set -eu

diagnostic_dir="${NODE_DIAGNOSTIC_DIR:-/tmp/node-diagnostics}"
script_dir="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
mkdir -p "${diagnostic_dir}"
ulimit -c unlimited 2>/dev/null || true

if [ "${DEBUG:-0}" = "1" ]; then
  echo "[entrypoint] debug mode — Node inspector listening on 0.0.0.0:${NODE_INSPECT_PORT:-2345}"
  exec node \
    "--inspect=0.0.0.0:${NODE_INSPECT_PORT:-2345}" \
    --enable-source-maps \
    --report-on-fatalerror \
    --report-on-signal \
    --report-signal=SIGUSR1 \
    "--report-directory=${diagnostic_dir}" \
    "--diagnostic-dir=${diagnostic_dir}" \
    --import "${script_dir}/node-diagnostics.generated.mjs" \
    --import tsx \
    "$@"
fi

exec node \
  --enable-source-maps \
  --report-on-fatalerror \
  --report-on-signal \
  --report-signal=SIGUSR1 \
  "--report-directory=${diagnostic_dir}" \
  "--diagnostic-dir=${diagnostic_dir}" \
  --import "${script_dir}/node-diagnostics.generated.mjs" \
  --import tsx \
  "$@"
