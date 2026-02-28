import { slugifyString } from './filters/slugify.js';

/**
 * Posts Collection
 *
 * @param {*} collectionApi
 * @returns
 */
export const posts = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/content/posts/**/*').reverse();
};

/**
 * Get unique years from posts - works as Eleventy collection
 * Uses getFilteredByGlob for lazy loading
 */
export const postYears = collectionApi => {
  const allPosts = collectionApi.getFilteredByGlob('./src/content/posts/**/*');
  if (!allPosts) {
    return [];
  }

  const years = [
    ...new Set(
      allPosts
        .map(post => {
          // Use only data.pubDate from frontmatter, not post.date (which is file modified date)
          const postDate = post.data.pubDate || post.data.date;
          return postDate ? new Date(postDate).getFullYear() : null;
        })
        .filter(Boolean)
    ),
  ];
  return years.sort((a, b) => a - b);
};

/**
 * Get unique years (alias for postYears)
 */
export const getPostYears = postYears;

/**
 * Posts by Year Collections
 * Generates: posts2026, posts2025, posts2024, etc.
 */
export const getPostsByYear = collectionApi => year => {
  const allPosts = collectionApi.getFilteredByGlob('./src/content/posts/**/*');
  if (!allPosts) {
    return [];
  }
  return allPosts
    .filter(post => {
      const postDate = post.data.pubDate || post.data.date;
      const postYear = postDate ? new Date(postDate).getFullYear() : null;
      return postYear === year;
    })
    .sort((a, b) => {
      const dateA = a.data.pubDate || a.data.date;
      const dateB = b.data.pubDate || b.data.date;
      return new Date(dateB) - new Date(dateA);
    });
};

/**
 * Notes Collection
 *
 * @param {*} collectionApi
 * @returns
 */
export const notes = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/content/notes/**/*').reverse();
};

/**
 * Poems Collection
 *
 * @param {*} collectionApi
 * @returns
 */
export const poems = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/content/poems/**/*').reverse();
};

/**
 * Bookmarks Collection

 * @param {*} collectionApi
 * @returns
 */
export const bookmarks = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/content/bookmarks/**/*').reverse();
};

/**
 * Likes Collection

 * @param {*} collectionApi
 * @returns
 */
export const likes = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/content/likes/**/*').reverse();
};

/**
 * Photos Collection
 *
 * @param {*} collectionApi
 * @returns
 */
export const photos = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/content/photos/**/*').reverse();
};

/**
 * Medias Collection
 *
 * @param {*} collectionApi
 * @returns
 */
export const medias = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/content/medias/**/*').reverse();
};

/**
 * Books Collection
 *
 * @param {*} collectionApi
 * @returns
 */
export const books = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/content/books/**/*').reverse();
};

/**
 * Newsletters Collection
 *
 * @param {*} collectionApi
 * @returns
 */
export const newsletters = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/content/newsletter/**/*').reverse();
};

/**
 * Games Collection
 *
 * @param {*} collectionApi
 * @returns
 */
export const games = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/content/games/**/*').reverse();
};

/**
 * Music Collection
 *
 * @param {*} collectionApi
 * @returns
 */
export const music = collectionApi => {
  return collectionApi
    .getFilteredByGlob('./src/content/music/**/*')
    .sort((a, b) => b.data.date - a.data.date);
};

/**
 * Show in Sitemap Collection
 *
 * @param {*} collectionApi
 * @returns
 */
export const showInSitemap = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/**/*.{md,njk}');
};

export const tagListRecurrency = collection => {
  const tagCount = {};
  const excludedTags = [
    'all',
    'posts',
    'poems',
    'photos',
    'bookmarks',
    'books',
    'games',
    'newsletters',
    'notes',
    'medias',
    'music',
  ];

  // Contar quantas vezes cada tag aparece (agrupado por slug)
  const slugToTag = {};

  collection.getAll().forEach(item => {
    if ('tags' in item.data) {
      const tags = item.data.tags;

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
  const tagSet = new Set();
  const slugSet = new Set();

  collection.getAll().forEach(item => {
    if ('tags' in item.data) {
      const tags = item.data.tags;

      for (const tag of tags) {
        if (
          ![
            'all',
            'posts',
            'poems',
            'photos',
            'bookmarks',
            'books',
            'gallery',
            'games',
            'newsletters',
            'notes',
            'medias',
            'music',
          ].includes(tag)
        ) {
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
  showInSitemap,
  newsletters,
  books,
  bookmarks,
  games,
  getPostsByYear,
  getPostYears,
  likes,
  medias,
  music,
  notes,
  photos,
  poems,
  posts,
  postYears,
  tagList,
};
