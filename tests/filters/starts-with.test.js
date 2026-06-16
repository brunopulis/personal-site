import {describe, it, expect} from 'vitest';
import {startsWith} from '../../src/_config/filters/starts-with.js';

describe('startsWith', () => {
  it('return true when string starts with prefix', () => {
    expect(startsWith('/blog/post/', '/blog')).toBe(true);
  });

  it('return false when string does not start with prefix', () => {
    expect(startsWith('/about/', '/blog')).toBe(false);
  });

  it('return true on exact match', () => {
    expect(startsWith('/blog', '/blog')).toBe(true);
  });

  it('return false for non-string input (number)', () => {
    expect(startsWith(42, '/blog')).toBe(false);
  });

  it('return false for null', () => {
    expect(startsWith(null, '/blog')).toBe(false);
  });

  it('return false for undefined', () => {
    expect(startsWith(undefined, '/blog')).toBe(false);
  });

  it('return false for object', () => {
    expect(startsWith({url: '/blog'}, '/blog')).toBe(false);
  });

  it('handle empty string prefix', () => {
    expect(startsWith('/blog', '')).toBe(true);
  });

  it('handle empty string input', () => {
    expect(startsWith('', '/blog')).toBe(false);
  });
});
