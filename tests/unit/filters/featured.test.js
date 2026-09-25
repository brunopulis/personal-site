import {describe, it, expect} from 'vitest';
import {featuredPosts, nonFeaturedPosts} from '../../../src/_config/filters/featured.js';

const post = (title, featured) => ({
  data: {title, featured}
});

describe('featuredPosts', () => {
  it('return only items flagged as featured', () => {
    const result = featuredPosts([
      post('Destaque', true),
      post('Normal', false),
      post('Sem campo', undefined)
    ]);

    expect(result.map(item => item.data.title)).toEqual(['Destaque']);
  });

  it('return empty array for null or non-array input', () => {
    expect(featuredPosts(null)).toEqual([]);
    expect(featuredPosts('nope')).toEqual([]);
  });
});

describe('nonFeaturedPosts', () => {
  it('exclude items flagged as featured', () => {
    const result = nonFeaturedPosts([
      post('Destaque', true),
      post('Normal', false),
      post('Sem campo', undefined)
    ]);

    expect(result.map(item => item.data.title)).toEqual(['Normal', 'Sem campo']);
  });

  it('return empty array for null or non-array input', () => {
    expect(nonFeaturedPosts(null)).toEqual([]);
    expect(nonFeaturedPosts('nope')).toEqual([]);
  });
});
