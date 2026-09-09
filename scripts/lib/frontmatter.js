import {quote} from './util.js';

/**
 * @param {import('./types.js').ContentSchema} schema
 * @param {Record<string, any>} data
 * @returns {string}
 */
export function buildFrontmatter(schema, data) {
  const lines = ['---'];

  for (const field of schema.fields) {
    const value = data[field.key];

    if (field.optional && !value) continue;

    const rendered = field.format ? field.format(value) : field.quote ? quote(value) : value;

    lines.push(`${field.key}: ${rendered}`);
  }

  lines.push('---', '');
  return lines.join('\n');
}
