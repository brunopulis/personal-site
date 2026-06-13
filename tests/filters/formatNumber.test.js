import {describe, it, expect} from 'vitest';
import {formatNumber} from '../../src/_config/filters.js';

describe('formatNumber', () => {
  it('format number with dot as thousands separator', () => {
    expect(formatNumber(1000)).toBe('1.000');
  });

  it('format large number', () => {
    expect(formatNumber(1000000)).toBe('1.000.000');
  });

  it('return "0" for undefined', () => {
    expect(formatNumber(undefined)).toBe('0');
  });

  it('return "0" for null', () => {
    expect(formatNumber(null)).toBe('0');
  });

  it('format small number without separator', () => {
    expect(formatNumber(42)).toBe('42');
  });
});
