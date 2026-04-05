/** All blog posts as a collection. */
export const getAllPosts = collection => {
  return collection.getFilteredByGlob('./src/content/posts/**/*.md').reverse();
};

export const getAllBooks = collection => {
  return collection.getFilteredByGlob('./src/content/books/**/*.md').reverse();
};

export const getAllNotes = collection => {
  return collection.getFilteredByGlob('./src/content/notes/**/*.md').reverse();
};

export const getAllPoetry = collection => {
  return collection.getFilteredByGlob('./src/content/poetry/**/*.md').reverse();
};

/** All relevant pages as a collection for sitemap.xml */
export const showInSitemap = collection => {
  return collection.getFilteredByGlob('./src/**/*.{md,njk}');
};

export const allTags = collection => {
  const tagsSet = new Set();
  collection.getAll().forEach(item => {
    if (!item.data.tags) return;
    item.data.tags.filter(tag => !['posts', 'docs', 'all'].includes(tag)).forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
};
