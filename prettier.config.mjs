export default {
  semi: true,
  singleQuote: true,
  quoteProps: 'as-needed',
  jsxSingleQuote: false,
  trailingComma: 'es5',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  tabWidth: 2,
  useTabs: false,
  printWidth: 100,

  plugins: [
    'prettier-plugin-astro',
    'prettier-plugin-css-order',
    '@trivago/prettier-plugin-sort-imports',
  ],

  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
        printWidth: 100,
      },
    },
    {
      files: ['*.json', '.prettierrc'],
      options: {
        parser: 'json',
      },
    },
  ],
  iimportOrder: [
    '^astro', // Astro
    '^@astro', // Astro packages
    '^@?\\w', // Externos
    '^@/components', // Components
    '^@/layouts', // Layouts
    '^@/utils', // Utils
    '^@/config', // Config
    '^@/i18n', // i18n
    '^@/types', // Types
    '^@/', // Outros alias
    '^[./]', // Relativos
  ],
  importOrderSeparateGroups: true,
  importOrderGroupNamespaceSpecifiers: true,
  importOrderCombineTypeAndValueImports: true,
};
