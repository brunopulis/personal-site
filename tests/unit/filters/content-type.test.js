import {describe, it, expect} from 'vitest';
import {contentType} from '../../../src/_config/filters/content-type.js';

describe('contentType', () => {
  it('map known URL prefixes to content types', () => {
    expect(contentType({url: '/blog/post-title/'})).toBe('Artigo');
    expect(contentType({url: '/notes/2026-01-01/'})).toBe('Nota');
    expect(contentType({url: '/book/some-title/'})).toBe('Livro');
    expect(contentType({url: '/poetry/poem/'})).toBe('Poema');
    expect(contentType({url: '/likes/2024-01-01/'})).toBe('Like');
    expect(contentType({url: '/watching/movies/2024-title/'})).toBe('Filme');
    expect(contentType({url: '/watching/shows/2024-title/'})).toBe('Série');
    expect(contentType({url: '/newsletters/2024-01-01/'})).toBe('Newsletter');
  });

  it('fallback for unknown paths', () => {
    expect(contentType({url: '/about/'})).toBe('Item');
  });

  it('return Item for missing url', () => {
    expect(contentType({})).toBe('Item');
    expect(contentType(null)).toBe('Item');
  });
});
