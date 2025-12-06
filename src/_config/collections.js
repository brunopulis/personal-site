/**
 *
 * @param {*} collectionApi
 * @returns
 */
export const posts = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/content/posts/**/*.md').reverse();
};

export const notes = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/content/notas/**/*.md').reverse();
};

export const bookmarks = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/content/bookmarks/**/*.md').reverse();
};

export const gallery = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/content/gallery/**/*.md').reverse();
};

/**
 *
 * @param {*} collectionApi
 * @returns
 */
export const streams = collectionApi => {
  return collectionApi
    .getFilteredByGlob('./src/content/streams/**/*.md')
    .sort((a, b) => b.data.date - a.data.date);
};

/**
 *
 * @param {*} collectionApi
 * @returns
 */
export const showInSitemap = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/**/*.{md,njk}');
};

/**
 *
 * @param {*} collection
 * @returns
 */
export const tagList = collection => {
  let tagSet = new Set(); // ✅ Definido ANTES do forEach

  collection.getAll().forEach(item => {
    if ('tags' in item.data) {
      let tags = item.data.tags;

      for (const tag of tags) {
        if (!['all', 'posts', 'streams', 'livros', 'notas', 'filmes', 'musicas'].includes(tag)) {
          tagSet.add(tag);
        }
      }
    }
  });

  return Array.from(tagSet).sort();
};

export default {
  posts,
  streams,
  showInSitemap,
  bookmarks,
  notes,
  tagList
};
