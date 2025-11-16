// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';
import astroParser from 'astro-eslint-parser';
import * as typescriptParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  // Ignora arquivos e diretórios
  {
    ignores: [
      'dist/**',
      '.astro/**',
      'node_modules/**',
      'public/**',
      '*.config.{js,mjs,cjs,ts}',
      'pnpm-lock.yaml',
      '.tina/**',
    ],
  },

  // Configuração base do ESLint
  eslint.configs.recommended,

  // Configuração para arquivos JavaScript/TypeScript
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
    },
  },

  // Configuração do TypeScript
  ...tseslint.configs.recommended,

  // Configuração para arquivos Astro
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
    },
    rules: {
      // Regras específicas para Astro
      'astro/no-conflict-set-directives': 'error',
      'astro/no-unused-define-vars-in-style': 'error',
      // Desabilita regras que causam problemas em Astro
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  // Prettier deve ser o último para desabilitar regras conflitantes
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,astro}'],
    rules: {
      // Desabilita regras de formatação (Prettier cuida disso)
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
    },
  },
];
