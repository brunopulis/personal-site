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

// add yaml support
import {load as yamlLoad} from 'js-yaml';

import {
  getAllPosts,
  getAllNewsletters,
  getAllBooks,
  getAllFeed,
  blogrollCategories,
  getAllLikes,
  getAllMovies,
  getAllShows,
  getAllNotes,
  getAllPoetry,
  getWatchingYears
} from './src/_config/collections.js';

import events from './src/_config/events.js';
import filters, {formatNumber} from './src/_config/filters.js';
import plugins from './src/_config/plugins.js';
import shortcodes from './src/_config/shortcodes.js';

import blogroll from './src/_data/blogroll.json' with {type: 'json'};
import {svgToJpeg} from './src/_config/events/svg-to-jpeg.js';

export default async function (eleventyConfig) {
  eleventyConfig.on('eleventy.before', async () => {
    // sass --watch (dev:css) handles CSS compilation in dev mode;
    // build scripts handle it in production.
    if (process.env.ELEVENTY_RUN_MODE !== 'serve') {
      await events.buildAllCss();
    }
  });

  eleventyConfig.addWatchTarget('./src/assets/**/*.{css,js,svg,png,jpeg}');
  eleventyConfig.addWatchTarget('./src/_includes/**/*.{webc}');

  // Layout alias
  eleventyConfig.addLayoutAlias('base', 'base.njk');
  eleventyConfig.addLayoutAlias('book', 'book.njk');
  eleventyConfig.addLayoutAlias('note', 'note.njk');
  eleventyConfig.addLayoutAlias('page', 'page.njk');
  eleventyConfig.addLayoutAlias('poetry', 'poetry.njk');
  eleventyConfig.addLayoutAlias('watching', 'watching.njk');

  // Collections
  eleventyConfig.addCollection('posts', getAllPosts);
  eleventyConfig.addCollection('newsletters', getAllNewsletters);
  eleventyConfig.addCollection('books', getAllBooks);
  eleventyConfig.addCollection('likes', getAllLikes);
  eleventyConfig.addCollection('movies', getAllMovies);
  eleventyConfig.addCollection('shows', getAllShows);
  eleventyConfig.addCollection('notes', getAllNotes);
  eleventyConfig.addCollection('poetry', getAllPoetry);
  eleventyConfig.addCollection('watchingYears', getWatchingYears);
  eleventyConfig.addCollection('allFeed', getAllFeed);
  eleventyConfig.addCollection('blogrollCategories', blogrollCategories);

  // Plugins
  eleventyConfig.addPlugin(plugins.htmlConfig);
  eleventyConfig.addPlugin(plugins.drafts);

  eleventyConfig.addPlugin(plugins.EleventyRenderPlugin);
  eleventyConfig.addPlugin(plugins.rss);
  eleventyConfig.addPlugin(plugins.syntaxHighlight);
  eleventyConfig.addPlugin(plugins.eleventyImageTransformPlugin, {
    formats: ['avif', 'webp', 'jpeg'],
    widths: ['auto'],
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

  // Bundle
  eleventyConfig.addBundle('css', {hoist: true});
  eleventyConfig.addBundle('js', {hoist: true});

  // Library and data
  eleventyConfig.setLibrary('md', plugins.markdownLib);
  eleventyConfig.addDataExtension('yaml', contents => yamlLoad(contents));

  // Filters
  eleventyConfig.addFilter('localPoster', filters.localPoster);
  eleventyConfig.addFilter('formatDate', filters.formatDate);
  eleventyConfig.addFilter('splitlines', filters.splitlines);
  eleventyConfig.addFilter('striptags', filters.striptags);
  eleventyConfig.addFilter('slugify', filters.slugifyString);
  eleventyConfig.addFilter('startsWith', filters.startsWith);
  eleventyConfig.addFilter('where', filters.where);
  eleventyConfig.addFilter('concat', filters.concat);
  eleventyConfig.addFilter('booksByYear', filters.booksByYear);
  eleventyConfig.addFilter('bookCategories', filters.bookCategories);
  eleventyConfig.addFilter('currentlyReading', books => filters.currentlyReading(books));
  eleventyConfig.addFilter('moviesByYear', filters.moviesByYear);
  eleventyConfig.addFilter('filterFavorites', items => filters.filterFavorites(items));
  eleventyConfig.addFilter('groupByYear', items => filters.groupByYear(items));
  eleventyConfig.addFilter('filterByYear', (items, year) => filters.filterByYear(items, year));
  eleventyConfig.addFilter('showsByYear', filters.showsByYear);
  eleventyConfig.addFilter('formatNumber', formatNumber);
  eleventyConfig.addFilter('sortByDate', filters.sortByDate);
  eleventyConfig.addFilter('limit', filters.limit);
  eleventyConfig.addFilter('renderTransforms', filters.renderTransforms);
  eleventyConfig.addFilter('lastModified', filters.lastModified);
  eleventyConfig.addFilter('toRfc822Date', filters.toRfc822Date);
  eleventyConfig.addFilter('readableDate', filters.readableDate);
  eleventyConfig.addFilter('htmlDateString', filters.htmlDateString);
  eleventyConfig.addFilter('readingTime', filters.readingTime);
  eleventyConfig.addFilter('xmlEscape', filters.xmlEscape);
  eleventyConfig.addFilter('head', filters.head);
  eleventyConfig.addFilter('htmlToAbsoluteUrls', filters.htmlToAbsoluteUrls);

  // Shortcodes
  eleventyConfig.addShortcode('svg', shortcodes.svgShortcode);
  eleventyConfig.addShortcode('faIcon', shortcodes.faIconShortcode);
  eleventyConfig.addShortcode('groupBooksByYear', shortcodes.groupBooksByYear);

  // Events: after build
  if (process.env.ELEVENTY_RUN_MODE === 'serve') {
    eleventyConfig.on('eleventy.after', events.svgToJpeg);
  }

  // addPassthroughCopy — selective, not the entire src/assets/
  ['src/assets/fonts/', 'src/assets/og-images'].forEach(path => eleventyConfig.addPassthroughCopy(path));
  eleventyConfig.addPassthroughCopy({'src/assets/js': 'assets/js'});
  eleventyConfig.addPassthroughCopy({'src/assets/images': 'assets/images'});
  eleventyConfig.addPassthroughCopy({'src/assets/og-images': 'assets/og-images'});
  eleventyConfig.addPassthroughCopy({'src/assets/apple-touch-icon.png': 'assets/apple-touch-icon.png'});
  eleventyConfig.addPassthroughCopy({'src/assets/favicon*': 'assets/'});
  eleventyConfig.addPassthroughCopy({'src/assets/favicon.ico': 'favicon.ico'});
  eleventyConfig.addPassthroughCopy({'src/assets/og-default.png': 'assets/og-default.png'});
  eleventyConfig.addPassthroughCopy({'src/assets/files': 'assets/files'});
  eleventyConfig.addPassthroughCopy({'src/feeds/pretty-feed-v3.xsl': 'feeds/pretty-feed-v3.xsl'});

  eleventyConfig.addPassthroughCopy({'src/.well-known': '.well-known'});

  eleventyConfig.addPassthroughCopy({
    // -- node_modules
    'node_modules/lite-youtube-embed/src/lite-yt-embed.{css,js}': `assets/components/`
  });

  // General Settings
  return {
    markdownTemplateEngine: 'njk',

    dir: {
      output: '_site',
      input: 'src',
      data: '_data',
      includes: '_includes',
      layouts: '_layouts'
    },

    useGitIgnore: false
  };
}
