import {toISOString, formatDate} from './filters/dates.js';
import {markdownFormat} from './filters/markdown-format.js';
import {shuffleArray} from './filters/sort-random.js';
import {sortAlphabetically} from './filters/sort-alphabetic.js';
import {splitlines} from './filters/splitlines.js';
import {striptags} from './filters/striptags.js';
import {slugifyString} from './filters/slugify.js';
import {limit} from './filters/limit.js';
import {renderTransforms} from './filters/render-transforms.js';
import {lastModified} from './filters/last-modified.js';
import {where, keys, concat} from './filters/where.js';
import {booksByYear} from './filters/books.js';
import {moviesByYear} from './filters/movies.js';
import {showsByYear, showsByStatusAndYear} from './filters/shows.js';
import {gamesByYear} from './filters/games.js';

export default {
  toISOString,
  formatDate,
  markdownFormat,
  splitlines,
  striptags,
  shuffleArray,
  sortAlphabetically,
  slugifyString,
  limit,
  renderTransforms,
  lastModified,
  where,
  keys,
  concat,
  booksByYear,
  moviesByYear,
showsByYear,
  showsByStatusAndYear,
  gamesByYear
};

export function formatNumber(num) {
  if (num === undefined || num === null) return '0';
  return Number(num)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
