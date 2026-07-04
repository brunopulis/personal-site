import {describe, it, expect} from 'vitest';
import {slugifyString} from '../../../src/_config/filters/slugify.js';

describe('slugifyString', () => {
  it('convert string to lowercase slug', () => {
    expect(slugifyString('Hello World')).toBe('hello-world');
  });

  it('remove special characters', () => {
    expect(slugifyString('Hello, World!')).toBe('hello-world');
  });

  it('handle accented characters', () => {
    expect(slugifyString('São Paulo')).toBe('sao-paulo');
  });

  it('handle empty string', () => {
    expect(slugifyString('')).toBe('');
  });

  it('handle single word', () => {
    expect(slugifyString('Hello')).toBe('hello');
  });
});
