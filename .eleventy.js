/**
 * Most adjustments must be made in `./src/_config/*`
 *
 * Hint VS Code for eleventyConfig autocompletion.
 * © Henry Desroches - https://gist.github.com/xdesro/69583b25d281d055cd12b144381123bf
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig -
 * @returns {Object} -
 */

import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';
dotenv.config();

import {DateTime} from 'luxon';
import pluginRss from '@11ty/eleventy-plugin-rss';
import filters, {formatNumber} from './src/_config/filters.js';
import plugins from './src/_config/plugins.js';
import shortcodes from './src/_config/shortcodes.js';
import blogroll from './src/_data/blogroll.json' with {type: 'json'};
import {svgToJpeg} from './src/_config/events/svg-to-jpeg.js';
import {toSlug} from './src/_data/tags-helpers.js';

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
  getWatchingYears,
  showInSitemap
} from './src/_config/collections.js';

import {groupBy} from './src/_config/filters/groupBy.js';

export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);

  // Filters
  eleventyConfig.addFilter('toIsoString', filters.toISOString);

  eleventyConfig.addFilter('localPoster', url => {
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
  eleventyConfig.addFilter('startsWith', filters.startsWith);
  eleventyConfig.addFilter('where', filters.where);
  eleventyConfig.addFilter('keys', filters.keys);
  eleventyConfig.addFilter('concat', filters.concat);
  eleventyConfig.addFilter('groupBy', groupBy);
  eleventyConfig.addFilter('booksByYear', filters.booksByYear);
  eleventyConfig.addFilter('moviesByYear', filters.moviesByYear);
  eleventyConfig.addFilter('filterFavorites', items => filters.filterFavorites(items));
  eleventyConfig.addFilter('filterNonFavorites', items => filters.filterNonFavorites(items));
  eleventyConfig.addFilter('groupByYear', items => filters.groupByYear(items));
  eleventyConfig.addFilter('filterByYear', (items, year) => filters.filterByYear(items, year));
  eleventyConfig.addFilter('showsByYear', filters.showsByYear);
  eleventyConfig.addFilter('showsByStatusAndYear', filters.showsByStatusAndYear);
  eleventyConfig.addFilter('showsByYearAndStatus', filters.showsByYearAndStatus);
  eleventyConfig.addFilter('gamesByYear', filters.gamesByYear);
  eleventyConfig.addFilter('formatNumber', formatNumber);

  eleventyConfig.addFilter('sortByDate', filters.sortByDate);

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
      if (typeof dateObj === 'string') {
        return DateTime.fromISO(dateObj, {zone: 'utc'}).toFormat('LLLL d, yyyy');
      }
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

  eleventyConfig.addFilter('xmlEscape', text => {
    if (!text || typeof text !== 'string') return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  });

  eleventyConfig.addFilter('hasCode', content => {
    if (!content || typeof content !== 'string') return false;
    return /<pre(?:\s[^>]*)?>/i.test(content);
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

  // addPassthroughCopy — selective, not the entire src/assets/
  eleventyConfig.addPassthroughCopy({'src/assets/css/build.css': 'assets/css/build.css'});
  eleventyConfig.addPassthroughCopy({'src/assets/js': 'assets/js'});
  eleventyConfig.addPassthroughCopy({'src/assets/images': 'assets/images'});
  eleventyConfig.addPassthroughCopy({'src/assets/og-images': 'assets/og-images'});
  eleventyConfig.addPassthroughCopy({'src/assets/favicon.svg': 'assets/favicon.svg'});
  eleventyConfig.addPassthroughCopy({'src/assets/favicon-32x32.png': 'assets/favicon-32x32.png'});
  eleventyConfig.addPassthroughCopy({'src/assets/favicon-16x16.png': 'assets/favicon-16x16.png'});
  eleventyConfig.addPassthroughCopy({'src/assets/apple-touch-icon.png': 'assets/apple-touch-icon.png'});
  eleventyConfig.addPassthroughCopy({'src/assets/og-default.png': 'assets/og-default.png'});
  eleventyConfig.addPassthroughCopy({'src/assets/files': 'assets/files'});
  eleventyConfig.addPassthroughCopy({'src/feeds/pretty-feed-v3.xsl': 'feeds/pretty-feed-v3.xsl'});

  eleventyConfig.addPassthroughCopy({api: 'api'});
  eleventyConfig.addPassthroughCopy({'src/.well-known': '.well-known'});

  // Plugins
  eleventyConfig.addPlugin(plugins.htmlConfig);
  eleventyConfig.addPlugin(plugins.drafts);

  eleventyConfig.addPlugin(plugins.EleventyRenderPlugin);
  eleventyConfig.addPlugin(plugins.rss);
  eleventyConfig.addPlugin(plugins.syntaxHighlight);

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
  eleventyConfig.addCollection('watchingYears', getWatchingYears);

  eleventyConfig.addCollection('bookmarks', collectionApi => {
    return collectionApi
      .getFilteredByGlob('src/content/bookmarks/**/*.md')
      .sort((a, b) => (a.date > b.date ? -1 : 1));
  });
  eleventyConfig.addCollection('showInSitemap', showInSitemap);

  eleventyConfig.addCollection('blogrollCategories', () => {
    const categories = [...new Set(blogroll.map(item => item.category))];
    return categories.sort();
  });

  eleventyConfig.addCollection('catpages', function (collectionApi) {
    const posts = collectionApi.getFilteredByGlob('src/content/posts/**/*.md');
    const map = new Map();
    for (const post of posts) {
      const cat = post.data.category;
      if (!cat) continue;
      const slug = toSlug(cat);
      if (!map.has(slug)) {
        map.set(slug, {name: cat, slug, count: 0});
      }
      map.get(slug).count++;
    }
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  });

  // Library and Data
  eleventyConfig.setLibrary('md', plugins.markdownLib);
  // Shortcodes
  eleventyConfig.addShortcode('svg', shortcodes.svgShortcode);
  eleventyConfig.addShortcode('image', shortcodes.imageShortcode);
  eleventyConfig.addShortcode('imageKeys', shortcodes.imageKeysShortcode);
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);
  eleventyConfig.addShortcode('groupBooksByYear', shortcodes.groupBooksByYear);

  // Events: after build (convert OG SVG to JPEG)
  if (process.env.ELEVENTY_RUN_MODE === 'serve') {
    eleventyConfig.on('eleventy.after', svgToJpeg);
  }

  // Dev server: serve API routes locally (Vercel serverless proxy)
  if (process.env.ELEVENTY_RUN_MODE === 'serve') {
    eleventyConfig.setServerOptions({
      middleware: [guestbookApiHandler]
    });
  }

  // General Settings
  return {
    markdownTemplateEngine: 'njk',

    dir: {
      output: '_site',
      input: 'src',
      includes: '_includes',
      layouts: '_layouts'
    },

    useGitIgnore: false
  };
}

function guestbookApiHandler(req, res, next) {
  const DATA_FILE = path.resolve('src/_data/guestbook.json');

  if (req.url === '/api/guestbook') {
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
      return res.end();
    }

    if (req.method === 'GET') {
      try {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        const messages = (data.messages || [])
          .slice()
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        res.writeHead(200, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify({messages}));
      } catch {
        res.writeHead(200, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify({messages: []}));
      }
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => (body += chunk));
      req.on('end', () => {
        try {
          const {name, message, honeypot} = JSON.parse(body);

          if (honeypot) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify({error: 'Spam detected'}));
          }

          if (!name || !message) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify({error: 'Nome e mensagem são obrigatórios'}));
          }

          if (name.length > 100 || message.length > 2000) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify({error: 'Nome ou mensagem muito longos'}));
          }

          const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
          const newMessage = {
            id: Date.now().toString(36) + Math.random().toString(36).substring(2),
            name: name.trim().replace(/[&<>"']/g, ''),
            message: message.trim().replace(/[&<>"']/g, ''),
            timestamp: new Date().toISOString()
          };

          data.messages.push(newMessage);
          fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

          res.writeHead(201, {'Content-Type': 'application/json'});
          return res.end(JSON.stringify({success: true, message: newMessage}));
        } catch {
          res.writeHead(500, {'Content-Type': 'application/json'});
          return res.end(JSON.stringify({error: 'Erro ao salvar mensagem'}));
        }
      });
      return;
    }
  }

  next();
}
