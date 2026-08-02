import {describe, it, expect} from 'vitest';
import {showsByYear} from '../../../src/_config/filters/shows.js';

const makeShow = watchedYear => ({data: {watchedYear}});

describe('showsByYear', () => {
  it('group shows by watched year', () => {
    const items = [makeShow(2024), makeShow(2024), makeShow(2023)];
    const result = showsByYear(items);
    expect(result.years).toEqual(['2024', '2023']);
    expect(result.byYear['2024']).toHaveLength(2);
    expect(result.byYear['2023']).toHaveLength(1);
  });

  it('return empty structure for null input', () => {
    expect(showsByYear(null)).toEqual({byYear: {}, years: []});
  });

  it('return empty structure for non-array', () => {
    expect(showsByYear('string')).toEqual({byYear: {}, years: []});
  });

  it('skip shows without watchedYear', () => {
    const items = [{data: {}}, makeShow(2024)];
    const result = showsByYear(items);
    expect(result.years).toEqual(['2024']);
  });
});
