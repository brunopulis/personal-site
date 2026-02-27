import {
  groupBy,
  groupByYear,
  groupByYearMonth,
  sortByDate,
} from '../../src/_config/filters/groupBy.js';

describe('groupBy Filter', () => {
  const items = [
    { data: { category: 'A' }, title: 'Item 1' },
    { data: { category: 'B' }, title: 'Item 2' },
    { data: { category: 'A' }, title: 'Item 3' },
  ];

  test('should group items by key', () => {
    const result = groupBy(items, 'category');
    expect(result.A).toHaveLength(2);
    expect(result.B).toHaveLength(1);
  });

  test('should return empty object for null input', () => {
    expect(groupBy(null, 'key')).toEqual({});
    expect(groupBy(undefined, 'key')).toEqual({});
  });

  test('should return empty object for non-array input', () => {
    expect(groupBy('string', 'key')).toEqual({});
    expect(groupBy({}, 'key')).toEqual({});
  });

  test('should handle items without data property', () => {
    const items = [{ category: 'A' }, { category: 'B' }];
    const result = groupBy(items, 'category');
    expect(result.A).toHaveLength(1);
    expect(result.B).toHaveLength(1);
  });
});

describe('groupByYear Filter', () => {
  const items = [
    { data: { date: '2024-01-15' }, title: 'Item 1' },
    { data: { date: '2023-06-20' }, title: 'Item 2' },
    { data: { date: '2024-03-10' }, title: 'Item 3' },
  ];

  test('should group items by year', () => {
    const result = groupByYear(items);
    expect(result[0][0]).toBe('2024');
    expect(result[0][1]).toHaveLength(2);
    expect(result[1][0]).toBe('2023');
  });

  test('should sort years in descending order', () => {
    const result = groupByYear(items);
    expect(result[0][0]).toBe('2024');
    expect(result[1][0]).toBe('2023');
  });

  test('should return empty array for null input', () => {
    expect(groupByYear(null)).toEqual([]);
    expect(groupByYear(undefined)).toEqual([]);
  });
});

describe('sortByDate Filter', () => {
  const items = [
    { date: '2023-01-15', title: 'Old' },
    { date: '2024-06-20', title: 'New' },
    { date: '2023-12-01', title: 'Middle' },
  ];

  test('should sort by date descending', () => {
    const result = sortByDate(items);
    expect(result[0].title).toBe('New');
    expect(result[2].title).toBe('Old');
  });

  test('should return empty array for null input', () => {
    expect(sortByDate(null)).toEqual([]);
    expect(sortByDate(undefined)).toEqual([]);
  });

  test('should return empty array for non-array input', () => {
    expect(sortByDate('string')).toEqual([]);
  });
});

describe('groupByYearMonth Filter', () => {
  const items = [
    { data: { date: '2024-01-15' }, title: 'Jan 2024' },
    { data: { date: '2023-12-20' }, title: 'Dec 2023' },
    { data: { date: '2024-02-10' }, title: 'Feb 2024' },
  ];

  test('should group items by year-month', () => {
    const result = groupByYearMonth(items);
    expect(result[0].key).toBe('2024-02');
    expect(result[0].items).toHaveLength(1);
  });

  test('should include label in Portuguese', () => {
    const result = groupByYearMonth(items);
    expect(result[0].label).toContain('fevereiro');
  });
});
