import {describe, it, expect} from 'vitest';
import {
  moviesByYear,
  showsByYear,
  groupByYear,
  filterByYear,
  filterFavorites,
  filterNonFavorites,
} from '../../src/_config/filters/media.js';

const makeItem = (watchedYear, favorite = false) => ({
  data: {watchedYear, favorite},
});

describe('moviesByYear', () => {
  it('group movies by watched year', () => {
    const items = [makeItem(2024), makeItem(2024), makeItem(2023)];
    const result = moviesByYear(items);
    expect(result.years).toEqual(['2024', '2023']);
    expect(result.byYear['2024']).toHaveLength(2);
    expect(result.byYear['2023']).toHaveLength(1);
  });

  it('return empty structure for null input', () => {
    expect(moviesByYear(null)).toEqual({byYear: {}, years: []});
  });

  it('return empty structure for non-array', () => {
    expect(moviesByYear('string')).toEqual({byYear: {}, years: []});
  });

  it('skip items without watchedYear', () => {
    const items = [{data: {}}, makeItem(2024)];
    const result = moviesByYear(items);
    expect(result.years).toEqual(['2024']);
  });
});

describe('filterFavorites', () => {
  it('return only favorite items', () => {
    const items = [makeItem(2024, true), makeItem(2024, false), makeItem(2023, true)];
    expect(filterFavorites(items)).toHaveLength(2);
  });

  it('return empty array for null', () => {
    expect(filterFavorites(null)).toEqual([]);
  });

  it('return empty array when no favorites', () => {
    const items = [makeItem(2024, false), makeItem(2023, false)];
    expect(filterFavorites(items)).toEqual([]);
  });
});

describe('filterNonFavorites', () => {
  it('return only non-favorite items', () => {
    const items = [makeItem(2024, true), makeItem(2024, false)];
    expect(filterNonFavorites(items)).toHaveLength(1);
  });

  it('return empty array for null', () => {
    expect(filterNonFavorites(null)).toEqual([]);
  });
});

describe('filterByYear', () => {
  it('filter items by watched year', () => {
    const items = [makeItem(2024), makeItem(2023), makeItem(2024)];
    expect(filterByYear(items, 2024)).toHaveLength(2);
  });

  it('return empty array for no matches', () => {
    const items = [makeItem(2024)];
    expect(filterByYear(items, 2020)).toEqual([]);
  });

  it('return empty array for null', () => {
    expect(filterByYear(null, 2024)).toEqual([]);
  });
});
