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

    plugins: ['prettier-plugin-astro', 'prettier-plugin-css-order'],

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
};
