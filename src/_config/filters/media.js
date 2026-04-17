export const moviesByYear = movies => {
  if (!movies || !Array.isArray(movies)) {
    return {byYear: {}, years: []};
  }

  const grouped = movies.reduce((acc, movie) => {
    const year = movie.data?.watchedYear;
    if (!year) return acc;

    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(movie);
    return acc;
  }, {});

  const years = Object.keys(grouped).sort((a, b) => b - a);

  return {byYear: grouped, years};
};

export const showsByYear = movies => {
  if (!movies || !Array.isArray(movies)) {
    return {byYear: {}, years: []};
  }

  const grouped = movies.reduce((acc, movie) => {
    const year = movie.data?.watchedYear;
    if (!year) return acc;

    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(movie);
    return acc;
  }, {});

  const years = Object.keys(grouped).sort((a, b) => b - a);

  return {byYear: grouped, years};
};
