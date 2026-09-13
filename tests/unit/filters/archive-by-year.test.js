import {describe, it, expect} from 'vitest';
import {archiveByYear} from '../../../src/_config/filters/archive-by-year.js';

const post = (year, month, day, title) => ({
  date: new Date(Date.UTC(year, month - 1, day)),
  data: {title}
});

describe('archiveByYear', () => {
  it('group items by year in descending year order', () => {
    const groups = archiveByYear([
      post(2017, 7, 24, 'Não oro'),
      post(2026, 6, 11, 'Post atual'),
      post(2019, 3, 10, 'Meio')
    ]);

    expect(groups.map(group => group.year)).toEqual([2026, 2019, 2017]);
    expect(groups[0].items.map(item => item.data.title)).toEqual(['Post atual']);
    expect(groups[2].items.map(item => item.data.title)).toEqual(['Não oro']);
  });

  it('preserve input order inside a year', () => {
    const groups = archiveByYear([post(2026, 6, 11, 'Novo'), post(2026, 3, 1, 'Antigo')]);

    expect(groups[0].items.map(item => item.data.title)).toEqual(['Novo', 'Antigo']);
  });

  it('accept string dates and sort groups', () => {
    const groups = archiveByYear([
      {date: '2026-06-11', data: {title: 'A'}},
      {date: '2019-03-10', data: {title: 'B'}}
    ]);

    expect(groups.map(group => group.year)).toEqual([2026, 2019]);
    expect(groups[1].items[0].data.title).toBe('B');
  });

  it('ignore invalid or missing dates', () => {
    const groups = archiveByYear([
      {data: {title: 'sem data'}},
      {date: 'not-a-date', data: {title: 'inválido'}},
      null
    ]);
    expect(groups).toEqual([]);
  });

  it('return empty for null', () => {
    expect(archiveByYear(null)).toEqual([]);
  });
});
