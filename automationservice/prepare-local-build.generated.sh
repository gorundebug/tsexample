#!/bin/sh
set -eu

source_dir="${1:?source directory is required}"
work_dir="${2:?work directory is required}"

test -f "$source_dir/package.json"
test -d /workspace/node_modules
test -d /workspace/.tsservicelib

mkdir -p "$work_dir"
find "$work_dir" -mindepth 1 -maxdepth 1 -exec rm -rf -- {} +
cp -a "$source_dir/." "$work_dir/"

# Dependency manifests and installations were prepared when the development
# image was built. Keep live source files from the read-only checkout, but use
# that reproducible dependency graph in the writable execution tree.
cp /workspace/package.json "$work_dir/package.json"
cp /workspace/pnpm-workspace.yaml "$work_dir/pnpm-workspace.yaml"
ln -s /workspace/node_modules "$work_dir/node_modules"
ln -s /workspace/.tsservicelib "$work_dir/.tsservicelib"
ln -s /workspace/modules "$work_dir/modules"
mkdir -p /workspace/artifacts
ln -s /workspace/artifacts "$work_dir/.artifacts"
