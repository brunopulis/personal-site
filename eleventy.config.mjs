import dotenv from 'dotenv';

dotenv.config();

import yaml from 'js-yaml';

import * as collections from './src/_config/collections.js';
import events from './src/_config/events.js';
import * as customFilters from './src/_config/filters.js';
import plugins from './src/_config/plugins.js';
import { badge, image, imageKeys } from './src/_config/shortcodes/image.js';
import { lucide } from './src/_config/shortcodes/lucide.js';
import { svg } from './src/_config/shortcodes/svg.js';

export default async function eleventy(eleventyConfig) {
  eleventyConfig.addGlobalData('now', new Date());

  eleventyConfig.addWatchTarget('./src/assets/**/*.{css,js,svg,png,jpeg}');
  eleventyConfig.addWatchTarget('./src/_includes/**/*.{webc}');

  //  layout aliases
  eleventyConfig.addLayoutAlias('base', 'base.njk');
  eleventyConfig.addLayoutAlias('page', 'page.njk');
  eleventyConfig.addLayoutAlias('post', 'post.njk');
  eleventyConfig.addLayoutAlias('poem', 'poem.njk');

  eleventyConfig.addCollection('posts', collections.posts);
  eleventyConfig.addCollection('poems', collections.poems);
  eleventyConfig.addCollection('notes', collections.notes);
  eleventyConfig.addCollection('books', collections.books);
  eleventyConfig.addCollection('newsletters', collections.newsletters);
  eleventyConfig.addCollection('medias', collections.medias);
  eleventyConfig.addCollection('games', collections.games);
  eleventyConfig.addCollection('bookmarks', collections.bookmarks);

  eleventyConfig.addCollection('showInSitemap', collections.showInSitemap);

  //   Plugins
  eleventyConfig.addPlugin(plugins.htmlConfig);
  eleventyConfig.addPlugin(plugins.drafts);
  eleventyConfig.addPlugin(plugins.EleventyRenderPlugin);
  eleventyConfig.addPlugin(plugins.rss);
  eleventyConfig.addPlugin(plugins.syntaxHighlight);
  eleventyConfig.addPlugin(plugins.webc, {
    components: ['./src/_includes/webc/*.webc'],
    useTransform: true,
  });
  eleventyConfig.addPlugin(plugins.webmentions);

  eleventyConfig.setLibrary('md', plugins.markdownLib);
  eleventyConfig.addDataExtension('yaml', contents => yaml.load(contents));

  Object.entries(customFilters).forEach(([name, fn]) => {
    if (typeof fn !== 'function') {
      console.warn(`⚠️  Ignorando filtro "${name}" porque não é uma função (valor: ${fn})`);
      return;
    }
    const universal = ['where', 'first', 'last', 'reverse', 'sort'];
    if (universal.includes(name)) {
      console.warn(
        `⚠️  Ignorando filtro customizado "${name}" para preservar o filtro universal do Eleventy.`
      );
      return;
    }

    if (eleventyConfig.getFilter(name)) {
      console.warn(
        `⚠️  Filtro "${name}" já existe – será sobrescrito. Verifique se não está substituindo um filtro universal.`
      );
    }

    eleventyConfig.addFilter(name, fn);
  });

  //  Shortcodes
  eleventyConfig.addNunjucksAsyncShortcode('svg', svg);
  eleventyConfig.addNunjucksAsyncShortcode('badge', badge);
  eleventyConfig.addNunjucksAsyncShortcode('image', image);
  eleventyConfig.addNunjucksAsyncShortcode('imageKeys', imageKeys);
  eleventyConfig.addShortcode('lucide', lucide);
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);

  //  Events
  eleventyConfig.on('eleventy.before', events.buildAllCss);

  //  Events: after build
  if (process.env.ELEVENTY_RUN_MODE === 'serve') {
    eleventyConfig.on('eleventy.after', async () => {
      await events.svgToJpeg();
    });
  }

  eleventyConfig.on('eleventy.after', events.tableSawWrapper);

  eleventyConfig.addPassthroughCopy('./admin');
  eleventyConfig.addPassthroughCopy('src/humans.txt');
  eleventyConfig.addPassthroughCopy({
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
  });
  eleventyConfig.addPassthroughCopy('src/feeds/pretty-feed-v3.xsl');

  eleventyConfig.addPassthroughCopy({ 'src/manifest.webmanifest': 'manifest.webmanifest' });
  eleventyConfig.addPassthroughCopy({ 'src/sw.js': 'sw.js' });

  eleventyConfig.addPassthroughCopy({
    'node_modules/@11ty/is-land/is-land.js': 'assets/scripts/is-land.js',
    'node_modules/lite-youtube-embed/src/lite-yt-embed.{css,js}': 'assets/components/',
    'node_modules/@zachleat/table-saw/table-saw.js': 'assets/components/table-saw.js',
  });

  eleventyConfig.setDataDeepMerge(true);

  return {
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: '_site',
      layouts: '_layouts',
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    templateFormats: ['njk', 'md', 'html'],
  };
}
