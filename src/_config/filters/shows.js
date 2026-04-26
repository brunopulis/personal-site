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

export const showsByYearAndStatus = shows => {
  if (!shows || !Array.isArray(shows)) {
    return {byYear: {}, years: [], statusLabels: {}, statusOrder: []};
  }

  const statusOrder = ['Quero assistir', 'assistindo', 'abandonei', 'assistido', 'reassistindo', 'favorito'];
  const statusLabels = {
    'Quero assistir': 'Quero assistir',
    'assistindo': 'Assistindo',
    'abandonei': 'Abandonei',
    'assistido': 'Assistido',
    'reassistindo': 'Reassistindo',
    'favorito': 'Favorito'
  };

  const grouped = shows.reduce((acc, show) => {
    const year = show.data?.watchedYear;
    if (!year) return acc;

    if (!acc[year]) {
      acc[year] = {};
    }

    const status = show.data?.status || 'outros';
    if (!acc[year][status]) {
      acc[year][status] = [];
    }
    acc[year][status].push(show);
    return acc;
  }, {});

  const years = Object.keys(grouped)
    .filter(year => {
      const hasItems = Object.values(grouped[year]).some(arr => arr.length > 0);
      return hasItems;
    })
    .sort((a, b) => b - a);

  return {byYear: grouped, years, statusLabels, statusOrder};
};

export const showsByStatusAndYear = shows => {
  if (!shows || !Array.isArray(shows)) {
    return {byStatus: {}, statuses: [], statusLabels: {}};
  }

  const statusOrder = ['Quero assistir', 'assistindo', 'abandonei', 'assistido', 'reassistindo', 'favorito'];
  const statusLabels = {
    'Quero assistir': 'Quero assistir',
    'assistindo': 'Assistindo',
    'abandonei': 'Abandonei',
    'assistido': 'Assistido',
    'reassistindo': 'Reassistindo',
    'favorito': 'Favorito'
  };

  const grouped = shows.reduce((acc, show) => {
    const status = show.data?.status || 'outros';
    if (!acc[status]) {
      acc[status] = {byYear: {}, years: []};
    }

    const year = show.data?.watchedYear;
    if (year) {
      if (!acc[status].byYear[year]) {
        acc[status].byYear[year] = [];
      }
      acc[status].byYear[year].push(show);
    }
    return acc;
  }, {});

  const statuses = statusOrder.filter(s => grouped[s]);

  statuses.forEach(status => {
    grouped[status].years = Object.keys(grouped[status].byYear)
      .filter(year => grouped[status].byYear[year].length > 0)
      .sort((a, b) => b - a);
  });

  return {byStatus: grouped, statuses, statusLabels};
};
