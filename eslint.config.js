// eslint.config.js
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import astroParser from "astro-eslint-parser";
import astroPlugin from "eslint-plugin-astro";
import prettier from "eslint-config-prettier";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default [
  js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  prettier,
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        browser: true,
        node: true,
        es2022: true,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: [".astro"],
        sourceType: "module",
      },
      globals: {
        browser: true,
        node: true,
        es2022: true,
      },
    },
    plugins: {
      astro: astroPlugin,
    },
    rules: {
      ...astroPlugin.configs.recommended.rules,
      "prettier/prettier": "off",
    },
  },
  {
    ignores: ["dist/", "node_modules/", ".astro/", "build/", "*.config.js", "*.config.mjs"],
  },
];
