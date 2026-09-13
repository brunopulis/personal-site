import {describe, it, expect} from 'vitest';
import {
  normalizeTag,
  buildTagGroups,
  chunk,
  META_TAGS,
  ALIASES
} from '../../../src/_config/taxonomy/tags-core.js';

describe('normalizeTag', () => {
  it('slugify lowercase the tag', () => {
    expect(normalizeTag('  Minimalismo Digital  ')).toEqual({
      name: 'Minimalismo Digital',
      slug: 'minimalismo-digital'
    });
  });

  it('redirect aliased typos to the canonical tag', () => {
    expect(normalizeTag('fronted')).toEqual({name: 'frontend', slug: 'frontend'});
  });
});

describe('buildTagGroups', () => {
  it('merge case variants into one slug with the most frequent display name', () => {
    const rows = [
      {tag: 'cristianismo', item: 'a'},
      {tag: 'cristianismo', item: 'b'},
      {tag: 'Cristianismo', item: 'c'},
      {tag: 'CRISTIANISMO', item: 'd'}
    ];

    const groups = buildTagGroups(rows);

    expect(groups).toHaveLength(1);
    expect(groups[0]).toMatchObject({slug: 'cristianismo', name: 'cristianismo'});
    expect(groups[0].items).toHaveLength(4);
  });

  it('exclude reserved tags (posts, docs, all)', () => {
    const groups = buildTagGroups([
      {tag: 'posts', item: 'a'},
      {tag: 'a11y', item: 'b'}
    ]);

    expect(groups.map(group => group.slug)).toEqual(['a11y']);
  });

  it('exclude meta/format tags from the topic browse', () => {
    const rows = [
      {tag: 'poesia', item: 'a'},
      {tag: '100DaysToOffLoad', item: 'b'},
      {tag: 'til', item: 'c'}
    ];

    const groups = buildTagGroups(rows);
    expect(groups).toEqual([]);
    expect(META_TAGS).toContain('poesia');
  });

  it('returns empty array for null or unknown items', () => {
    expect(buildTagGroups(null)).toEqual([]);
  });
});

describe('ALIASES', () => {
  it('keeps the alias target registered', () => {
    expect(ALIASES).toHaveProperty('fronted');
    expect(ALIASES.fronted).toEqual({name: 'frontend', slug: 'frontend'});
  });
});

describe('chunk', () => {
  it('split arrays into fixed-size chunks', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('returns empty array for empty input', () => {
    expect(chunk([], 2)).toEqual([]);
  });
});
