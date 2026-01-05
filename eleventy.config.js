import dotenv from 'dotenv';
dotenv.config();

import yaml from 'js-yaml';

import * as collections from './src/_config/collections.js';
import * as customFilters from './src/_config/filters.js';
import events from './src/_config/events.js';
import plugins from './src/_config/plugins.js';
import {badge, image, imageKeys} from './src/_config/shortcodes/image.js';
import {svg} from './src/_config/shortcodes/svg.js';

export default async function eleventy(eleventyConfig) {
	eleventyConfig.addGlobalData('now', new Date());

	//  custom watch targets
	eleventyConfig.addWatchTarget('./src/assets/**/*.{css,js,svg,png,jpeg}');
	eleventyConfig.addWatchTarget('./src/_includes/**/*.{webc}');

	//  layout aliases
	eleventyConfig.addLayoutAlias('base', 'base.njk');
	eleventyConfig.addLayoutAlias('page', 'page.njk');
	eleventyConfig.addLayoutAlias('post', 'post.njk');

	eleventyConfig.addCollection('posts', collections.posts);
	eleventyConfig.addCollection('notes', collections.notes);
	eleventyConfig.addCollection('books', collections.books);
	eleventyConfig.addCollection('letters', collections.newsletters);
	eleventyConfig.addCollection('medias', collections.medias);
	eleventyConfig.addCollection('games', collections.games);
	eleventyConfig.addCollection('bookmarks', collections.bookmarks);
	eleventyConfig.addCollection('streams', collections.streams);

	eleventyConfig.addCollection('showInSitemap', collections.showInSitemap);
	eleventyConfig.addCollection('tagList', collections.tagList);

	//   Plugins
	eleventyConfig.addPlugin(plugins.htmlConfig);
	eleventyConfig.addPlugin(plugins.drafts);
	eleventyConfig.addPlugin(plugins.EleventyRenderPlugin);
	eleventyConfig.addPlugin(plugins.rss);
	eleventyConfig.addPlugin(plugins.syntaxHighlight);
	eleventyConfig.addPlugin(plugins.webc, {
		components: ['./src/_includes/webc/*.webc'],
		useTransform: true
	});
	eleventyConfig.addPlugin(plugins.webmentions);

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
	eleventyConfig.addPassthroughCopy('./admin');
	['src/humans.txt', 'src/assets'].forEach(p => eleventyConfig.addPassthroughCopy(p));

	eleventyConfig.addPassthroughCopy({
		'src/assets/images/favicon/*': '/',
		'node_modules/@11ty/is-land/is-land.js': 'assets/scripts/is-land.js',
		'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js': 'assets/js/bootstrap.bundle.min.js',
		'node_modules/lite-youtube-embed/src/lite-yt-embed.{css,js}': 'assets/components/',
		'node_modules/@zachleat/table-saw/table-saw.js': 'assets/components/table-saw.js'
	});

	eleventyConfig.setDataDeepMerge(true);

	return {
		dir: {
			input: 'src',
			includes: '_includes',
			data: '_data',
			output: '_site',
			layouts: '_layouts'
		},
		markdownTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk',
		templateFormats: ['njk', 'md', 'html']
	};
}
