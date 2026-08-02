export const groupByYear = items => {
  if (!items || !Array.isArray(items)) {
    return {byYear: {}, years: []};
  }

  const grouped = items.reduce((acc, item) => {
    const year = item.data?.watchedYear;
    if (!year) return acc;
    if (!acc[year]) acc[year] = [];
    acc[year].push(item);
    return acc;
  }, {});

  const years = Object.keys(grouped).sort((a, b) => b - a);
  return {byYear: grouped, years};
};

export const filterByYear = (items, year) => {
  if (!items || !Array.isArray(items)) return [];
  return items.filter(i => String(i.data?.watchedYear) === String(year));
};

export const filterFavorites = items => {
  if (!items || !Array.isArray(items)) return [];
  return items.filter(i => i.data?.favorite === true);
};
