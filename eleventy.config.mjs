/**
 * Most adjustments must be made in `./src/_config/*`
 *
 * Hint VS Code for eleventyConfig autocompletion.
 * © Henry Desroches - https://gist.github.com/xdesro/69583b25d281d055cd12b144381123bf
 * @param {import("@11ty/eleventy/src/UserConfig")} eleventyConfig -
 * @returns {Object} -
 */

// register dotenv for process.env.* variables to pickup
import dotenv from 'dotenv';
dotenv.config();

import yaml from 'js-yaml';

import * as collections from './src/_config/collections.js';
import events from './src/_config/events.js';
import * as filters from './src/_config/filters.js';
import plugins from './src/_config/plugins.js';
import shortcodes from './src/_config/shortcodes.js';

export default async function eleventy(eleventyConfig) {
  eleventyConfig.addGlobalData('now', new Date());

  eleventyConfig.addWatchTarget('./src/assets/**/*.{css,js,svg,png,jpeg}');
  eleventyConfig.addWatchTarget('./src/_includes/**/*.{webc}');

  //  layout aliases
  eleventyConfig.addLayoutAlias('base', 'base.njk');
  eleventyConfig.addLayoutAlias('page', 'page.njk');
  eleventyConfig.addLayoutAlias('post', 'post.njk');
  eleventyConfig.addLayoutAlias('tags', 'tags.njk');
  eleventyConfig.addLayoutAlias('poem', 'poem.njk');

  // Collections
  eleventyConfig.addCollection('posts', collections.posts);
  eleventyConfig.addCollection('postYears', collections.postYears);
  eleventyConfig.addCollection('postsByYear', collections.getPostsByYear);

  eleventyConfig.addCollection('poems', collections.poems);
  eleventyConfig.addCollection('notes', collections.notes);
  eleventyConfig.addCollection('books', collections.books);
  eleventyConfig.addCollection('newsletters', collections.newsletters);
  eleventyConfig.addCollection('medias', collections.medias);
  eleventyConfig.addCollection('likes', collections.likes);
  eleventyConfig.addCollection('games', collections.games);
  eleventyConfig.addCollection('bookmarks', collections.bookmarks);

  eleventyConfig.addCollection('showInSitemap', collections.showInSitemap);
  eleventyConfig.addCollection('tagList', collections.tagList);

  //   Plugins
  eleventyConfig.addPlugin(plugins.htmlConfig);
  eleventyConfig.addPlugin(plugins.drafts);

  eleventyConfig.addPlugin(plugins.EleventyRenderPlugin);
  eleventyConfig.addPlugin(plugins.rss);

  eleventyConfig.addPlugin(plugins.webc, {
    components: ['./src/_includes/webc/*.webc'],
    useTransform: true
  });

  // Disabled due to external image rate limiting
  // eleventyConfig.addPlugin(plugins.eleventyImageTransformPlugin, {
  //   formats: ['webp', 'jpeg'],
  //   widths: ['auto'],
  //   htmlOptions: {
  //     imgAttributes: {
  //       loading: 'lazy',
  //       decoding: 'async'
  //     },
  //     pictureAttributes: {}
  //   }
  // });

  // bundle
  eleventyConfig.addBundle('css', {hoist: true});

  // Library and Data
  eleventyConfig.setLibrary('md', plugins.markdownLib);
  eleventyConfig.addDataExtension('yaml', contents => yaml.load(contents));

  // Filters
  eleventyConfig.addFilter('toISOString', filters.toISOString);
  eleventyConfig.addFilter('formatDate', filters.formatDate);
  eleventyConfig.addFilter('markdownFormat', filters.markdownFormat);
  eleventyConfig.addFilter('splitlines', filters.splitlines);
  eleventyConfig.addFilter('striptags', filters.striptags);
  eleventyConfig.addFilter('shuffle', filters.shuffle);
  eleventyConfig.addFilter('alphabetic', filters.sortAlphabetically);
  eleventyConfig.addFilter('slugify', filters.slugifyString);
  eleventyConfig.addFilter('slugifyString', filters.slugifyString);
  eleventyConfig.addFilter('limit', filters.limit);
  eleventyConfig.addFilter('dateToRfc822', filters.toRfc822Date);
  eleventyConfig.addFilter('toRfc822Date', filters.toRfc822Date);
  eleventyConfig.addFilter('groupByYear', filters.groupByYear);
  eleventyConfig.addFilter('groupByMonth', filters.groupByMonth);
  eleventyConfig.addFilter('groupByYearMonth', filters.groupByYearMonth);
  eleventyConfig.addFilter('groupBy', filters.groupBy);
  eleventyConfig.addFilter('filterByYear', filters.filterByYear);
  eleventyConfig.addFilter('filterByMediaType', filters.filterByMediaType);
  eleventyConfig.addFilter('relativeDate', filters.relativeDate);
  eleventyConfig.addFilter('readableDate', filters.readableDate);
  eleventyConfig.addFilter('sortByDate', filters.sortByDate);
  eleventyConfig.addFilter('categoryFilter', filters.categoryFilter);
  eleventyConfig.addFilter('getPostsByTag', filters.getPostsByTag);
  eleventyConfig.addFilter('starRating', filters.starRating);
  eleventyConfig.addFilter('readingTime', filters.readingTime);
  eleventyConfig.addFilter('ogImage', filters.ogImage);
  eleventyConfig.addFilter('splitStrings', filters.splitStrings);
  eleventyConfig.addFilter('sortKeys', filters.sortKeys);
  eleventyConfig.addFilter('lazyGroupByWatchedYear', filters.lazyGroupByWatchedYear);
  eleventyConfig.addFilter('lazyGroupByYear', filters.lazyGroupByYear);
  eleventyConfig.addFilter('lazyPaginate', filters.lazyPaginate);

  //  Shortcodes
  eleventyConfig.addShortcode('svg', shortcodes.svgShortcode);
  eleventyConfig.addShortcode('image', shortcodes.imageShortcode);
  eleventyConfig.addShortcode('imageKeys', shortcodes.imageKeysShortcode);
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);

  // Events: after build
  if (process.env.ELEVENTY_RUN_MODE === 'serve') {
    eleventyConfig.on('eleventy.after', events.svgToJpeg);
  }

  // Passthrough File Copy
  ['src/assets/fonts/', 'src/assets/images/template', 'src/assets/og-images'].forEach(path => {
    eleventyConfig.addPassthroughCopy(path);
  });

  eleventyConfig.addPassthroughCopy('src/humans.txt');
  eleventyConfig.addPassthroughCopy({
    // -- to root
    'src/assets/images/favicon/*': '/',

    'src/assets/css': 'assets/css',
    'src/assets/images': 'assets/images',
    'src/assets/fonts': 'assets/fonts',
    'src/assets/js': 'assets/js',
    'src/assets/svg': 'assets/svg',
    'src/assets/images/favicon/favicon.ico': 'favicon.ico',
    'src/assets/images/favicon/favicon.svg': 'favicon.svg',
    'src/assets/images/favicon/favicon-96x96.png': 'favicon-96x96.png',
    'src/assets/images/favicon/apple-touch-icon.png': 'apple-touch-icon.png',
    'src/assets/images/favicon/icon-192x192.png': 'icon-192x192.png',
    'src/assets/images/favicon/icon-512x512.png': 'icon-512x512.png',
    'src/.well-known': '.well-known',
    // -- node_modules
    'node_modules/lite-youtube-embed/src/lite-yt-embed.{css,js}': `assets/components/`
  });
  eleventyConfig.addPassthroughCopy('src/feeds/pretty-feed-v3.xsl');
  eleventyConfig.addPassthroughCopy({'src/manifest.webmanifest': 'manifest.webmanifest'});
  eleventyConfig.addPassthroughCopy({'src/sw.js': 'sw.js'});

  eleventyConfig.addPassthroughCopy({
    'node_modules/@11ty/is-land/is-land.js': 'assets/scripts/is-land.js',
    'node_modules/lite-youtube-embed/src/lite-yt-embed.{css,js}': 'assets/components/'
  });

  eleventyConfig.setDataDeepMerge(true);

  return {
    markdownTemplateEngine: 'njk',

    dir: {
      output: '_site',
      input: 'src',
      includes: '_includes',
      layouts: '_layouts',
      data: '_data'
    },

    templateFormats: ['njk', 'md', 'html']
  };
}
