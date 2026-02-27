import { groupBy, groupByYear, sortByDate } from '../../src/_config/filters/groupBy.js';
import { limit } from '../../src/_config/filters/limit.js';
import { slugifyString } from '../../src/_config/filters/slugify.js';

describe('Collection Processing Integration', () => {
  const mockCollection = [
    {
      url: '/posts/first-post/',
      data: {
        title: 'First Post',
        date: '2024-01-15',
        tags: ['tech', 'js'],
        category: 'development',
      },
    },
    {
      url: '/posts/second-post/',
      data: { title: 'Second Post', date: '2023-06-20', tags: ['life'], category: 'personal' },
    },
    {
      url: '/posts/third-post/',
      data: {
        title: 'Third Post',
        date: '2024-03-10',
        tags: ['tech', 'css'],
        category: 'development',
      },
    },
    {
      url: '/posts/fourth-post/',
      data: { title: 'Fourth Post', date: '2022-12-01', tags: ['work'], category: 'career' },
    },
    {
      url: '/posts/fifth-post/',
      data: {
        title: 'Fifth Post',
        date: '2024-02-28',
        tags: ['tech', 'accessibility'],
        category: 'development',
      },
    },
  ];

  describe('Post processing pipeline', () => {
    test('should add slugs to collection items', () => {
      const withSlugs = mockCollection.map(post => ({
        ...post,
        slug: slugifyString(post.data.title),
      }));

      expect(withSlugs[0].slug).toBe('first-post');
      expect(withSlugs[1].slug).toBe('second-post');
    });

    test('should sort posts by date descending', () => {
      const sorted = sortByDate([...mockCollection]);
      expect(sorted[0].data.title).toBe('Third Post');
      expect(sorted[4].data.title).toBe('Fourth Post');
    });

    test('should group posts by year', () => {
      const grouped = groupByYear(mockCollection);
      const years = grouped.map(([year]) => year);

      expect(years).toEqual(['2024', '2023', '2022']);
      expect(grouped[0][1]).toHaveLength(3);
      expect(grouped[1][1]).toHaveLength(1);
    });
  });

  describe('Tag-based filtering', () => {
    test('should filter posts by tag', () => {
      const techPosts = mockCollection.filter(post => post.data.tags.includes('tech'));
      expect(techPosts).toHaveLength(3);
    });

    test('should get unique tags from collection', () => {
      const allTags = mockCollection.flatMap(post => post.data.tags);
      const uniqueTags = [...new Set(allTags)];

      expect(uniqueTags).toContain('tech');
      expect(uniqueTags).toContain('life');
      expect(uniqueTags).toContain('work');
    });
  });

  describe('Category-based operations', () => {
    test('should group by category', () => {
      const grouped = groupBy(mockCollection, 'category');

      expect(grouped.development).toHaveLength(3);
      expect(grouped.personal).toHaveLength(1);
      expect(grouped.career).toHaveLength(1);
    });

    test('should get posts by category with pagination', () => {
      const grouped = groupBy(mockCollection, 'category');
      const devPosts = grouped.development || [];
      const page1 = limit(devPosts, 2);

      expect(page1.length).toBeLessThanOrEqual(2);
    });
  });

  describe('Complex collection queries', () => {
    test('should get recent posts from specific category', () => {
      const result = mockCollection
        .filter(post => post.data.category === 'development')
        .sort((a, b) => new Date(b.data.date) - new Date(a.data.date))
        .slice(0, 2);

      expect(result).toHaveLength(2);
      expect(result[0].data.title).toBe('Third Post');
    });

    test('should get all tags with post count', () => {
      const tagCounts = mockCollection.reduce((acc, post) => {
        post.data.tags.forEach(tag => {
          acc[tag] = (acc[tag] || 0) + 1;
        });
        return acc;
      }, {});

      expect(tagCounts.tech).toBe(3);
      expect(tagCounts.life).toBe(1);
      expect(tagCounts.work).toBe(1);
    });
  });

  describe('Archive generation', () => {
    test('should generate yearly archive structure', () => {
      const sorted = sortByDate([...mockCollection]);
      const grouped = groupByYear(sorted);

      const archive = grouped.map(([year, items]) => ({
        year,
        count: items.length,
        posts: items.map(p => p.data.title),
      }));

      expect(archive[0].year).toBe('2024');
      expect(archive[0].count).toBe(3);
    });
  });
});
