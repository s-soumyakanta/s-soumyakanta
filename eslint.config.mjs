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
      // ✅ Prevents unused `eslint-disable` warnings
      "no-restricted-syntax": "off",

      // ✅ Allow ES module imports instead of CommonJS `require()`
      "@typescript-eslint/no-require-imports": "off",

      // ✅ Allow `any` but show a warning instead of an error
      "@typescript-eslint/no-explicit-any": "warn",

      // ✅ Ignore unused vars if prefixed with `_`
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],

      // ✅ Ensure valid expressions in `if` statements
      "@typescript-eslint/no-unused-expressions": "off",

      // ✅ Require explicit return types for functions
      "@typescript-eslint/explicit-function-return-type": "warn",

      // ✅ Enforce consistent import sorting
      "import/order": [
        "warn",
        {
          "groups": ["builtin", "external", "internal"],
          "alphabetize": { "order": "asc", "caseInsensitive": true }
        }
      ],

      // ✅ Enforce using `const` or `let` instead of `var`
      "no-var": "error",

      // ✅ Disallow `ts-ignore` unless it has a comment explaining why
      "@typescript-eslint/ban-ts-comment": ["error", { "ts-ignore": "allow-with-description" }],
    },
  },
];

export default eslintConfig;
