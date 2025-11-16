// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import astroParser from 'astro-eslint-parser';
import * as typescriptParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
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
      'astro/no-deprecated-astro-canonicalurl': 'warn',
      'astro/no-deprecated-astro-fetchcontent': 'warn',
      'astro/no-deprecated-astro-resolve': 'warn',
      'astro/no-unused-css-selector': 'warn',
      // Desabilita regras que causam problemas em Astro
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  {
    files: ['**/*.{js,jsx,ts,tsx,astro}'],
    plugins: {
      'jsx-a11y': jsxA11y,
    },
    rules: {
      // Regras de acessibilidade
      'jsx-a11y/alt-text': 'warn',
      'jsx-a11y/anchor-is-valid': 'warn',
      'jsx-a11y/anchor-has-content': 'warn',
      'jsx-a11y/aria-props': 'warn',
      'jsx-a11y/aria-proptypes': 'warn',
      'jsx-a11y/aria-unsupported-elements': 'warn',
      'jsx-a11y/heading-has-content': 'warn',
      'jsx-a11y/html-has-lang': 'warn',
      'jsx-a11y/img-redundant-alt': 'warn',
      'jsx-a11y/no-redundant-roles': 'warn',
    },
  },

  // Desabilita regras de formatação (Prettier cuida disso)
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx,astro}'],
    rules: {
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
      indent: 'off',
      'linebreak-style': 'off',
      quotes: 'off',
      semi: 'off',
      'comma-dangle': 'off',
      'object-curly-spacing': 'off',
      'array-bracket-spacing': 'off',
      'space-before-function-paren': 'off',
      '@typescript-eslint/indent': 'off',
      '@typescript-eslint/quotes': 'off',
      '@typescript-eslint/semi': 'off',
      '@typescript-eslint/comma-dangle': 'off',
      '@typescript-eslint/space-before-function-paren': 'off',
    },
  },
];
