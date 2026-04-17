export const groupBooksByYear = books => {
  if (!books || !Array.isArray(books)) {
    return {};
  }
  
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
  
  return grouped;
};
