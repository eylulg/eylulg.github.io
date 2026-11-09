import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
    { ignores: ["dist", "coverage", "playwright-report", "test-results"] },
    {
        files: ["**/*.{ts,tsx}"],
        extends: [js.configs.recommended, ...tseslint.configs.recommended, reactHooks.configs.flat.recommended],
        languageOptions: {
            ecmaVersion: 2023,
            globals: { ...globals.browser },
        },
        rules: {
            "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
            // Untitled UI components extend React Aria prop interfaces this way.
            "@typescript-eslint/no-empty-object-type": ["error", { allowInterfaces: "with-single-extends" }],
        },
    },
    {
        files: ["*.config.{js,ts}", "e2e/**/*.ts"],
        languageOptions: { globals: { ...globals.node } },
    },
);
