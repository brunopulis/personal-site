export default {
  lang: 'pt-br',
  layout: 'page',
  tags: 'pages',
  ogImage: true,
  eleventyComputed: {
    translationKey: data => {
      if (data.translationKey) {
        return data.translationKey;
      }
      return data.page.fileSlug;
    }
  }
};