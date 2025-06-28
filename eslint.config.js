import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import next from "@next/eslint-plugin-next";
import prettier from "eslint-config-prettier";

export default [
    js.configs.recommended,
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        languageOptions: {
            parser: typescriptParser,
            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                console: "readonly",
                process: "readonly",
                Buffer: "readonly",
                __dirname: "readonly",
                __filename: "readonly",
                global: "readonly",
                module: "readonly",
                require: "readonly",
                exports: "readonly",
                window: "readonly",
                document: "readonly",
                navigator: "readonly",
                localStorage: "readonly",
                sessionStorage: "readonly",
                fetch: "readonly",
            },
        },
        plugins: {
            "@typescript-eslint": typescript,
            "@next/next": next,
        },
        rules: {
            ...typescript.configs.recommended.rules,
            ...next.configs.recommended.rules,
            "@typescript-eslint/no-unused-vars": [
                "error",
                { argsIgnorePattern: "^_" },
            ],
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/prefer-const": "error",
            "no-console": "warn",
            "prefer-const": "error",
        },
    },
    {
        files: [
            "**/*.test.{js,jsx,ts,tsx}",
            "**/__tests__/**/*.{js,jsx,ts,tsx}",
        ],
        languageOptions: {
            globals: {
                describe: "readonly",
                it: "readonly",
                test: "readonly",
                expect: "readonly",
                beforeEach: "readonly",
                afterEach: "readonly",
                beforeAll: "readonly",
                afterAll: "readonly",
                vi: "readonly",
                vitest: "readonly",
            },
        },
        rules: {
            "no-console": "off",
        },
    },
    prettier,
];
