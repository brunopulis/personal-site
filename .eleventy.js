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
import filters from './src/_config/filters.js';
import tagColors from './src/_data/tagColors.json' with {type: 'json'};
import blogroll from './src/_data/blogroll.json' with {type: 'json'};

import {
  getAllPosts,
  getAllBooks,
  getAllNotes,
  getAllPoetry,
  showInSitemap,
  allTags
} from './src/_config/collections.js';

export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  // Filters
  eleventyConfig.addFilter('toIsoString', filters.toISOString);
  eleventyConfig.addFilter('formatDate', filters.formatDate);
  eleventyConfig.addFilter('markdownFormat', filters.markdownFormat);
  eleventyConfig.addFilter('splitlines', filters.splitlines);
  eleventyConfig.addFilter('striptags', filters.striptags);
  eleventyConfig.addFilter('shuffle', filters.shuffleArray);
  eleventyConfig.addFilter('alphabetic', filters.sortAlphabetically);
  eleventyConfig.addFilter('slugify', filters.slugifyString);

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

  // Collections
  eleventyConfig.addCollection('posts', getAllPosts);
  eleventyConfig.addCollection('books', getAllBooks);
  eleventyConfig.addCollection('notes', getAllNotes);
  eleventyConfig.addCollection('poetry', getAllPoetry);
  eleventyConfig.addCollection('medias', collectionApi => {
    return collectionApi
      .getFilteredByGlob('src/content/medias/**/*.md')
      .sort((a, b) => (a.date > b.date ? -1 : 1));
  });
  eleventyConfig.addCollection('bookmarks', collectionApi => {
    return collectionApi
      .getFilteredByGlob('src/content/bookmarks/**/*.md')
      .sort((a, b) => (a.date > b.date ? -1 : 1));
  });
  eleventyConfig.addCollection('showInSitemap', showInSitemap);
  eleventyConfig.addCollection('tagList', allTags);

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
