import {
  formatDate,
  readableDate,
  relativeDate,
  sortByDate,
  toISOString,
  toRfc822Date
} from './filters/dates.js';
import {filterByMediaType, lazyGroupByWatchedYear} from './filters/filterByType.js';
import {filterByYear} from './filters/filterByYear.js';
import {groupBy, groupByMonth, groupByYear, groupByYearMonth} from './filters/groupBy.js';
import {getPostsByTag} from './filters/get-posts-by-tag.js';
import {lazyGroupByYear, lazyPaginate} from './filters/lazy.js';
import {limit} from './filters/limit.js';
import {markdownFormat} from './filters/markdown-format.js';
import {ogImage} from './filters/og-image.js';
import {readingTime} from './filters/reading-time.js';
import {shuffle} from './filters/shuffle.js';
import {slugifyString, postSlug} from './filters/slugify.js';
import {sortAlphabetically} from './filters/sort-alphabetic.js';
import {sortKeys} from './filters/sort-keys.js';
import {splitStrings} from './filters/split-strings.js';
import {splitlines} from './filters/splitlines.js';
import {starRating} from './filters/starRating.js';
import {striptags} from './filters/striptags.js';

export default {
  groupBy,
  groupByYear,
  groupByMonth,
  groupByYearMonth,
  sortKeys,
  toISOString,
  toRfc822Date,
  formatDate,
  readableDate,
  sortByDate,
  filterByYear,
  filterByMediaType,
  relativeDate,
  limit,
  markdownFormat,
  markdownify: markdownFormat,
  ogImage,
  readingTime,
  splitlines,
  striptags,
  shuffle,
  sortAlphabetically,
  splitStrings,
  slugify: slugifyString,
  slugifyString,
  postSlug,
  getPostsByTag,
  lazyPaginate,
  lazyGroupByYear,
  lazyGroupByWatchedYear,
  starRating
};
