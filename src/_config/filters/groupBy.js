export const groupBy = (items, key) => {
  if (!items || !Array.isArray(items)) {
    return {};
  }
  return items.reduce((acc, item) => {
    const groupKey = key.includes('.') ? key.split('.').reduce((obj, k) => obj?.[k], item) : item[key];
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(item);
    return acc;
  }, {});
};

export const groupByYear = items => {
  if (!items || !Array.isArray(items)) {
    return {};
  }
  return items.reduce((acc, item) => {
    const year = new Date(item.date).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(item);
    return acc;
  }, {});
};

export const groupByMonth = items => {
  if (!items || !Array.isArray(items)) {
    return {};
  }
  return items.reduce((acc, item) => {
    const date = new Date(item.date);
    const month = date.toLocaleString('default', {month: 'long'});
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(item);
    return acc;
  }, {});
};
