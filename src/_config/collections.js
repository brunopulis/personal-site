import fs from 'node:fs';
import blogroll from '../_data/blogroll.json' with {type: 'json'};
import {slugifyString} from './filters/slugify.js';
import {buildTagGroups, chunk} from './taxonomy/tags-core.js';

const getPosts = collection => collection.getFilteredByGlob('./src/content/posts/**/*.md').reverse();

export const getAllPosts = getPosts;

export const getAllLikes = collection => {
  return collection.getFilteredByGlob('./src/content/likes/**/*.md').reverse();
};

export const getAllNewsletters = collection => {
  return collection.getFilteredByGlob('./src/content/newsletters/**/*.md').reverse();
};

export const getAllBooks = collection => {
  return collection.getFilteredByGlob('./src/content/books/**/*.md').reverse();
};

export const getAllMovies = collection => {
  return collection.getFilteredByGlob('./src/content/watching/movies/**/*.md').reverse();
};

export const getAllShows = collection => {
  return collection.getFilteredByGlob('./src/content/watching/shows/**/*.md').reverse();
};

export const getWatchingYears = collection => {
  const movies = collection.getFilteredByGlob('./src/content/watching/movies/**/*.md');
  const shows = collection.getFilteredByGlob('./src/content/watching/shows/**/*.md');
  const allItems = [...movies, ...shows];
  const yearsSet = new Set();

  allItems.forEach(item => {
    if (item.data?.watchedYear) {
      yearsSet.add(String(item.data.watchedYear));
    }
  });

  return Array.from(yearsSet).sort((a, b) => b - a);
};

export const getAllNotes = collection => {
  return collection.getFilteredByGlob('./src/content/notes/**/*.md').reverse();
};

export const getAllPoetry = collection => {
  return collection.getFilteredByGlob('./src/content/poetry/**/*.md').reverse();
};

const FEED_SOURCES = [
  {glob: './src/content/posts/**/*.md', type: 'post'},
  {glob: './src/content/notes/**/*.md', type: 'note'},
  {glob: './src/content/likes/**/*.md', type: 'like'},
  {glob: './src/content/newsletters/**/*.md', type: 'newsletter'},
  {glob: './src/content/books/**/*.md', type: 'book'},
  {glob: './src/content/watching/movies/**/*.md', type: 'movie'},
  {glob: './src/content/watching/shows/**/*.md', type: 'show'},
  {glob: './src/content/poetry/**/*.md', type: 'poem'}
];

const stripFrontmatter = content => content.replace(/^---\n[\s\S]*?\n---/, '').trim();

export const getAllFeed = collection => {
  const items = FEED_SOURCES.flatMap(source =>
    collection.getFilteredByGlob(source.glob).map(item => ({
      item,
      type: source.type,
      raw: stripFrontmatter(fs.readFileSync(item.inputPath, 'utf-8'))
    }))
  );

  return items
    .sort((a, b) => {
      const dateA = a.item.data?.watchedDate || a.item.data?.pubDate || a.item.date;
      const dateB = b.item.data?.watchedDate || b.item.data?.pubDate || b.item.date;
      return new Date(dateB) - new Date(dateA);
    })
    .slice(0, 20);
};

export const blogrollCategories = () => {
  const categoriesSet = new Set();
  blogroll.forEach(entry => {
    if (entry.category) {
      categoriesSet.add(entry.category);
    }
  });
  return Array.from(categoriesSet).sort();
};

const TAG_PAGE_SIZE = 10;
const TAG_CONTENT_GLOBS = [
  './src/content/posts/**/*.md',
  './src/content/notes/**/*.md',
  './src/content/books/**/*.md',
  './src/content/likes/**/*.md',
  './src/content/newsletters/**/*.md',
  './src/content/poetry/**/*.md',
  './src/content/watching/movies/**/*.md',
  './src/content/watching/shows/**/*.md'
];

const tagContentDate = item => new Date(item.data?.watchedDate || item.data?.pubDate || item.date);

export const getTagsPages = collection => {
  const items = TAG_CONTENT_GLOBS.flatMap(glob => collection.getFilteredByGlob(glob));

  const rows = [];
  items.forEach(item => {
    const tags = item.data?.tags;
    if (!Array.isArray(tags) || tags.length === 0) return;
    [...new Set(tags)].forEach(tag => rows.push({tag, item}));
  });

  const groups = buildTagGroups(rows).map(group => ({
    ...group,
    items: [...group.items].sort((a, b) => tagContentDate(b) - tagContentDate(a))
  }));

  const pages = [];
  groups.forEach(group => {
    const pageHref = pageNumber => `/tags/${group.slug}/${pageNumber === 0 ? '' : `page/${pageNumber + 1}/`}`;

    const chunks = chunk(group.items, TAG_PAGE_SIZE);
    chunks.forEach((items, pageIndex, allChunks) => {
      pages.push({
        name: group.name,
        slug: group.slug,
        items,
        subPagination: {
          pageNumber: pageIndex,
          pageHref: pageHref(pageIndex),
          previous: pageIndex > 0,
          next: pageIndex + 1 < allChunks.length,
          href: {
            first: pageHref(0),
            previous: pageIndex > 0 ? pageHref(pageIndex - 1) : null,
            current: pageHref(pageIndex),
            next: pageIndex + 1 < allChunks.length ? pageHref(pageIndex + 1) : null,
            last: pageHref(allChunks.length - 1)
          },
          hrefs: allChunks.map((_, i) => pageHref(i)),
          pages: allChunks
        }
      });
    });
  });

  return pages;
};

export const getPostCategories = collection => {
  const byCategory = new Map();

  getPosts(collection).forEach(post => {
    const label = post.data?.category;
    if (!label) return;
    if (!byCategory.has(label)) byCategory.set(label, []);
    byCategory.get(label).push(post);
  });

  return Array.from(byCategory.entries())
    .map(([name, items]) => ({name, slug: slugifyString(name), items}))
    .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'));
};
