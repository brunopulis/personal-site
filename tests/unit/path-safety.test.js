import {describe, it, expect} from 'vitest';
import {resolveInside, safeYear, safeDate, slugToSegment} from '../../scripts/lib/path-safety.js';

describe('safeYear', () => {
  it('accept a four-digit year', () => {
    expect(safeYear('2024')).toBe('2024');
  });

  it('fall back to the current year for invalid input', () => {
    const current = String(new Date().getFullYear());
    expect(safeYear('../../etc')).toBe(current);
    expect(safeYear('abc')).toBe(current);
    expect(safeYear('')).toBe(current);
    expect(safeYear(undefined)).toBe(current);
    expect(safeYear(null)).toBe(current);
  });
});

describe('safeDate', () => {
  it('accept a YYYY-MM-DD date', () => {
    expect(safeDate('2024-03-15')).toBe('2024-03-15');
  });

  it('fall back to today for invalid input', () => {
    const today = new Date().toISOString().slice(0, 10);
    expect(safeDate('../../etc/passwd')).toBe(today);
    expect(safeDate('15/03/2024')).toBe(today);
    expect(safeDate('')).toBe(today);
  });
});

describe('slugToSegment', () => {
  it('keep already-slugified segments intact', () => {
    expect(slugToSegment('duna-2-parte-dois')).toBe('duna-2-parte-dois');
    expect(slugToSegment('destruicao-final-2')).toBe('destruicao-final-2');
  });

  it('strip any remaining unsafe characters', () => {
    expect(slugToSegment('duna/parte-2_!')).toBe('dunaparte-2');
    expect(slugToSegment("o''contador-2")).toBe('ocontador-2');
  });

  it('remove leading dots and dashes (no dotfiles)', () => {
    expect(slugToSegment('..secret')).toBe('secret');
    expect(slugToSegment('--flag')).toBe('flag');
    expect(slugToSegment('../../etc/passwd')).toBe('etcpasswd');
  });

  it('fall back to untitled for empty or symbol-only input', () => {
    expect(slugToSegment('')).toBe('untitled');
    expect(slugToSegment('...')).toBe('untitled');
    expect(slugToSegment('///')).toBe('untitled');
  });
});

describe('resolveInside', () => {
  it('resolve a plain name inside the root', () => {
    const result = resolveInside('/src/content/books', '2026');
    expect(result).toBe('/src/content/books/2026');
  });

  it('neutralize a nested name to a single basename', () => {
    const result = resolveInside('/src/content/books', 'nested/file.md');
    expect(result).toBe('/src/content/books/file.md');
  });

  it('neutralize an absolute path to a safe basename', () => {
    const result = resolveInside('/src/content/books', '/etc/passwd');
    expect(result).toBe('/src/content/books/passwd');
  });

  it('reject a path that escapes the root', () => {
    expect(() => resolveInside('/src/content/books', '..')).toThrow(/escapes/);
    expect(() => resolveInside('/src/content/books', '../..')).toThrow(/escapes/);
    expect(() => resolveInside('/src/content/books', 'x/../..')).toThrow(/escapes/);
  });

  it('reject a path that resolves to the root itself', () => {
    expect(() => resolveInside('/src/content/books', '.')).toThrow(/directory itself/);
    expect(() => resolveInside('/src/content/books', '')).toThrow(/directory itself/);
  });
});
