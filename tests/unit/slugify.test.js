import { slugifyString } from '../../src/_config/filters/slugify.js';

describe('slugify Filter', () => {
  test('should convert a simple string to slug', () => {
    expect(slugifyString('Hello World')).toBe('hello-world');
  });

  test('should handle special characters', () => {
    expect(slugifyString('Test #1')).toBe('test-1');
  });

  test('should handle accented characters', () => {
    expect(slugifyString('ação')).toBe('acao');
  });

  test('should return empty string for non-string input', () => {
    expect(slugifyString(null)).toBe('');
    expect(slugifyString(undefined)).toBe('');
    expect(slugifyString(123)).toBe('');
    expect(slugifyString({})).toBe('');
  });

  test('should handle empty string', () => {
    expect(slugifyString('')).toBe('');
  });

  test('should convert spaces to hyphens', () => {
    expect(slugifyString('my cool title')).toBe('my-cool-title');
  });

  test('should remove special symbols', () => {
    expect(slugifyString("test's (cool)")).toBe('tests-cool');
  });
});
