import {describe, it, expect} from 'vitest';
import {
  categoriesSlugs,
  groupByYear,
  filterByYear,
  filterFavorites,
  mediaCategories
} from '../../../src/_config/filters/media.js';

const makeItem = (watchedYear, favorite = false) => ({
  data: {watchedYear, favorite}
});

describe('groupByYear', () => {
  it('group items by watched year', () => {
    const items = [makeItem(2024), makeItem(2024), makeItem(2023)];
    const result = groupByYear(items);
    expect(result.years).toEqual(['2024', '2023']);
    expect(result.byYear['2024']).toHaveLength(2);
    expect(result.byYear['2023']).toHaveLength(1);
  });

  it('return empty structure for null input', () => {
    expect(groupByYear(null)).toEqual({byYear: {}, years: []});
  });

  it('return empty structure for non-array', () => {
    expect(groupByYear('string')).toEqual({byYear: {}, years: []});
  });

  it('skip items without watchedYear', () => {
    const items = [{data: {}}, makeItem(2024)];
    const result = groupByYear(items);
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

describe('mediaCategories', () => {
  const makeCategory = category => ({data: {category}});

  it('count single categories', () => {
    const items = [makeCategory('Drama'), makeCategory('Drama'), makeCategory('Comédia')];
    expect(mediaCategories(items)).toEqual([
      {name: 'Comédia', count: 1},
      {name: 'Drama', count: 2}
    ]);
  });

  it('split comma-separated categories per item', () => {
    const items = [makeCategory('Drama, Crime'), makeCategory('Crime')];
    expect(mediaCategories(items)).toEqual([
      {name: 'Crime', count: 2},
      {name: 'Drama', count: 1}
    ]);
  });

  it('skip empty categories', () => {
    const items = [makeCategory(''), makeCategory('   '), makeCategory('Drama')];
    expect(mediaCategories(items)).toEqual([{name: 'Drama', count: 1}]);
  });

  it('handle array categories', () => {
    const items = [{data: {category: ['Aventura', 'Thriller']}}, makeCategory('Thriller')];
    expect(mediaCategories(items)).toEqual([
      {name: 'Aventura', count: 1},
      {name: 'Thriller', count: 2}
    ]);
  });

  it('return empty array for null', () => {
    expect(mediaCategories(null)).toEqual([]);
  });
});

describe('categoriesSlugs', () => {
  it('slugify single category', () => {
    expect(categoriesSlugs('Drama')).toBe('drama');
  });

  it('slugify each comma-separated category', () => {
    expect(categoriesSlugs('Mistério, Crime, Thriller')).toBe('misterio crime thriller');
  });

  it('strip ampersands in English categories', () => {
    expect(categoriesSlugs('Action & Adventure, Sci-Fi & Fantasy')).toBe(
      'action-and-adventure sci-fi-and-fantasy'
    );
  });

  it('return empty string for empty input', () => {
    expect(categoriesSlugs('')).toBe('');
    expect(categoriesSlugs(null)).toBe('');
  });

  it('slugify array categories', () => {
    expect(categoriesSlugs(['Aventura', 'Thriller', 'Ficção científica'])).toBe(
      'aventura thriller ficcao-cientifica'
    );
  });
});
