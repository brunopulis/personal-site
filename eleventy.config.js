import dotenv from 'dotenv';
dotenv.config();

import yaml from 'js-yaml';

//  config import
import * as collections from './src/_config/collections.js';
import * as customFilters from './src/_config/filters.js';
import events from './src/_config/events.js';
import plugins from './src/_config/plugins.js';
import brokenLinksPlugin from 'eleventy-plugin-broken-links';
import shortcodes from './src/_config/shortcodes.js';
import {badge} from './src/_config/shortcodes/image.js';
import {image, imageKeys} from './src/_config/shortcodes/image.js';
import {svg} from './src/_config/shortcodes/svg.js';

export default async function (eleventyConfig) {
  //  custom watch targets
  eleventyConfig.addWatchTarget('./src/assets/**/*.{css,js,svg,png,jpeg}');
  eleventyConfig.addWatchTarget('./src/_includes/**/*.{webc}');

  //  layout aliases
  eleventyConfig.addLayoutAlias('base', 'base/base.njk');
  eleventyConfig.addLayoutAlias('page', 'base/page.njk');
  eleventyConfig.addLayoutAlias('post', 'base/post.njk');
  eleventyConfig.addLayoutAlias('tags', 'base/tags.njk');
  eleventyConfig.addLayoutAlias('error', 'base/error.njk');

  eleventyConfig.addLayoutAlias('about', 'pages/about.njk');
  eleventyConfig.addLayoutAlias('services', 'pages/services.njk');
  eleventyConfig.addLayoutAlias('servicesHub', 'pages/services-hub.njk');
  eleventyConfig.addLayoutAlias('projects', 'pages/projects.njk');
  eleventyConfig.addLayoutAlias('blog', 'pages/blog.njk');

  eleventyConfig.addCollection('posts', collections.posts);
  eleventyConfig.addCollection('notes', collections.notes);
  eleventyConfig.addCollection('books', collections.books);
  eleventyConfig.addCollection('media', collections.media);
  eleventyConfig.addCollection('bookmarks', collections.bookmarks);
  eleventyConfig.addCollection('streams', collections.streams);

  eleventyConfig.addCollection('showInSitemap', collections.showInSitemap);
  eleventyConfig.addCollection('tagList', collections.tagList);

  //   Plugins
  eleventyConfig.addPlugin(plugins.htmlConfig);
  eleventyConfig.addPlugin(plugins.drafts);
  eleventyConfig.addPlugin(plugins.EleventyRenderPlugin);
  eleventyConfig.addPlugin(plugins.rss);
  eleventyConfig.addPlugin(brokenLinksPlugin);
  eleventyConfig.addPlugin(plugins.syntaxHighlight);
  eleventyConfig.addPlugin(plugins.webc, {
    components: ['./src/_includes/webc/*.webc'],
    useTransform: true
  });

  //   Library and Data
  eleventyConfig.setLibrary('md', plugins.markdownLib);
  eleventyConfig.addDataExtension('yaml', contents => yaml.load(contents));

  //  Filters
  Object.entries(customFilters).forEach(([name, fn]) => {
    // 1️⃣ Não registrar filtros que não são funções
    if (typeof fn !== 'function') {
      console.warn(`⚠️  Ignorando filtro "${name}" porque não é uma função (valor: ${fn})`);
      return;
    }

    // 2️⃣ Proteger filtros universais do Eleventy
    const universal = ['where', 'first', 'last', 'reverse', 'sort'];
    if (universal.includes(name)) {
      console.warn(
        `⚠️  Ignorando filtro customizado "${name}" para preservar o filtro universal do Eleventy.`
      );
      return;
    }

    // 3️⃣ Aviso de colisão (caso ainda exista algum outro filtro com o mesmo nome)
    if (eleventyConfig.getFilter(name)) {
      console.warn(
        `⚠️  Filtro "${name}" já existe – será sobrescrito. Verifique se não está substituindo um filtro universal.`
      );
    }

    // 4️⃣ Registra o filtro
    eleventyConfig.addFilter(name, fn);
  });

  //  Shortcodes
  eleventyConfig.addNunjucksAsyncShortcode('svg', svg);
  eleventyConfig.addNunjucksAsyncShortcode('badge', badge);
  eleventyConfig.addNunjucksAsyncShortcode('image', image);
  eleventyConfig.addNunjucksAsyncShortcode('imageKeys', imageKeys);
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);

  //  Events: before build
  eleventyConfig.on('eleventy.before', async () => {
    await events.buildAllCss();
  });

  //  Events: after build
  if (process.env.ELEVENTY_RUN_MODE === 'serve') {
    eleventyConfig.on('eleventy.after', async () => {
      await events.svgToJpeg();
    });
  }

  eleventyConfig.on('eleventy.after', events.tableSawWrapper);

  //  Passthrough File Copy
  [
    'src/assets/fonts/',
    'src/assets/images/',
    'src/assets/images/template',
    'src/assets/og-images',
    'src/assets/images/badges'
  ].forEach(p => eleventyConfig.addPassthroughCopy(p));

  eleventyConfig.addPassthroughCopy({
    'src/assets/images/favicon/*': '/',
    'node_modules/lite-youtube-embed/src/lite-yt-embed.{css,js}': 'assets/components/',
    'node_modules/@zachleat/table-saw/table-saw.js': 'assets/components/table-saw.js'
  });

  //  Build Settings
  eleventyConfig.setDataDeepMerge(true);

  // -  ignore test files
  if (process.env.ELEVENTY_ENV != 'test') {
    eleventyConfig.ignores.add('src/common/pa11y.njk');
  }

  //  general config
  return {
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: 'dist',
      layouts: '_layouts'
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    templateFormats: ['njk', 'md', 'html']
  };
}
