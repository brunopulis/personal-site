export const getPostsByTag = (posts, tag) => {
  if (!posts || !tag) return [];
  return posts.filter(post => {
    const postTags = post.data.tags || [];
    return postTags.includes(tag);
  });
};
