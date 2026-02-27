import { tagList, tagListRecurrency } from '../../src/_config/collections.js';

describe('Collections', () => {
  describe('tagListRecurrency', () => {
    const createMockCollection = items => ({
      getAll: () => items,
    });

    test('should count tag occurrences', () => {
      const items = [
        { data: { tags: ['javascript', 'web'] } },
        { data: { tags: ['javascript', 'css'] } },
        { data: { tags: ['web'] } },
      ];
      const collection = createMockCollection(items);
      const result = tagListRecurrency(collection);

      expect(result.find(r => r.slug === 'javascript').count).toBe(2);
      expect(result.find(r => r.slug === 'web').count).toBe(2);
      expect(result.find(r => r.slug === 'css').count).toBe(1);
    });

    test('should exclude predefined tags', () => {
      const items = [
        { data: { tags: ['posts', 'javascript'] } },
        { data: { tags: ['all', 'web'] } },
        { data: { tags: ['javascript'] } },
      ];
      const collection = createMockCollection(items);
      const result = tagListRecurrency(collection);

      const slugs = result.map(r => r.slug);
      expect(slugs).not.toContain('posts');
      expect(slugs).not.toContain('all');
      expect(slugs).toContain('javascript');
      expect(slugs).toContain('web');
    });

    test('should return empty array for collection without tags', () => {
      const items = [{ data: { title: 'Post 1' } }, { data: { title: 'Post 2' } }];
      const collection = createMockCollection(items);
      const result = tagListRecurrency(collection);

      expect(result).toEqual([]);
    });

    test('should sort by count descending', () => {
      const items = [
        { data: { tags: ['a'] } },
        { data: { tags: ['a'] } },
        { data: { tags: ['a'] } },
        { data: { tags: ['b'] } },
        { data: { tags: ['b'] } },
        { data: { tags: ['c'] } },
      ];
      const collection = createMockCollection(items);
      const result = tagListRecurrency(collection);

      expect(result[0].count).toBe(3);
      expect(result[1].count).toBe(2);
      expect(result[2].count).toBe(1);
    });
  });

  describe('tagList', () => {
    const createMockCollection = items => ({
      getAll: () => items,
    });

    test('should return unique tags sorted alphabetically', () => {
      const items = [
        { data: { tags: ['zebra', 'apple'] } },
        { data: { tags: ['banana', 'apple'] } },
      ];
      const collection = createMockCollection(items);
      const result = tagList(collection);

      expect(result).toEqual(['apple', 'banana', 'zebra']);
    });

    test('should exclude predefined tags', () => {
      const items = [
        { data: { tags: ['posts', 'javascript', 'all'] } },
        { data: { tags: ['poems', 'web'] } },
      ];
      const collection = createMockCollection(items);
      const result = tagList(collection);

      expect(result).not.toContain('posts');
      expect(result).not.toContain('poems');
      expect(result).not.toContain('all');
      expect(result).toContain('javascript');
      expect(result).toContain('web');
    });

    test('should handle items without tags', () => {
      const items = [{ data: { title: 'Post 1' } }, { data: { tags: ['javascript'] } }];
      const collection = createMockCollection(items);
      const result = tagList(collection);

      expect(result).toEqual(['javascript']);
    });

    test('should return empty array for collection without tags', () => {
      const items = [{ data: { title: 'Post 1' } }, { data: { title: 'Post 2' } }];
      const collection = createMockCollection(items);
      const result = tagList(collection);

      expect(result).toEqual([]);
    });

    test('should slugify tags', () => {
      const items = [{ data: { tags: ['Java Script'] } }, { data: { tags: ['web development'] } }];
      const collection = createMockCollection(items);
      const result = tagList(collection);

      expect(result).toContain('Java Script');
      expect(result).toContain('web development');
    });
  });
});
