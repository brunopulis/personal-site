export function getStats(collectionApi) {
  const posts = collectionApi.getFilteredByGlob('./src/content/posts/**/*.md');
  const newsletters = collectionApi.getFilteredByGlob('./src/content/newsletters/**/*.md');
  const books = collectionApi.getFilteredByGlob('./src/content/books/**/*.md');
  const notes = collectionApi.getFilteredByGlob('./src/content/notes/**/*.md');

  const allContent = [...posts, ...newsletters];

  const totalPosts = posts.length;
  const totalNewsletters = newsletters.length;
  const totalContent = allContent.length;

  const averageWordsPerPost = 0;

  const allTags = new Set();
  posts.forEach(post => {
    if (post.data && post.data.tags) {
      post.data.tags.forEach(tag => {
        if (!['all', 'nav', 'post', 'posts'].includes(tag)) {
          allTags.add(tag);
        }
      });
    }
  });

  const postsByYear = {};
  posts.forEach(post => {
    const year = post.date ? new Date(post.date).getFullYear() : 'Unknown';
    if (!postsByYear[year]) {
      postsByYear[year] = 0;
    }
    postsByYear[year]++;
  });

  const yearsSorted = Object.keys(postsByYear).sort((a, b) => b - a);

  const readBooks = books.filter(book => book.data?.status === 'lido');
  const totalBooks = readBooks.length;

  return {
    totalPosts,
    totalNewsletters,
    totalContent,
    totalWords: 0,
    averageWordsPerPost,
    totalTags: allTags.size,
    allTags: Array.from(allTags).sort(),
    postsByYear,
    yearsSorted,
    totalBooks,
    totalNotes: notes.length
  };
}
