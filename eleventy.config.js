import path from 'node:path';
import dotenv from 'dotenv';
dotenv.config();

// add yaml support
import yaml from 'js-yaml';

//  config import
import * as collections from "./src/_config/collections.js";
import * as customFilters from './src/_config/filters.js';
import events from './src/_config/events.js';
import plugins from './src/_config/plugins.js';
import shortcodes from './src/_config/shortcodes.js';

export default async function (eleventyConfig) {
  //  Events: before build
  eleventyConfig.on('eleventy.before', async () => {
    await events.buildAllCss();
    await events.buildAllJs();
  });

  //  custom watch targets
  eleventyConfig.addWatchTarget('./src/assets/**/*.{css,js,svg,png,jpeg}');
  eleventyConfig.addWatchTarget('./src/_includes/**/*.{webc}');

  //  layout aliases
  eleventyConfig.addLayoutAlias('base', 'base/base.njk');
  eleventyConfig.addLayoutAlias('page', 'base/page.njk');
  eleventyConfig.addLayoutAlias('post', 'base/post.njk');
  eleventyConfig.addLayoutAlias('tags', 'base/tags.njk');
  eleventyConfig.addLayoutAlias('error', 'base/error.njk');

  eleventyConfig.addLayoutAlias('home', 'pages/home.njk');
  eleventyConfig.addLayoutAlias('about', 'pages/about.njk');
  eleventyConfig.addLayoutAlias('services', 'pages/services.njk');
  eleventyConfig.addLayoutAlias('projects', 'pages/projects.njk');
  eleventyConfig.addLayoutAlias('blog', 'pages/blog.njk');

  // Collections
  eleventyConfig.addCollection("blog_pt_br", c => collections.postsByLang(c, "pt-br"));
  eleventyConfig.addCollection("blog_en",    c => collections.postsByLang(c, "en"));
  eleventyConfig.addCollection("stream_pt_br", c => collections.streamByLang(c, "pt-br"));
  eleventyConfig.addCollection("stream_en",    c => collections.streamByLang(c, "en"));

  // Wrappers genéricos (já juntam pt‑BR + EN)
  eleventyConfig.addCollection("allPosts",   collections.allPosts);
  eleventyConfig.addCollection("allStreams", collections.allStreams);

  // Outras collections auxiliares
  eleventyConfig.addCollection("showInSitemap", collections.showInSitemap);
  eleventyConfig.addCollection("tagList", collections.tagList);

  // ⭐ REGISTRAR funções globais Nunjucks
  eleventyConfig.addNunjucksGlobal("localizedPath", customFilters.localizedPath);
  
  // ⭐ REGISTRAR filtro t de tradução
  eleventyConfig.addFilter("t", customFilters.t);

  //   Plugins
  eleventyConfig.addPlugin(plugins.htmlConfig);
  eleventyConfig.addPlugin(plugins.drafts);
  eleventyConfig.addPlugin(plugins.EleventyRenderPlugin);
  eleventyConfig.addPlugin(plugins.rss);
  eleventyConfig.addPlugin(plugins.syntaxHighlight);
  eleventyConfig.addPlugin(plugins.webc, {
    components: ["./src/_includes/webc/*.webc"],
    useTransform: true
  });
  eleventyConfig.addPlugin(plugins.eleventyImageTransformPlugin, {
    formats: ["webp", "jpeg"],
    widths: ["auto"],
    htmlOptions: {
      imgAttributes: {
        loading: "lazy",
        decoding: "async",
        sizes: "auto"
      },
      pictureAttributes: {}
    },
    cacheOptions: {
      duration: "1d",
      directory: ".cache",
      removeUrlQueryParams: false
    }
  });
  eleventyConfig.addPlugin(plugins.EleventyI18nPlugin, {
    defaultLanguage: "pt-br",
    errorMode: "allow-fallback"
  });

  //   bundle
  eleventyConfig.addBundle("css", { hoist: true });

  // 	 Library and Data
  eleventyConfig.setLibrary("md", plugins.markdownLib);
  eleventyConfig.addDataExtension('yaml', contents => yaml.load(contents));

  //  Filters
  Object.entries(customFilters).forEach(([name, fn]) => {
    // 1️⃣ Não registrar filtros que não são funções
    if (typeof fn !== "function") {
      console.warn(`⚠️  Ignorando filtro "${name}" porque não é uma função (valor: ${fn})`);
      return;
    }

    // 2️⃣ Proteger filtros universais do Eleventy
    const universal = ["where", "first", "last", "reverse", "sort"];
    if (universal.includes(name)) {
      console.warn(`⚠️  Ignorando filtro customizado "${name}" para preservar o filtro universal do Eleventy.`);
      return;
    }

    // 3️⃣ Aviso de colisão (caso ainda exista algum outro filtro com o mesmo nome)
    if (eleventyConfig.getFilter(name)) {
      console.warn(`⚠️  Filtro "${name}" já existe – será sobrescrito. Verifique se não está substituindo um filtro universal.`);
    }

    // 4️⃣ Registra o filtro
    eleventyConfig.addFilter(name, fn);
  });

  //  Shortcodes
  eleventyConfig.addPairedShortcode("asideInfo", shortcodes.asideInfo);
  eleventyConfig.addPairedShortcode("asideReadmore", shortcodes.asideReadmore);
  eleventyConfig.addShortcode("svg", shortcodes.svg);
  eleventyConfig.addShortcode("image", shortcodes.image);
  eleventyConfig.addShortcode("imageKeys", shortcodes.imageKeys);
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  //  Events: after build
  if (process.env.ELEVENTY_RUN_MODE === "serve") {
    eleventyConfig.on("eleventy.after", async () => {
      await events.svgToJpeg();
    });
  }

  eleventyConfig.on('eleventy.after', events.tableSawWrapper);

  //  Passthrough File Copy

  // -- same path
  [
    "src/assets/fonts/",
    "src/assets/sounds",
    "src/assets/images/template",
    "src/assets/og-images"
  ].forEach(p => eleventyConfig.addPassthroughCopy(p));

  eleventyConfig.addPassthroughCopy({
    "src/assets/images/favicon/*": "/",
    "node_modules/lite-youtube-embed/src/lite-yt-embed.{css,js}":
      "assets/components/",
    "node_modules/@zachleat/table-saw/table-saw.js":
      "assets/components/table-saw.js"
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