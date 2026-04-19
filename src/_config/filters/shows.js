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

  const years = Object.keys(grouped).sort((a, b) => b - a);

  return {byYear: grouped, years};
};

export const showsByStatusAndYear = shows => {
  if (!shows || !Array.isArray(shows)) {
    return {byStatus: {}, statuses: []};
  }

  const statusOrder = ['assistindo', 'reassistindo', 'quero-assistir', 'assistido', 'abandonei'];
  const statusLabels = {
    'assistindo': 'Assistindo',
    'reassistindo': 'Reassistindo',
    'quero-assistir': 'Quero assistir',
    'assistido': 'Assistido',
    'abandonei': 'Abandonei'
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
    grouped[status].years = Object.keys(grouped[status].byYear).sort((a, b) => b - a);
  });

  return {byStatus: grouped, statuses, statusLabels};
};
