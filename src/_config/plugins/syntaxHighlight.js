import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight';

export const syntaxHighlightPlugin = eleventyConfig => {
  eleventyConfig.addPlugin(syntaxHighlight, {
    templateFormats: ['*'], // default

    init: () => {},
  });
};
