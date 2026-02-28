export const filterByMediaType = (collection, type) => {
  if (!collection) {
    return [];
  }

  let items;
  if (typeof collection.toArray === 'function') {
    items = collection.toArray();
  } else if (Array.isArray(collection)) {
    items = collection;
  } else {
    return [];
  }

  return items.filter(item => item.data?.type === type);
};

export const lazyGroupByWatchedYear = collection => {
  if (!collection) {
    return {};
  }

  const items = collection.toArray ? collection.toArray() : collection;
  const grouped = {};

  for (const item of items) {
    const watchedYear = item.data.watchedYear;
    const year = watchedYear ? String(watchedYear) : 'unknown';
    if (!grouped[year]) {
      grouped[year] = [];
    }
    grouped[year].push(item);
  }

  return grouped;
};
