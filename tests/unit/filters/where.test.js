import {describe, it, expect} from 'vitest';
import {where, keys, concat} from '../../../src/_config/filters/where.js';

describe('where', () => {
  const items = [
    {type: 'book', title: 'A'},
    {type: 'movie', title: 'B'},
    {type: 'book', title: 'C'}
  ];

  it('filter items by key-value pair', () => {
    expect(where(items, 'type', 'book')).toEqual([items[0], items[2]]);
  });

  it('return empty array when no matches', () => {
    expect(where(items, 'type', 'game')).toEqual([]);
  });

  it('return empty array when items is null', () => {
    expect(where(null, 'type', 'book')).toEqual([]);
  });

  it('return empty array when items is not an array', () => {
    expect(where('string', 'type', 'book')).toEqual([]);
  });

  it('support nested key access with dot notation', () => {
    const nested = [{data: {type: 'book'}}, {data: {type: 'movie'}}];
    expect(where(nested, 'data.type', 'book')).toEqual([nested[0]]);
  });
});

describe('keys', () => {
  it('return keys of an object', () => {
    expect(keys({a: 1, b: 2})).toEqual(['a', 'b']);
  });

  it('return empty array for null', () => {
    expect(keys(null)).toEqual([]);
  });

  it('return empty array for non-object', () => {
    expect(keys('string')).toEqual([]);
  });
});

describe('concat', () => {
  it('concatenate two arrays', () => {
    expect(concat([1, 2], [3, 4])).toEqual([1, 2, 3, 4]);
  });

  it('handle first argument as non-array', () => {
    expect(concat(null, [1, 2])).toEqual([1, 2]);
  });

  it('handle second argument as non-array', () => {
    expect(concat([1, 2], null)).toEqual([1, 2]);
  });
});
