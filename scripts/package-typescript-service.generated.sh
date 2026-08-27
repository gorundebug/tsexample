#!/usr/bin/env bash
set -euo pipefail

if (($# != 2)); then
  echo "usage: $0 <service-directory> <output-directory>" >&2
  exit 2
fi

service_dir="${1%/}"
output_dir="${2%/}"

for file in package.json tsconfig.json \
  Dockerfile docker-compose.standalone.generated.yml \
  Makefile make.generated.mk .gitignore README.md; do
  if [[ ! -f "${service_dir}/${file}" ]]; then
    echo "TypeScript service publishing file is missing: ${service_dir}/${file}" >&2
    exit 1
  fi
done
if [[ -e "${output_dir}" && \
      -n "$(find "${output_dir}" -mindepth 1 -maxdepth 1 -print -quit)" ]]; then
  echo "output directory must be empty: ${output_dir}" >&2
  exit 1
fi

mkdir -p "${output_dir}"
cp -R "${service_dir}/." "${output_dir}/"
cp "${service_dir}/docker-compose.standalone.generated.yml" \
  "${output_dir}/docker-compose.yml"
for file in .dockerignore .prettierignore .prettierrc.json eslint.config.js; do
  if [[ -f "${file}" ]]; then
    cp "${file}" "${output_dir}/${file}"
  fi
done
rm -rf "${output_dir}/dist" "${output_dir}/dist-test" \
  "${output_dir}/node_modules" "${output_dir}/.cache"
rm -f "${output_dir}/docker-compose.standalone.generated.yml" \
  "${output_dir}/tsconfig.tsbuildinfo"

echo "Packaged standalone TypeScript service $(basename "${service_dir}") in ${output_dir}"
