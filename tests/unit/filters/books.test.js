import {describe, it, expect} from 'vitest';
import {booksByYear, currentlyReading} from '../../../src/_config/filters/books.js';

const makeBook = (status, attendedYear = 2026) => ({
  data: {status, attendedYear}
});

describe('currentlyReading', () => {
  it('return only books with status lendo', () => {
    const books = [makeBook('lendo'), makeBook('lido'), makeBook('lendo')];
    expect(currentlyReading(books)).toHaveLength(2);
  });

  it('return empty array for null', () => {
    expect(currentlyReading(null)).toEqual([]);
  });

  it('return empty array for non-array', () => {
    expect(currentlyReading('string')).toEqual([]);
  });

  it('return empty array when nothing is being read', () => {
    const books = [makeBook('lido'), makeBook('lido')];
    expect(currentlyReading(books)).toEqual([]);
  });

  it('skip books without status', () => {
    const books = [{data: {}}, makeBook('lendo')];
    expect(currentlyReading(books)).toHaveLength(1);
  });
});

describe('booksByYear', () => {
  it('group read books by attended year', () => {
    const books = [makeBook('lido', 2026), makeBook('lido', 2026), makeBook('lido', 2025)];
    const result = booksByYear(books);
    expect(result.years).toEqual(['2026', '2025']);
    expect(result.byYear['2026']).toHaveLength(2);
    expect(result.byYear['2025']).toHaveLength(1);
  });

  it('exclude books with a different status', () => {
    const books = [makeBook('lendo', 2026), makeBook('lido', 2025)];
    const result = booksByYear(books);
    expect(result.years).toEqual(['2025']);
  });

  it('return empty structure for null input', () => {
    expect(booksByYear(null)).toEqual({byYear: {}, years: []});
  });

  it('skip books without attendedYear', () => {
    const books = [{data: {status: 'lido'}}, makeBook('lido', 2024)];
    const result = booksByYear(books);
    expect(result.years).toEqual(['2024']);
  });
});
