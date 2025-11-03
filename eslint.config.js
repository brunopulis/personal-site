// eslint.config.js
import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginPrettier from "eslint-plugin-prettier";

export default [
	js.configs.recommended,
	...eslintPluginAstro.configs.recommended,
	prettier,
	{
		files: ["**/*.astro"],
		// processador específico para arquivos .astro
		processor: eslintPluginAstro.processors[".astro"],
	},
	{
		plugins: {
			prettier: eslintPluginPrettier,
		},
		rules: {
			"prettier/prettier": "error",
		},
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			globals: {
				window: "readonly",
				document: "readonly",
				navigator: "readonly",
				process: "readonly",
				console: "readonly",
				module: "readonly",
				require: "readonly",
			},
		},
	},
];
