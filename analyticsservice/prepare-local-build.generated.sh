#!/bin/sh
set -eu

source_dir="${1:?source directory is required}"
work_dir="${2:?work directory is required}"

test -f "$source_dir/package.json"
test -d /workspace/node_modules
test -d /workspace/.tsservicelib

work_parent="$(dirname "$work_dir")"
mkdir -p "$work_parent"
cd "$work_parent"
rm -rf "$work_dir"
mkdir -p "$work_dir"
cp -a "$source_dir/." "$work_dir/"

# Dependency manifests and installations were prepared when the development
# image was built. Keep live source files from the read-only checkout, but use
# that reproducible dependency graph in the writable execution tree.
cp /workspace/package.json "$work_dir/package.json"
cp /workspace/pnpm-workspace.yaml "$work_dir/pnpm-workspace.yaml"
ln -s /workspace/node_modules "$work_dir/node_modules"
ln -s /workspace/.tsservicelib "$work_dir/.tsservicelib"
if [ -d /workspace/modules ]; then
  ln -s /workspace/modules "$work_dir/modules"
fi
mkdir -p /workspace/artifacts
ln -s /workspace/artifacts "$work_dir/.artifacts"
