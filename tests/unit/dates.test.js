import { formatDate, readableDate, year } from '../../src/_config/filters/dates.js';

describe('Date Filters', () => {
  test('readableDate should format date in Portuguese', () => {
    const date = '2024-12-15';
    expect(readableDate(date)).toBe('15 de dezembro de 2024');
  });

  test('year should return the correct year', () => {
    expect(year('2024-12-15')).toBe('2024');
    expect(year('2025-01-01')).toBe('2025');
  });

  test('formatDate should use the provided format', () => {
    const date = '2024-12-15';
    expect(formatDate(date, 'DD/MM/YYYY')).toBe('15/12/2024');
    expect(formatDate(date, 'YYYY-MM-DD')).toBe('2024-12-15');
  });
});
