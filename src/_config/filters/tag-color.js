import tagColors from '../../_data/tagColors.json' with { type: 'json' };

/**
 * Returns a color for a given tag based on tagColors.json
 * @param {string} tag
 * @returns {string}
 */
export const tagColor = tag => {
  if (!tag) return '#6b7280';
  const normalizedTag = tag.toLowerCase();
  return tagColors[normalizedTag] || '#6b7280';
};
