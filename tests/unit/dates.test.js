import {
  formatDate,
  readableDate,
  relativeDate,
  toISOString,
  toRfc822Date,
  toRfc3339Date,
  year,
} from '../../src/_config/filters/dates.js';

describe('Date Filters', () => {
  describe('readableDate', () => {
    test('should format date in Portuguese', () => {
      const date = '2024-12-15';
      expect(readableDate(date)).toBe('15 de dezembro de 2024');
    });

    test('should handle different months', () => {
      expect(readableDate('2024-01-01')).toBe('1 de janeiro de 2024');
      expect(readableDate('2024-07-15')).toBe('15 de julho de 2024');
    });
  });

  describe('year', () => {
    test('should return the correct year', () => {
      expect(year('2024-12-15')).toBe('2024');
      expect(year('2025-01-01')).toBe('2025');
    });

    test('should handle date object', () => {
      expect(year(new Date('2024-06-15'))).toBe('2024');
    });
  });

  describe('formatDate', () => {
    test('should use the provided format', () => {
      const date = '2024-12-15';
      expect(formatDate(date, 'DD/MM/YYYY')).toBe('15/12/2024');
      expect(formatDate(date, 'YYYY-MM-DD')).toBe('2024-12-15');
    });
  });

  describe('toISOString', () => {
    test('should convert date to ISO string', () => {
      const result = toISOString('2024-06-15');
      expect(result).toContain('2024-06-15');
    });
  });

  describe('toRfc822Date', () => {
    test('should convert date to RFC 822 format', () => {
      const result = toRfc822Date('2024-06-15');
      expect(result).toContain('2024');
    });
  });

  describe('toRfc3339Date', () => {
    test('should convert date to RFC 3339 format', () => {
      const result = toRfc3339Date('2024-06-15T10:30:00Z');
      expect(result).toContain('2024');
    });

    test('should handle simple date', () => {
      const result = toRfc3339Date('2024-06-15');
      expect(result).toMatch(/\d{4}/);
    });
  });

  describe('relativeDate', () => {
    test('should return "hoje" for today', () => {
      const today = new Date().toISOString().split('T')[0];
      expect(relativeDate(today)).toBe('hoje');
    });

    test('should return "ontem" for yesterday', () => {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      expect(relativeDate(yesterday)).toBe('ontem');
    });

    test('should return days ago for dates within a week', () => {
      const threeDaysAgo = new Date(Date.now() - 3 * 86400000).toISOString().split('T')[0];
      expect(relativeDate(threeDaysAgo)).toBe('3 dias atrás');
    });
  });
});
