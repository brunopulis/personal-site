/**
 * Most adjustments must be made in `./src/_config/*`
 *
 * Hint VS Code for eleventyConfig autocompletion.
 * © Henry Desroches - https://gist.github.com/xdesro/69583b25d281d055cd12b144381123bf
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig -
 * @returns {Object} -
 */

import dotenv from 'dotenv';
dotenv.config();

import {DateTime} from 'luxon';
import pluginRss from '@11ty/eleventy-plugin-rss';
import filters, {formatNumber} from './src/_config/filters.js';
import plugins from './src/_config/plugins.js';
import shortcodes from './src/_config/shortcodes.js';
import tagColors from './src/_data/tagColors.json' with {type: 'json'};
import blogroll from './src/_data/blogroll.json' with {type: 'json'};

import {
  getAllPosts,
  getAllNewsletters,
  getAllBooks,
  getAllLikes,
  getAllMovies,
  getAllShows,
  getAllGames,
  getAllNotes,
  getAllPoetry,
  getAllTags,
  getWatchingYears,
  showInSitemap
} from './src/_config/collections.js';

import {groupBy} from './src/_config/filters/groupBy.js';

export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  // Filters
  eleventyConfig.addFilter('toIsoString', filters.toISOString);

  eleventyConfig.addFilter('localPoster', (url) => {
    if (!url || !url.includes('image.tmdb.org')) return url;
    const filename = url.split('/').pop();
    return `/assets/images/posters/${filename}`;
  });
  eleventyConfig.addFilter('formatDate', filters.formatDate);
  eleventyConfig.addFilter('markdownFormat', filters.markdownFormat);
  eleventyConfig.addFilter('splitlines', filters.splitlines);
  eleventyConfig.addFilter('striptags', filters.striptags);
  eleventyConfig.addFilter('shuffle', filters.shuffleArray);
  eleventyConfig.addFilter('alphabetic', filters.sortAlphabetically);
  eleventyConfig.addFilter('slugify', filters.slugifyString);
  eleventyConfig.addFilter('where', filters.where);
  eleventyConfig.addFilter('keys', filters.keys);
  eleventyConfig.addFilter('concat', filters.concat);
  eleventyConfig.addFilter('groupBy', groupBy);
  eleventyConfig.addFilter('booksByYear', filters.booksByYear);
  eleventyConfig.addFilter('moviesByYear', filters.moviesByYear);
  eleventyConfig.addFilter('filterFavorites', (items) => filters.filterFavorites(items));
  eleventyConfig.addFilter('filterNonFavorites', (items) => filters.filterNonFavorites(items));
  eleventyConfig.addFilter('groupByYear', (items) => filters.groupByYear(items));
  eleventyConfig.addFilter('filterByYear', (items, year) => filters.filterByYear(items, year));
  eleventyConfig.addFilter('showsByYear', filters.showsByYear);
  eleventyConfig.addFilter('showsByStatusAndYear', filters.showsByStatusAndYear);
  eleventyConfig.addFilter('showsByYearAndStatus', filters.showsByYearAndStatus);
  eleventyConfig.addFilter('gamesByYear', filters.gamesByYear);
  eleventyConfig.addFilter('formatNumber', formatNumber);

  eleventyConfig.addFilter('limit', (arr, n) => {
    if (!Array.isArray(arr)) return arr;
    return arr.slice(0, n);
  });

  eleventyConfig.addFilter('renderTransforms', filters.renderTransforms);
  eleventyConfig.addFilter('lastModified', filters.lastModified);

  eleventyConfig.addFilter('toRfc822Date', dateObj => {
    try {
      return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('EEE, dd LLL yyyy HH:mm:ss Z');
    } catch {
      return '';
    }
  });

  eleventyConfig.addFilter('json', (value, spaces = 0) => {
    try {
      return JSON.stringify(value, null, spaces);
    } catch {
      return 'null';
    }
  });

  eleventyConfig.addFilter('readableDate', dateObj => {
    try {
      return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('LLLL d, yyyy');
    } catch {
      return '';
    }
  });

  eleventyConfig.addFilter('htmlDateString', dateObj => {
    try {
      return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
    } catch {
      return '';
    }
  });

  eleventyConfig.addFilter('readingTime', content => {
    if (!content || typeof content !== 'string') return 1;
    const words = (content.trim().match(/\S+/g) || []).length;
    const minutes = Math.ceil(words / 200);
    return Math.max(1, minutes);
  });

  eleventyConfig.addFilter('tagColor', tag => {
    if (!tag) return '#6b7280';
    const key = String(tag).toLowerCase();
    if (tagColors[key]) return tagColors[key];
    const str = key;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash * 31 + str.charCodeAt(i)) >>> 0;
    }
    const hue = hash % 360;
    const sat = 65;
    const light = 45;
    const h = hue / 360;
    const s = sat / 100;
    const l = light / 100;
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = x => {
      const v = Math.round(x * 255);
      return (v < 16 ? '0' : '') + v.toString(16);
    };
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  });

  eleventyConfig.addFilter('head', (arr, n) => {
    if (!Array.isArray(arr)) return arr;
    if (n < 0) {
      return arr.slice(n);
    }
    return arr.slice(0, n);
  });

  eleventyConfig.addFilter('htmlToAbsoluteUrls', (html, base) => {
    if (!html || !base) return html || '';
    const joinUrl = (b, p) => b.replace(/\/+$/, '') + '/' + String(p).replace(/^\/+/, '');
    return String(html).replace(/(href|src)="(\/[^"]*)"/g, (m, attr, url) => {
      return `${attr}="${joinUrl(base, url)}"`;
    });
  });

  // addPassthroughCopy
  eleventyConfig.addPassthroughCopy({'src/assets': 'assets'});
  eleventyConfig.addPassthroughCopy({'src/feeds/pretty-feed-v3.xsl': 'feeds/pretty-feed-v3.xsl'});
  eleventyConfig.addPassthroughCopy({'src/manifest.webmanifest': 'manifest.webmanifest'});
  eleventyConfig.addPassthroughCopy({'src/sw.js': 'sw.js'});
  eleventyConfig.addPassthroughCopy({api: 'api'});

  // Plugins
  eleventyConfig.addPlugin(plugins.htmlConfig);
  eleventyConfig.addPlugin(plugins.drafts);

  eleventyConfig.addPlugin(plugins.EleventyRenderPlugin);
  eleventyConfig.addPlugin(plugins.rss);
  eleventyConfig.addPlugin(plugins.syntaxHighlight);

  eleventyConfig.addPlugin(plugins.webc, {
    components: ['./src/_includes/webc/**/*.webc'],
    useTransform: true
  });

  eleventyConfig.addPlugin(plugins.eleventyImageTransformPlugin, {
    formats: ['avif', 'webp', 'jpeg'],
    widths: [650, 960, 1400],
    htmlOptions: {
      imgAttributes: {
        loading: 'lazy',
        decoding: 'async'
      },
      pictureAttributes: {}
    },
    cacheOptions: {
      duration: '30d'
    },
    fetchOptions: {
      timeout: 60000
    }
  });

  // Collections
  eleventyConfig.addCollection('posts', getAllPosts);
  eleventyConfig.addCollection('newsletters', getAllNewsletters);
  eleventyConfig.addCollection('books', getAllBooks);
  eleventyConfig.addCollection('likes', getAllLikes);
  eleventyConfig.addCollection('movies', getAllMovies);
  eleventyConfig.addCollection('shows', getAllShows);
  eleventyConfig.addCollection('games', getAllGames);
  eleventyConfig.addCollection('notes', getAllNotes);
  eleventyConfig.addCollection('poetry', getAllPoetry);
  eleventyConfig.addCollection('tagList', getAllTags);
  eleventyConfig.addCollection('watchingYears', getWatchingYears);

  eleventyConfig.addCollection('bookmarks', collectionApi => {
    return collectionApi
      .getFilteredByGlob('src/content/bookmarks/**/*.md')
      .sort((a, b) => (a.date > b.date ? -1 : 1));
  });
  eleventyConfig.addCollection('showInSitemap', showInSitemap);

  eleventyConfig.addCollection('searchIndex', collectionApi => {
    const posts = collectionApi
      .getFilteredByGlob('src/blog/**/*.md')
      .sort((a, b) => (a.date > b.date ? -1 : 1));

    return posts.map(p => ({
      id: p.url,
      title: (p.data && p.data.title) || '',
      description: (p.data && p.data.description) || '',
      tags: Array.isArray(p.data?.tags) ? p.data.tags : [],
      content: '',
      date: p.date
    }));
  });

  eleventyConfig.addCollection('blogrollCategories', () => {
    const categories = [...new Set(blogroll.map(item => item.category))];
    return categories.sort();
  });

  // Library and Data
  eleventyConfig.setLibrary('md', plugins.markdownLib);
  eleventyConfig.addDataExtension('yaml', contents => yaml.load(contents));

  // Shortcodes
  eleventyConfig.addShortcode('svg', shortcodes.svgShortcode);
  eleventyConfig.addShortcode('image', shortcodes.imageShortcode);
  eleventyConfig.addShortcode('imageKeys', shortcodes.imageKeysShortcode);
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode('groupBooksByYear', shortcodes.groupBooksByYear);

  // General Settings
  return {
    markdownTemplateEngine: 'njk',

    dir: {
      output: '_site',
      input: 'src',
      includes: '_includes',
      layouts: '_layouts'
    }
  };
}
