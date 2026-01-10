import { slugifyString } from './filters/slugify.js';

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
  const tagCount = {};
  const excludedTags = ['all', 'posts', 'streams', 'bookmarks', 'books', 'gallery', 'games', 'newsletters', 'notes', 'medias', 'music'];

  // Contar quantas vezes cada tag aparece (agrupado por slug)
  const slugToTag = {};

  collection.getAll().forEach(item => {
    if ('tags' in item.data) {
      let tags = item.data.tags;

      for (const tag of tags) {
        if (!excludedTags.includes(tag)) {
          const slug = slugifyString(tag);
          tagCount[slug] = (tagCount[slug] || 0) + 1;
          // Store the most common/first version of the tag name for display
          if (!slugToTag[slug]) {
             slugToTag[slug] = tag;
          }
        }
      }
    }
  });

  // Converter para array de objetos e ordenar por quantidade (decrescente)
  return Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1]) // Ordena do maior para o menor
    .map(([slug, count]) => ({ tag: slugToTag[slug], count, slug }));
};

/**
 *
 * @param {*} collection
 * @returns
 */
export const tagList = collection => {
  let tagSet = new Set();
  let slugSet = new Set();

  collection.getAll().forEach(item => {
    if ('tags' in item.data) {
      let tags = item.data.tags;

      for (const tag of tags) {
        if (!['all', 'posts', 'streams', 'bookmarks', 'books', 'gallery', 'games', 'newsletters', 'notes', 'medias', 'music'].includes(tag)) {
          const slug = slugifyString(tag);
          if (!slugSet.has(slug)) {
            slugSet.add(slug);
            tagSet.add(tag);
          }
        }
      }
    }
  });

  return Array.from(tagSet).sort((a, b) => a.localeCompare(b));
};

export default {
  posts,
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
