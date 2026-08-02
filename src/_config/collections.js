import blogroll from '../_data/blogroll.json' with {type: 'json'};

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
  return collection.getFilteredByGlob('./src/content/watching/movies/**/*.md').reverse();
};

export const getAllShows = collection => {
  return collection.getFilteredByGlob('./src/content/watching/shows/**/*.md').reverse();
};

export const getWatchingYears = collection => {
  const movies = collection.getFilteredByGlob('./src/content/watching/movies/**/*.md');
  const shows = collection.getFilteredByGlob('./src/content/watching/shows/**/*.md');
  const allItems = [...movies, ...shows];
  const yearsSet = new Set();

  allItems.forEach(item => {
    if (item.data?.watchedYear) {
      yearsSet.add(String(item.data.watchedYear));
    }
  });

  return Array.from(yearsSet).sort((a, b) => b - a);
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

export const tagList = collection => {
  const tagsSet = new Set();
  collection.getAll().forEach(item => {
    if (!item.data.tags) return;
    item.data.tags.filter(tag => !['posts', 'docs', 'all'].includes(tag)).forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
};

export const blogrollCategories = () => {
  const categoriesSet = new Set();
  blogroll.forEach(entry => {
    if (entry.category) {
      categoriesSet.add(entry.category);
    }
  });
  return Array.from(categoriesSet).sort();
};
