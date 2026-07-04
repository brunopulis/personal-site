import {describe, it, expect} from 'vitest';
import {toISOString, formatDate} from '../../../src/_config/filters/dates.js';

describe('toISOString', () => {
  it('convert date string to ISO format', () => {
    const result = toISOString('2024-01-15');
    expect(result).toMatch(/^2024-01-1[45]T/);
  });
});

describe('formatDate', () => {
  it('format date with custom format', () => {
    const result = formatDate('2024-01-15', 'YYYY');
    expect(result).toBe('2024');
  });

  it('format with month name', () => {
    const result = formatDate('2024-01-15', 'MMMM');
    expect(result.toLowerCase()).toBe('january');
  });

  it('format with full date', () => {
    const result = formatDate('2024-01-15', 'DD/MM/YYYY');
    expect(result).toBe('15/01/2024');
  });
});
