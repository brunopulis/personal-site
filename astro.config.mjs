// @ts-nocheck
// import db from '@astrojs/db';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import vercel from '@astrojs/vercel';
import umami from '@yeskunall/astro-umami';
import { defineConfig } from 'astro/config';
import compress from 'astro-compress';
import icon from 'astro-icon';
import robotsTxt from 'astro-robots-txt';

import remarkExternalLinks from './src/plugins/remark-external-links.mjs';

import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR', 'en'],
    routing: {
      prefixDefaultLocale: false, // false = /sobre, true = /pt-BR/sobre
      redirectToDefaultLocale: true,
    },
    fallback: {
      en: 'pt-BR',
    },
  },
  adapter: vercel(),
  output: 'static',
  site: 'https://brunopulis.com',
  markdown: {
    syntaxHighlight: 'prism',
    remarkPlugins: [remarkExternalLinks],
  },
  integrations: [
    icon(),
    pagefind(),
    sitemap(),
    mdx(),
    compress(),
    umami({ id: '88ff3bbf-61c5-4303-bea2-f0da4f5dbb53' }),
    robotsTxt(),
  ],
  build: {
    format: 'directory',
    assets: '_astro',
    rollupOptions: {
      external: ['pagefind'],
    },
  },
  trailingSlash: 'ignore',
  compressHTML: true,
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@layout/': path.resolve(__dirname, './src/layout'),
        '@layouts': path.resolve(__dirname, './src/layouts'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@scripts': path.resolve(__dirname, './src/scripts'),
        '@styles': path.resolve(__dirname, './src/css'),
      },
    },
    plugins: [],
    server: {
      fs: {
        strict: false,
      },
    },
    ssr: {
      external: ['pagefind'],
      noExternal: ['@astrojs/vercel'], // garante compatibilidade no SSR
    },
  },
  image: {
    responsiveStyles: true,
  },
});
