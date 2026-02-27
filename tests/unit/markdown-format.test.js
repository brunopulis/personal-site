import { markdownFormat } from '../../src/_config/filters/markdown-format.js';

describe('markdownFormat Filter', () => {
  test('should convert bold text', () => {
    const result = markdownFormat('**bold text**');
    expect(result).toContain('<strong>bold text</strong>');
  });

  test('should convert italic text', () => {
    const result = markdownFormat('*italic text*');
    expect(result).toContain('<em>italic text</em>');
  });

  test('should convert links', () => {
    const result = markdownFormat('[Link text](http://example.com)');
    expect(result).toContain('<a href="http://example.com">Link text</a>');
  });

  test('should convert headings', () => {
    const result = markdownFormat('# Heading 1');
    expect(result).toContain('<h1>');
  });

  test('should convert lists', () => {
    const result = markdownFormat('- item 1\n- item 2');
    expect(result).toContain('<li>item 1</li>');
  });

  test('should return empty string for null input', () => {
    expect(markdownFormat(null)).toBe('');
  });

  test('should return empty string for undefined input', () => {
    expect(markdownFormat(undefined)).toBe('');
  });

  test('should return empty string for empty string', () => {
    expect(markdownFormat('')).toBe('');
  });

  test('should handle non-string input', () => {
    expect(markdownFormat(123)).toBe('');
    expect(markdownFormat({})).toBe('');
  });

  test('should convert code blocks', () => {
    const result = markdownFormat('```js\nconst x = 1\n```');
    expect(result).toContain('<pre>');
  });
});
