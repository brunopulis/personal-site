export const featuredPosts = items => {
  if (!items || !Array.isArray(items)) return [];
  return items.filter(item => item?.data?.featured === true);
};

export const nonFeaturedPosts = items => {
  if (!items || !Array.isArray(items)) return [];
  return items.filter(item => item?.data?.featured !== true);
};
