export const sortByDate = (items, order = 'desc') => {
  if (!items || !Array.isArray(items)) {
    console.warn('⚠️ sortByDate: esperava um array, recebeu:', typeof items);
    return items;
  }

  const sorted = [...items].sort((a, b) => {
    const dateA = a.data?.watchedDate;
    const dateB = b.data?.watchedDate;

    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;

    if (order === 'asc') {
      return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
    }
    return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
  });

  return sorted;
};
