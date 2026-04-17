export const booksByYear = (books, status = 'lido') => {
  if (!books || !Array.isArray(books)) {
    return { byYear: {}, years: [] };
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
  
  return { byYear: grouped, years };
};
