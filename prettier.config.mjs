/** @type {import("prettier").Config} */
const config = {
  // --- Core Settings ---
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,

  // --- Plugin Setup ---
  plugins: [
    // **Crucial for Astro files and for handling Tailwind in Prettier**
    'prettier-plugin-astro',
  ],

  // --- Overrides ---
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
    {
      // Ensures Markdown files use the correct parser
      files: ['*.md', '*.mdx'],
      options: {
        parser: 'markdown',
      },
    },
  ],
};

export default config;
