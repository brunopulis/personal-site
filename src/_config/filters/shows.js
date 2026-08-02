export const showsByYear = shows => {
  if (!shows || !Array.isArray(shows)) {
    return {byYear: {}, years: []};
  }

  const grouped = shows.reduce((acc, show) => {
    const year = show.data?.watchedYear;
    if (!year) return acc;

    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(show);
    return acc;
  }, {});

  const years = Object.keys(grouped)
    .filter(year => grouped[year].length > 0)
    .sort((a, b) => b - a);

  return {byYear: grouped, years};
};
