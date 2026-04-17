export const getAllPosts = collection => {
  return collection.getFilteredByGlob('./src/content/posts/**/*.md').reverse();
};

export const getAllLikes = collection => {
  return collection.getFilteredByGlob('./src/content/likes/**/*.md').reverse();
};

export const getAllNewsletters = collection => {
  return collection.getFilteredByGlob('./src/content/newsletters/**/*.md').reverse();
};

export const getAllBooks = collection => {
  return collection.getFilteredByGlob('./src/content/books/**/*.md').reverse();
};

export const getAllMovies = collection => {
  return collection.getFilteredByGlob('./src/content/movies/**/*.md').reverse();
};

export const getAllShows = collection => {
  return collection.getFilteredByGlob('./src/content/shows/**/*.md').reverse();
};

export const getAllGames = collection => {
  return collection.getFilteredByGlob('./src/content/games/**/*.md').reverse();
};

export const getAllNotes = collection => {
  return collection.getFilteredByGlob('./src/content/notes/**/*.md').reverse();
};

export const getAllPoetry = collection => {
  return collection.getFilteredByGlob('./src/content/poetry/**/*.md').reverse();
};

export const showInSitemap = collection => {
  return collection.getFilteredByGlob('./src/**/*.{md,njk}');
};

export const getAllTags = collection => {
  const ignore = new Set(['all', 'nav', 'post', 'posts']);
  const seenSlugs = new Set();
  const list = [];

  const toSlug = s =>
    String(s)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  collection.getFilteredByGlob('src/content/posts/**/*.md').forEach(item => {
    const t = item.data && item.data.tags;
    if (Array.isArray(t)) {
      t.forEach(tag => {
        if (!tag || ignore.has(tag)) return;
        const slug = toSlug(tag);
        if (!slug || seenSlugs.has(slug)) return;
        seenSlugs.add(slug);
        list.push(tag);
      });
    }
  });

  return list.sort((a, b) => String(a).localeCompare(String(b)));
};

export const allTags = collection => {
  const tagsSet = new Set();
  collection.getAll().forEach(item => {
    if (!item.data.tags) return;
    item.data.tags.filter(tag => !['posts', 'docs', 'all'].includes(tag)).forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
};

export const getBooksByYear = collection => {
  const books = collection.getFilteredByGlob('./src/content/books/**/*.md').reverse();
  const readBooks = books.filter(book => book.data?.status === 'lido');

  const grouped = readBooks.reduce((acc, book) => {
    const year = book.data?.attendedYear;
    if (!year) return acc;

    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(book);
    return acc;
  }, {});

  const years = Object.keys(grouped).sort((a, b) => b - a);

  return {
    byYear: grouped,
    years: years
  };
};
