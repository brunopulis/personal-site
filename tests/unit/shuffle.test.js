import { shuffle } from '../../src/_config/filters/shuffle.js';

describe('shuffle Filter', () => {
  test('should return an array', () => {
    const result = shuffle([1, 2, 3]);
    expect(Array.isArray(result)).toBe(true);
  });

  test('should have same length as input', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffle(input);
    expect(result.length).toBe(input.length);
  });

  test('should contain all original elements', () => {
    const input = [1, 2, 3, 4, 5];
    const result = shuffle(input);
    expect(result.sort()).toEqual(input.sort());
  });

  test('should handle empty array', () => {
    expect(shuffle([])).toEqual([]);
  });

  test('should handle single element array', () => {
    expect(shuffle([1])).toEqual([1]);
  });

  test('should handle array of strings', () => {
    const input = ['a', 'b', 'c'];
    const result = shuffle(input);
    expect(result.sort()).toEqual(input.sort());
  });
});
