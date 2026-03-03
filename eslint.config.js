import globals from 'globals';

export default [
  {
    ignores: [
      'node_modules/',
      '_site/',
      'dist/',
      'public/',
      '*.min.js',
      'bootstrap/',
      'font-awesome/',
      '.tina/',
      'tina/__generated__/',
      'coverage/',
      'src/assets/css/main.css',
      'admin/',
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      'no-var': 'off',
      'prefer-const': 'off',
      eqeqeq: 'off',
      curly: 'off',
      semi: ['error', 'always'],
      quotes: 'off',
      indent: 'off',
      'comma-dangle': 'off',
      'no-console': 'off',
    },
  },
];
