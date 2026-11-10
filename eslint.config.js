import js from "@eslint/js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
    { ignores: ["dist", "ui-src", "coverage", "playwright-report", "test-results"] },
    {
        files: ["**/*.{ts,tsx}"],
        extends: [js.configs.recommended, ...tseslint.configs.recommended, reactHooks.configs.flat.recommended, jsxA11y.flatConfigs.recommended],
        languageOptions: {
            ecmaVersion: 2023,
            globals: { ...globals.browser },
        },
        rules: {
            // vitest-axe's matcher typings extend an interface this way.
            "@typescript-eslint/no-empty-object-type": ["error", { allowInterfaces: "with-single-extends" }],
            "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
        },
    },
    {
        files: ["*.config.{js,ts}", "e2e/**/*.ts"],
        languageOptions: { globals: { ...globals.node } },
    },
);
