import { limit } from '../../src/_config/filters/limit.js';

describe('limit Filter', () => {
  const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  test('should limit array to specified number', () => {
    expect(limit(testArray, 3)).toEqual([1, 2, 3]);
  });

  test('should return full array if limit is greater than length', () => {
    expect(limit(testArray, 20)).toEqual(testArray);
  });

  test('should return empty array if limit is 0', () => {
    expect(limit(testArray, 0)).toEqual([]);
  });

  test('should handle negative limit (returns all except last n)', () => {
    expect(limit(testArray, -1)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test('should handle non-array input', () => {
    expect(limit('string', 5)).toBe('string');
    expect(limit(null, 5)).toBe(null);
    expect(limit({ length: 5 }, 5)).toEqual({ length: 5 });
  });

  test('should handle undefined input', () => {
    expect(limit(undefined, 5)).toBe(undefined);
  });

  test('should work with array of objects', () => {
    const objects = [{ a: 1 }, { a: 2 }, { a: 3 }];
    expect(limit(objects, 2)).toEqual([{ a: 1 }, { a: 2 }]);
  });
});
