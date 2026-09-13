import {contentType} from './content-type.js';

export const groupByContentType = items => {
  if (!items || !Array.isArray(items)) return [];

  const groups = new Map();
  items.forEach(item => {
    const type = contentType(item);
    if (!groups.has(type)) groups.set(type, []);
    groups.get(type).push(item);
  });

  return Array.from(groups.entries()).map(([type, groupItems]) => ({
    type,
    items: groupItems
  }));
};
