import {describe, it, expect} from 'vitest';
import {limit} from '../../../src/_config/filters/limit.js';

describe('limit', () => {
  it('return first n items of array', () => {
    expect(limit([1, 2, 3, 4, 5], 3)).toEqual([1, 2, 3]);
  });

  it('return full array when limit exceeds length', () => {
    expect(limit([1, 2], 5)).toEqual([1, 2]);
  });

  it('return empty array when limit is 0', () => {
    expect(limit([1, 2, 3], 0)).toEqual([]);
  });

  it('return the input unchanged when not an array', () => {
    const obj = {foo: 'bar'};
    expect(limit(obj, 3)).toBe(obj);
  });

  it('return the input unchanged when null', () => {
    expect(limit(null, 3)).toBeNull();
  });
});
