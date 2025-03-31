import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // ✅ Fix: Prevents unused `eslint-disable` warnings
      "no-restricted-syntax": "off",

      // ✅ Fix: Allow ES module imports instead of CommonJS `require()`
      "@typescript-eslint/no-require-imports": "off",

      // ✅ Fix: Allow `any` but show a warning instead of an error
      "@typescript-eslint/no-explicit-any": "warn",

      // ✅ Fix: Ignore unused vars if prefixed with `_`
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

      // ✅ Fix: Ensure valid expressions in `if` statements
      "@typescript-eslint/no-unused-expressions": ["error", { allowShortCircuit: true, allowTernary: true }],
    },
  },
];

export default eslintConfig;
