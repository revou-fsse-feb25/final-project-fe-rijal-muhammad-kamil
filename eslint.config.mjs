import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintRules = {
  files: ["src/**/*.{js,jsx,ts,tsx}"],
  ignores: [],
  rules: {},
};

const eslintConfig = [
  eslintRules,
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.extends("plugin:prettier/recommended"),
];

export default eslintConfig;
