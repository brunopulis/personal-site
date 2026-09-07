import {slugifyString} from './slugify.js';

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

export const mediaCategories = items => {
  if (!items || !Array.isArray(items)) {
    return [];
  }

  const counts = items.reduce((acc, item) => {
    const raw = item.data?.category;
    if (!raw) return acc;

    const parts = Array.isArray(raw) ? raw : String(raw).split(',');
    parts.forEach(part => {
      const category = String(part).trim();
      if (!category) return;
      acc[category] = (acc[category] || 0) + 1;
    });

    return acc;
  }, {});

  return Object.entries(counts)
    .map(([name, count]) => ({name, count}))
    .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
};

export const categoriesSlugs = str => {
  if (!str) return '';

  const parts = Array.isArray(str) ? str : String(str).split(',');
  return parts
    .map(part => slugifyString(String(part).trim()))
    .filter(Boolean)
    .join(' ');
};
