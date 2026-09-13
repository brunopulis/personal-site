import {slugifyString} from '../filters/slugify.js';

export const RESERVED_TAGS = ['posts', 'docs', 'all'];

export const META_TAGS = ['100daystooffload', 'clean-code', 'lang', 'music', 'poesia', 'til'];

export const ALIASES = {
  fronted: {name: 'frontend', slug: 'frontend'}
};

export const normalizeTag = raw => {
  const name = String(raw ?? '').trim();
  const slug = slugifyString(name);
  const alias = ALIASES[slug];
  return alias || {name, slug};
};

export const buildTagGroups = rows => {
  if (!rows || !Array.isArray(rows)) return [];

  const groups = new Map();

  for (const row of rows) {
    const {name, slug} = normalizeTag(row.tag);
    if (!slug) continue;
    if (RESERVED_TAGS.includes(slug)) continue;
    if (META_TAGS.includes(slug)) continue;

    if (!groups.has(slug)) {
      groups.set(slug, {slug, names: new Map(), items: []});
    }
    const group = groups.get(slug);
    group.names.set(name, (group.names.get(name) || 0) + 1);
    group.items.push(row.item);
  }

  return Array.from(groups.values()).map(group => {
    const name = [...group.names.entries()].sort((a, b) => {
      return b[1] - a[1] || a[0].localeCompare(b[0], 'pt-BR');
    })[0][0];

    return {slug: group.slug, name, items: group.items};
  });
};

export const chunk = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};
