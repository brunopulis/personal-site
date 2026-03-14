import { slugifyString } from './filters/slugify.js';

export const posts = (collectionApi) => {
  const allPosts = collectionApi.getFilteredByGlob('./src/content/posts/**/*');
  return allPosts.sort((a, b) => {
    const dateA = a.data.pubDate || a.data.date;
    const dateB = b.data.pubDate || b.data.date;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });
};

export const postYears = (collectionApi) => {
  const allPosts = collectionApi.getFilteredByGlob('./src/content/posts/**/*');
  if (!allPosts) {
    return [];
  }

  const years = [
    ...new Set(
      allPosts
        .map((post) => {
          const postDate = post.data.pubDate || post.data.date;
          if (!postDate) return null;
          const year = new Date(postDate).getFullYear();
          return Number.isNaN(year) ? null : year;
        })
        .filter((y) => typeof y === 'number')
    ),
  ];
  return years.sort((a, b) => a - b);
};

export const getPostYears = postYears;

export const getPostsByYear = (collectionApi) => (year) => {
  const allPosts = collectionApi.getFilteredByGlob('./src/content/posts/**/*');
  if (!allPosts) {
    return [];
  }
  return allPosts
    .filter((post) => {
      const postDate = post.data.pubDate || post.data.date;
      const postYear = postDate ? new Date(postDate).getFullYear() : null;
      return postYear === year;
    })
    .sort((a, b) => {
      const dateA = a.data.pubDate || a.data.date;
      const dateB = b.data.pubDate || b.data.date;
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });
};

export const notes = (collectionApi) => {
  return collectionApi.getFilteredByGlob('./src/content/notes/**/*').reverse();
};

export const poems = (collectionApi) => {
  return collectionApi.getFilteredByGlob('./src/content/poems/**/*').reverse();
};

export const bookmarks = (collectionApi) => {
  return collectionApi.getFilteredByGlob('./src/content/bookmarks/**/*').reverse();
};

export const likes = (collectionApi) => {
  return collectionApi.getFilteredByGlob('./src/content/likes/**/*').reverse();
};

export const photos = (collectionApi) => {
  return collectionApi.getFilteredByGlob('./src/content/photos/**/*').reverse();
};

export const medias = (collectionApi) => {
  return collectionApi.getFilteredByGlob('./src/content/medias/**/*').reverse();
};

export const books = (collectionApi) => {
  return collectionApi.getFilteredByGlob('./src/content/books/**/*').reverse();
};

export const newsletters = (collectionApi) => {
  return collectionApi.getFilteredByGlob('./src/content/newsletter/**/*').reverse();
};

export const games = (collectionApi) => {
  return collectionApi.getFilteredByGlob('./src/content/games/**/*').reverse();
};

export const music = (collectionApi) => {
  return collectionApi
    .getFilteredByGlob('./src/content/music/**/*')
    .sort((a, b) => b.data.date - a.data.date);
};

export const showInSitemap = (collectionApi) => {
  return collectionApi.getFilteredByGlob('./src/**/*.{md,njk}');
};

export const tagListRecurrency = (collection) => {
  const tagCount = {};
  const excludedTags = [
    'all',
    'posts',
    'poems',
    'photos',
    'bookmarks',
    'books',
    'games',
    'newsletters',
    'notes',
    'medias',
    'music',
  ];

  const slugToTag = {};

  collection.getAll().forEach((item) => {
    if ('tags' in item.data) {
      const tags = item.data.tags;

      for (const tag of tags) {
        if (excludedTags.includes(tag)) {
          continue;
        }
        const slug = slugifyString(tag);
        if (!slug) {
          continue;
        }
        tagCount[slug] = (tagCount[slug] || 0) + 1;
        if (!slugToTag[slug]) {
          slugToTag[slug] = tag;
        }
      }
    }
  });

  return Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([slug, count]) => ({ tag: slugToTag[slug], count, slug }));
};

export const tagList = (collection) => {
  const tags = [];

  collection.getAll().forEach((item) => {
    if ('tags' in item.data) {
      const itemTags = item.data.tags;

      for (const tag of itemTags) {
        if (
          ![
            'all',
            'posts',
            'poems',
            'photos',
            'bookmarks',
            'books',
            'gallery',
            'games',
            'newsletters',
            'notes',
            'medias',
            'music',
          ].includes(tag)
        ) {
          const slug = slugifyString(tag);
          if (slug && !tags.find((t) => t.slug === slug)) {
            tags.push({ tag, slug });
          }
        }
      }
    }
  });

  return tags.sort((a, b) => a.tag.localeCompare(b.tag));
};

export default {
  showInSitemap,
  newsletters,
  books,
  bookmarks,
  games,
  getPostsByYear,
  getPostYears,
  likes,
  medias,
  music,
  notes,
  photos,
  poems,
  posts,
  postYears,
  tagList,
};
