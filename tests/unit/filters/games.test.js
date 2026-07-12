import {describe, it, expect} from 'vitest';
import {gamesByYear} from '../../../src/_config/filters/games.js';

describe('gamesByYear', () => {
  it('group games by release year', () => {
    const games = [
      {data: {title: 'Game A', releaseDate: '2022-02-25T00:00:00.000Z'}},
      {data: {title: 'Game B', releaseDate: '2022-06-10T00:00:00.000Z'}},
      {data: {title: 'Game C', releaseDate: '2018-10-26T00:00:00.000Z'}}
    ];

    const result = gamesByYear(games);

    expect(result.years).toEqual(['2022', '2018']);
    expect(result.byYear['2022']).toHaveLength(2);
    expect(result.byYear['2018']).toHaveLength(1);
  });

  it('return empty structure for null input', () => {
    const result = gamesByYear(null);
    expect(result).toEqual({byYear: {}, years: []});
  });

  it('return empty structure for non-array input', () => {
    const result = gamesByYear('not an array');
    expect(result).toEqual({byYear: {}, years: []});
  });

  it('skip games without releaseDate', () => {
    const games = [
      {data: {title: 'Game A', releaseDate: '2022-02-25T00:00:00.000Z'}},
      {data: {title: 'Game B'}}
    ];

    const result = gamesByYear(games);
    expect(result.years).toEqual(['2022']);
    expect(result.byYear['2022']).toHaveLength(1);
  });

  it('return empty structure for empty array', () => {
    const result = gamesByYear([]);
    expect(result).toEqual({byYear: {}, years: []});
  });

  it('sort years descending', () => {
    const games = [
      {data: {title: 'A', releaseDate: '2015-06-15T00:00:00.000Z'}},
      {data: {title: 'B', releaseDate: '2022-06-15T00:00:00.000Z'}},
      {data: {title: 'C', releaseDate: '2018-06-15T00:00:00.000Z'}}
    ];

    const result = gamesByYear(games);
    expect(result.years).toEqual(['2022', '2018', '2015']);
  });
});
