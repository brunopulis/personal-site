export const filterByYear = (collection, year) => {
  if (!collection) {
    return [];
  }
  const items = collection.toArray ? collection.toArray() : collection;
  return items.filter(post => {
    const postDate = post.data.pubDate || post.data.date;
    const postYear = postDate ? new Date(postDate).getFullYear() : null;
    return postYear === year;
  });
};
