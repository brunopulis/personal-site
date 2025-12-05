/**
 * 
 * @param {*} collectionApi 
 * @returns 
 */
export const posts = collectionApi => {
  return collectionApi
    .getFilteredByGlob("./src/content/posts/**/*.md")
    .reverse();
};

/**
 * 
 * @param {*} collectionApi 
 * @returns 
 */
export const streams = collectionApi => {
  return collectionApi
    .getFilteredByGlob("./src/content/streams/**/*.md")
    .sort((a, b) => b.data.date - a.data.date);
};

/**
 * 
 * @param {*} collectionApi 
 * @returns 
 */
export const showInSitemap = collectionApi => {
  return collectionApi.getFilteredByGlob("./src/**/*.{md,njk}");
};


/**
 * 
 * @param {*} collection 
 * @returns 
 */
export const tagList = collection => {
  const tagsSet = new Set();
  collection.getAll().forEach(item => {
    if (!item.data.tags) return;
    item.data.tags.filter(tag => !['posts', 'all'].includes(tag)).forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
};

export default {
  posts,
  streams,
  showInSitemap,
  tagList
};
