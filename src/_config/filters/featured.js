export const filterFeatured = items => {
  if (!items || !Array.isArray(items)) return [];
  return items.filter(counter => counter.data?.featured === true);
};
