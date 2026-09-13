import {describe, it, expect} from 'vitest';
import {excludeFeatured, filterFeatured} from '../../../src/_config/filters/featured.js';

describe('filterFeatured', () => {
  it('return only featured items regardless of content type', () => {
    const items = [{url: '/blog/post/', data: {featured: true}}];
    expect(filterFeatured(items)).toHaveLength(1);
  });

  it('preserve the original order', () => {
    const items = [
      {data: {featured: true}, title: 'A'},
      {data: {featured: true}, title: 'B'}
    ];

    expect(filterFeatured(items).map(count => count.title)).toEqual(['A', 'B']);
  });

  it('return empty array for null', () => {
    expect(filterFeatured(null)).toEqual([]);
  });

  it('return empty array for non-array', () => {
    expect(filterFeatured('string')).toEqual([]);
  });

  it('return empty array when no featured items', () => {
    const items = [{data: {featured: false}}, {data: {}}, {title: 'sem front matter'}];

    expect(filterFeatured(items)).toEqual([]);
  });
});

describe('excludeFeatured', () => {
  it('return only non-featured items', () => {
    const items = [
      {data: {featured: true}, title: 'Destaque'},
      {data: {featured: false}, title: 'Normal'},
      {data: {}, title: 'Sem front matter'}
    ];

    expect(excludeFeatured(items).map(item => item.title)).toEqual(['Normal', 'Sem front matter']);
  });

  it('return empty array for null', () => {
    expect(excludeFeatured(null)).toEqual([]);
  });

  it('return empty array for non-array', () => {
    expect(excludeFeatured('string')).toEqual([]);
  });
});
