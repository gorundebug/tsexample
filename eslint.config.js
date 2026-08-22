import eslint from "@eslint/js";
import { existsSync } from "node:fs";
import { URL } from "node:url";
import tseslint from "typescript-eslint";

const typeScriptProjects = existsSync(new URL("./tsconfig.test.json", import.meta.url))
  ? ["./tsconfig.json", "./tsconfig.test.json"]
  : ["./*/tsconfig.json", "./*/tsconfig.test.json"];

export default tseslint.config(
  {
    ignores: [
      "**/dist/**",
      "**/dist-test/**",
      "**/node_modules/**",
      "**/.tsservicelib/**",
      "**/.cache/**",
      "tools/**",
      "**/src/generated/grpc/proto/**",
      "**/src/generated/http/index.generated.ts"
    ]
  },
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked.map((config) => ({ ...config, files: ["**/*.ts"] })),
  ...tseslint.configs.stylisticTypeChecked.map((config) => ({ ...config, files: ["**/*.ts"] })),
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: typeScriptProjects,
        tsconfigRootDir: import.meta.dirname
      }
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" }
      ],
      "@typescript-eslint/no-empty-function": ["error", { allow: ["methods"] }],
      "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }]
    }
  },
  {
    files: ["**/*.generated.ts"],
    rules: {
      "@typescript-eslint/consistent-type-imports": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-vars": "off"
    }
  }
);
