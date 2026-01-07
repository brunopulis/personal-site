/**
 *
 * @param {*} collectionApi
 * @returns
 */
export const posts = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/content/posts/**/*').reverse();
};

/**
 * 
 * @param {*} collectionApi 
 * @returns 
 */
export const notes = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/content/notes/**/*.md');
};

/**
 * 
 * @param {*} collectionApi 
 * @returns 
 */
export const bookmarks = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/content/bookmarks/**/*.md').reverse();
};

/**
 * 
 * @param {*} collectionApi 
 * @returns 
 */
export const gallery = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/content/gallery/**/*.md').reverse();
};

/**
 * 
 * @param {*} collectionApi 
 * @returns 
 */
export const medias = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/content/medias/**/*.md').reverse();
}

/**
 * 
 * @param {*} collectionApi 
 * @returns 
 */
export const books = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/content/books/**/*.md').reverse();
}

/**
 * 
 * @param {*} collectionApi 
 * @returns 
 */
export const newsletters = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/content/newsletter/**/*.md').reverse();
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
export const games = collectionApi => {
  return collectionApi
    .getFilteredByGlob('./src/content/games/**/*.md')
    .reverse();
};

/**
 *
 * @param {*} collectionApi
 * @returns
 */
export const music = collectionApi => {
  return collectionApi
    .getFilteredByGlob('./src/content/music/**/*.md')
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

export const tagListRecurrency = collection => {
  const tagCount = {}; // Objeto para contar as tags
  const excludedTags = ['all', 'posts', 'streams', 'bookmarks', 'books', 'gallery', 'games', 'newsletters', 'notes', 'medias', 'music'];

  // Contar quantas vezes cada tag aparece
  collection.getAll().forEach(item => {
    if ('tags' in item.data) {
      let tags = item.data.tags;

      for (const tag of tags) {
        if (!excludedTags.includes(tag)) {
          tagCount[tag] = (tagCount[tag] || 0) + 1;
        }
      }
    }
  });

  // Converter para array de objetos e ordenar por quantidade (decrescente)
  return Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1]) // Ordena do maior para o menor
    .map(([tag, count]) => ({ tag, count }));
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
        if (!['all', 'posts', 'streams', 'bookmarks', 'books', 'gallery', 'games', 'newsletters', 'notes', 'medias', 'music'].includes(tag)) {
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
  newsletters,
  bookmarks,
  books,
  notes,
  medias,
  music,
  games,
  tagList,
  gallery
};
