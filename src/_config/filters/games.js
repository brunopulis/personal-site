export const gamesByYear = games => {
  if (!games || !Array.isArray(games)) {
    return {byYear: {}, years: []};
  }

  const grouped = games.reduce((acc, game) => {
    const releaseDate = game.data?.releaseDate;
    const year = releaseDate ? new Date(releaseDate).getFullYear().toString() : null;
    if (!year) return acc;

    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(game);
    return acc;
  }, {});

  const years = Object.keys(grouped).sort((a, b) => b - a);

  return {byYear: grouped, years};
};
