export const lazyPaginate = (collection, page = 1, perPage = 10) => {
  if (!collection || typeof collection.toArray !== 'function') {
    return [];
  }

  const items = collection.toArray ? collection.toArray() : collection;
  const start = (page - 1) * perPage;
  const end = start + perPage;

  return items.slice(start, end);
};

export const lazyGroupByYear = collection => {
  if (!collection || typeof collection.toArray !== 'function') {
    return {};
  }

  const items = collection.toArray ? collection.toArray() : collection;
  const grouped = {};

  for (const item of items) {
    const year = item.date ? new Date(item.date).getFullYear() : 'unknown';
    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(item);
  }

  return grouped;
};
