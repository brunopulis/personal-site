import {describe, it, expect} from 'vitest';
import {groupBy, groupByYear, groupByMonth} from '../../../src/_config/filters/groupBy.js';

describe('groupBy', () => {
  it('group items by a key', () => {
    const items = [
      {type: 'book', title: 'A'},
      {type: 'movie', title: 'B'},
      {type: 'book', title: 'C'}
    ];
    const result = groupBy(items, 'type');
    expect(result.book).toHaveLength(2);
    expect(result.movie).toHaveLength(1);
  });

  it('support nested key access', () => {
    const items = [{data: {cat: 'a'}}, {data: {cat: 'b'}}, {data: {cat: 'a'}}];
    const result = groupBy(items, 'data.cat');
    expect(result.a).toHaveLength(2);
    expect(result.b).toHaveLength(1);
  });

  it('return empty object for null', () => {
    expect(groupBy(null, 'key')).toEqual({});
  });
});

describe('groupByYear', () => {
  it('group items by year from date', () => {
    const items = [{date: '2024-06-15'}, {date: '2024-07-20'}, {date: '2023-08-10'}];
    const result = groupByYear(items);
    expect(result[2024]).toHaveLength(2);
    expect(result[2023]).toHaveLength(1);
  });

  it('return empty object for null', () => {
    expect(groupByYear(null)).toEqual({});
  });
});

describe('groupByMonth', () => {
  it('group items by month name', () => {
    const items = [{date: '2024-06-15'}, {date: '2024-06-20'}, {date: '2024-07-10'}];
    const result = groupByMonth(items);
    expect(result['June']).toHaveLength(2);
    expect(result['July']).toHaveLength(1);
  });

  it('return empty object for null', () => {
    expect(groupByMonth(null)).toEqual({});
  });
});
