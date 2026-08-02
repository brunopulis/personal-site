import {describe, it, expect} from 'vitest';
import {moviesByYear} from '../../../src/_config/filters/movies.js';

const makeMovie = watchedYear => ({data: {watchedYear}});

describe('moviesByYear', () => {
  it('group movies by watched year', () => {
    const items = [makeMovie(2024), makeMovie(2024), makeMovie(2023)];
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

  it('skip movies without watchedYear', () => {
    const items = [{data: {}}, makeMovie(2024)];
    const result = moviesByYear(items);
    expect(result.years).toEqual(['2024']);
  });
});
