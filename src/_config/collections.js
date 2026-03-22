import {slugifyString} from './filters/slugify.js';

/** All blog posts as a collection. */
export const posts = collectionApi => {
  const allPosts = collectionApi.getFilteredByGlob('./src/content/posts/**/*');
  return allPosts.sort((a, b) => {
    const dateA = a.data.pubDate || a.data.date;
    const dateB = b.data.pubDate || b.data.date;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });
};

/** All notes posts as a collection. */
export const notes = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/content/notes/**/*').reverse();
};

/** All poems as a collection. */
export const poems = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/content/poems/**/*').reverse();
};

export const bookmarks = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/content/bookmarks/**/*').reverse();
};

export const likes = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/content/likes/**/*').reverse();
};

export const photos = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/content/photos/**/*').reverse();
};

export const medias = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/content/medias/**/*').reverse();
};

export const books = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/content/books/**/*').reverse();
};

export const newsletters = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/content/newsletter/**/*').reverse();
};

export const games = collectionApi => {
  return collectionApi.getFilteredByGlob('./src/content/games/**/*').reverse();
};

export const music = collectionApi => {
  return collectionApi
    .getFilteredByGlob('./src/content/music/**/*')
    .sort((a, b) => b.data.date - a.data.date);
};

/** All relevant pages as a collection for sitemap.xml */
export const showInSitemap = collection => {
  return collection.getFilteredByGlob('./src/**/*.{md,njk}');
};

/** All tags from all posts as a collection - excluding custom collections */
export const tagList = collection => {
  const tagsSet = new Set();

  collection.getAll().forEach(item => {
    if (!item.data.tags) return;
    item.data.tags.filter(tag => !['posts', 'docs', 'all'].includes(tag)).forEach(tag => tagsSet.add(tag));
  });

  return Array.from(tagsSet).sort();
};
