export default {
  lang: 'pt-br',
  layout: 'post',
  tags: 'posts',
  permalink: '/blog/{{ title | slugify }}/index.html',
  eleventyComputed: {
    translationKey: data => {
      if (data.translationKey) {
        return data.translationKey;
      }
      return data.page.fileSlug;
    }
  }
};