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
}

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
    if ("tags" in item.data) {
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
  tagList
};
