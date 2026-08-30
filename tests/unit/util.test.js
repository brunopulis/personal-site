import {describe, it, expect} from 'vitest';
import {
  currentYear,
  formatTags,
  parseChoice,
  parseRating,
  quote,
  todayString
} from '../../scripts/lib/util.js';

describe('parseChoice', () => {
  const options = ['lido', 'lendo'];

  it('pick the option by number', () => {
    expect(parseChoice('1', options)).toBe('lido');
    expect(parseChoice('2', options)).toBe('lendo');
  });

  it('pick the option by number with an explicit default', () => {
    expect(parseChoice('', options, 1)).toBe('lendo');
  });

  it('fall back to the default for empty answer', () => {
    expect(parseChoice('', options)).toBe('lido');
  });

  it('fall back to the default for out-of-range numbers', () => {
    expect(parseChoice('0', options)).toBe('lido');
    expect(parseChoice('99', options)).toBe('lido');
  });

  it('fall back to the default for non-numeric answers', () => {
    expect(parseChoice('abc', options)).toBe('lido');
  });
});

describe('parseRating', () => {
  it('return empty string for empty answer', () => {
    expect(parseRating('')).toBe('');
  });

  it('parse a numeric note', () => {
    expect(parseRating('4')).toBe(4);
  });

  it('parse a zero as an empty value', () => {
    expect(parseRating('0')).toBe('');
  });

  it('return empty string for non-numeric answers', () => {
    expect(parseRating('bom')).toBe('');
  });
});

describe('quote', () => {
  it('wrap a plain value in double quotes', () => {
    expect(quote('livro')).toBe('"livro"');
  });

  it('escape double quotes inside the value', () => {
    expect(quote('O "Livro"')).toBe('"O \\"Livro\\""');
  });

  it('escape backslashes inside the value', () => {
    expect(quote('C:\\pasta\\arquivo')).toBe('"C:\\\\pasta\\\\arquivo"');
  });

  it('convert a non-string value to a string', () => {
    expect(quote(5)).toBe('"5"');
  });
});

describe('formatTags', () => {
  it('format a comma-separated string', () => {
    expect(formatTags('Ficção, Fantasia , Épico')).toBe('["Ficção", "Fantasia", "Épico"]');
  });

  it('format an array', () => {
    expect(formatTags(['A', 'B'])).toBe('["A", "B"]');
  });

  it('return empty array for no tags', () => {
    expect(formatTags('')).toBe('[]');
    expect(formatTags([])).toBe('[]');
    expect(formatTags(undefined)).toBe('[]');
  });

  it('escape double quotes inside tags', () => {
    expect(formatTags('O "Livro"')).toBe('["O \\"Livro\\""]');
  });

  it('drop empty segments between commas', () => {
    expect(formatTags('a,,b,')).toBe('["a", "b"]');
  });
});

describe('todayString', () => {
  it('return the current date in YYYY-MM-DD format', () => {
    expect(todayString()).toBe(new Date().toISOString().slice(0, 10));
  });

  it('match the YYYY-MM-DD pattern', () => {
    expect(todayString()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe('currentYear', () => {
  it('return the current year as a string', () => {
    expect(currentYear()).toBe(String(new Date().getFullYear()));
  });

  it('match the four-digit year pattern', () => {
    expect(currentYear()).toMatch(/^\d{4}$/);
  });
});
