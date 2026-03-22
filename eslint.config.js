import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['node_modules/', '_site/', 'public/', '*.min.js', 'coverage/', 'src/assets/css/main.css']
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    rules: {
      'no-unused-vars': [
        'warn',
        {argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_'}
      ],
      'no-var': 'off',
      'prefer-const': 'off',
      'eqeqeq': 'off',
      'curly': 'off',
      'semi': ['error', 'always'],
      'quotes': 'off',
      'indent': 'off',
      'comma-dangle': 'off',
      'no-console': 'off'
    }
  }
);
