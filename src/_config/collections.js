import fs from 'node:fs';
import blogroll from '../_data/blogroll.json' with {type: 'json'};

export const getAllPosts = collection => {
  return collection.getFilteredByGlob('./src/content/posts/**/*.md').reverse();
};

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
