export const archiveByYear = items => {
  if (!items || !Array.isArray(items)) return [];

  const groups = new Map();

  items.forEach(item => {
    if (!item || !item.date) return;
    const date = item.date instanceof Date ? item.date : new Date(item.date);
    const year = date.getFullYear();
    if (Number.isNaN(year)) return;
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year).push(item);
  });

  return Array.from(groups.entries())
    .sort((a, b) => b[0] - a[0])
    .map(([year, items]) => ({year, items}));
};
