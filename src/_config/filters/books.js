export const currentlyReading = books => {
  if (!books || !Array.isArray(books)) {
    return [];
  }

  return books.filter(book => book.data?.status === 'lendo');
};

export const booksByYear = (books, status = 'lido') => {
  if (!books || !Array.isArray(books)) {
    return {byYear: {}, years: []};
  }

  const readBooks = books.filter(book => book.data?.status === status);

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

  return {byYear: grouped, years};
};

export const bookCategories = books => {
  if (!books || !Array.isArray(books)) {
    return [];
  }

  const counts = books.reduce((acc, book) => {
    const category = (book.data?.category || '').trim();
    if (!category) return acc;

    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .map(([name, count]) => ({name, count}))
    .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
};
