import {describe, it, expect} from 'vitest';
import {readableDate} from '../../../src/_config/filters/readableDate.js';

describe('readableDate', () => {
  it('formats a Date in pt-BR short format', () => {
    const result = readableDate(new Date('2026-08-02T12:00:00Z'));
    expect(result).toBe('02 de Ago, 2026');
  });

  it('formats a string date in pt-BR short format', () => {
    const result = readableDate('2026-01-15');
    expect(result).toBe('15 de Jan, 2026');
  });

  it('formats full month name with MMMM', () => {
    const result = readableDate('2026-03-01', 'MMMM');
    expect(result).toBe('Março');
  });

  it('returns empty string for invalid dates', () => {
    const result = readableDate('not-a-date');
    expect(result).toBe('');
  });
});
