import { striptags } from '../../src/_config/filters/striptags.js';

describe('striptags Filter', () => {
  test('should remove simple HTML tags', () => {
    expect(striptags('<p>Hello World</p>')).toBe('Hello World');
  });

  test('should remove multiple HTML tags', () => {
    expect(striptags('<div><p>Test</p></div>')).toBe('Test');
  });

  test('should handle self-closing tags', () => {
    expect(striptags('Image: <img src="test.jpg">')).toBe('Image: ');
  });

  test('should handle nested tags', () => {
    expect(striptags('<div><span><strong>Bold</strong></span></div>')).toBe('Bold');
  });

  test('should handle tags with attributes', () => {
    expect(striptags('<a href="http://test.com" class="link">Link</a>')).toBe('Link');
  });

  test('should return original string if no tags', () => {
    expect(striptags('Plain text')).toBe('Plain text');
  });

  test('should handle empty string', () => {
    expect(striptags('')).toBe('');
  });

  test('should handle broken tags', () => {
    expect(striptags('<p>Unclosed paragraph')).toBe('Unclosed paragraph');
  });
});
