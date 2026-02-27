import { groupBy } from '../../src/_config/filters/groupBy.js';
import { limit } from '../../src/_config/filters/limit.js';
import { markdownFormat } from '../../src/_config/filters/markdown-format.js';
import { shuffle } from '../../src/_config/filters/shuffle.js';
import { slugifyString } from '../../src/_config/filters/slugify.js';
import { striptags } from '../../src/_config/filters/striptags.js';

describe('Chained Filters Integration', () => {
  const mockPosts = [
    { data: { category: 'tech', date: '2024-01-15' }, title: 'Post A', content: '# Tech Post' },
    { data: { category: 'life', date: '2024-02-20' }, title: 'Post B', content: '# Life Post' },
    { data: { category: 'tech', date: '2024-03-10' }, title: 'Post C', content: '# Tech Again' },
    { data: { category: 'life', date: '2024-01-05' }, title: 'Post D', content: '# Life Again' },
    { data: { category: 'tech', date: '2024-04-01' }, title: 'Post E', content: '# Tech Final' },
  ];

  describe('groupBy + limit', () => {
    test('should group posts by category then limit each group', () => {
      const grouped = groupBy(mockPosts, 'category');
      const limited = limit(grouped.tech, 2);
      expect(limited).toHaveLength(2);
    });

    test('should handle empty groups', () => {
      const grouped = groupBy([], 'category');
      expect(grouped).toEqual({});
    });
  });

  describe('shuffle + limit', () => {
    test('should shuffle and limit to get random subset', () => {
      const shuffled = shuffle([...mockPosts]);
      const limited = limit(shuffled, 3);
      expect(limited).toHaveLength(3);
      expect(mockPosts).toHaveLength(5);
    });
  });

  describe('slugify + groupBy', () => {
    test('should use slugified category as group key', () => {
      const postsWithSlugCategories = mockPosts.map(post => ({
        ...post,
        data: { ...post.data, categorySlug: slugifyString(post.data.category) },
      }));

      const grouped = groupBy(postsWithSlugCategories, 'categorySlug');
      expect(grouped['tech']).toHaveLength(3);
      expect(grouped['life']).toHaveLength(2);
    });
  });

  describe('markdownFormat + striptags + limit', () => {
    test('should extract plain text from markdown and limit', () => {
      const postsWithContent = mockPosts.map(post => ({
        ...post,
        plainContent: striptags(markdownFormat(post.content)),
      }));

      const limited = limit(postsWithContent, 3);
      expect(limited).toHaveLength(3);
      expect(limited[0].plainContent).toBeDefined();
    });
  });

  describe('Full pipeline: content processing', () => {
    test('should process posts through full pipeline', () => {
      const processed = mockPosts.map(post => ({
        ...post,
        slug: slugifyString(post.title),
        plainContent: striptags(markdownFormat(post.content)),
        year: post.data.date.split('-')[0],
      }));

      expect(processed[0].slug).toBe('post-a');
      expect(processed[0].plainContent).toContain('Tech');
      expect(processed[0].year).toBe('2024');
    });

    test('should group by year then limit', () => {
      const processed = mockPosts.map(post => ({
        ...post,
        year: post.data.date.split('-')[0],
      }));

      const grouped = groupBy(processed, 'year');
      const yearPosts = grouped['2024'] || [];
      const limited = limit(yearPosts, 3);
      expect(limited.length).toBeLessThanOrEqual(3);
    });
  });

  describe('Edge cases in chained filters', () => {
    test('should handle null/undefined in chain', () => {
      const items = [
        { data: { category: 'a' } },
        null,
        undefined,
        { data: { category: 'b' } },
      ].filter(Boolean);

      const grouped = groupBy(items, 'category');
      expect(grouped['a'] || []).toHaveLength(1);
      expect(grouped['b'] || []).toHaveLength(1);
    });

    test('should handle empty after processing', () => {
      const emptyContent = mockPosts.filter(p => p.content === '');
      const processed = emptyContent.map(p => ({
        slug: slugifyString(p.title),
      }));
      expect(processed).toEqual([]);
    });
  });
});
