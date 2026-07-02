import {describe, it, expect} from 'vitest';

function aggregateCategories(posts, slugFn) {
  const map = new Map();
  for (const post of posts) {
    const cat = post.data?.category;
    if (!cat) continue;
    const slug = slugFn(cat);
    if (!map.has(slug)) {
      map.set(slug, {name: cat, slug, count: 0});
    }
    map.get(slug).count++;
  }
  return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
}

const slugFn = s =>
  String(s)
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

function makePost(category) {
  return {data: {category}};
}

describe('aggregateCategories', () => {
  it('group posts by category and count them', () => {
    const posts = [makePost('Frontend'), makePost('Frontend'), makePost('Acessibilidade')];
    const result = aggregateCategories(posts, slugFn);
    expect(result).toEqual([
      {name: 'Acessibilidade', slug: 'acessibilidade', count: 1},
      {name: 'Frontend', slug: 'frontend', count: 2},
    ]);
  });

  it('sort categories alphabetically by name', () => {
    const posts = [makePost('Teologia'), makePost('Acessibilidade'), makePost('Carreira'), makePost('Eventos')];
    const result = aggregateCategories(posts, slugFn);
    expect(result.map(c => c.name)).toEqual(['Acessibilidade', 'Carreira', 'Eventos', 'Teologia']);
  });

  it('skip posts without category', () => {
    const posts = [
      {data: {}},
      makePost('Frontend'),
      {data: {category: ''}},
    ];
    const result = aggregateCategories(posts, slugFn);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Frontend');
  });

  it('return empty array when no posts have category', () => {
    const posts = [{data: {}}, {data: {title: 'No cat'}}];
    expect(aggregateCategories(posts, slugFn)).toEqual([]);
  });

  it('return empty array for empty input', () => {
    expect(aggregateCategories([], slugFn)).toEqual([]);
  });

  it('handle accented category names via NFD slug', () => {
    const posts = [makePost('Educação'), makePost('Coração')];
    const result = aggregateCategories(posts, slugFn);
    expect(result).toEqual([
      {name: 'Coração', slug: 'coracao', count: 1},
      {name: 'Educação', slug: 'educacao', count: 1},
    ]);
  });

  it('produce stable count with multiple posts in same category', () => {
    const posts = Array.from({length: 5}, () => makePost('Produtividade'));
    const result = aggregateCategories(posts, slugFn);
    expect(result).toEqual([{name: 'Produtividade', slug: 'produtividade', count: 5}]);
  });
});
