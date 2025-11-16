// @ts-check
import { defineConfig } from 'astro/config';

import alpinejs from '@astrojs/alpinejs';
import db from '@astrojs/db';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import umami from '@yeskunall/astro-umami';
import compress from 'astro-compress';
import icon from 'astro-icon';
import robotsTxt from 'astro-robots-txt';

import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  adapter: vercel(),
  output: 'static',
  site: 'https://brunopulis.com',
  image: {
    responsiveStyles: true,
  },
  markdown: {
    syntaxHighlight: 'prism',
  },
  integrations: [
    db(),
    icon(),
    alpinejs(),
    sitemap(),
    mdx(),
    compress(),
    umami({ id: '88ff3bbf-61c5-4303-bea2-f0da4f5dbb53' }),
    robotsTxt(),
  ],
  build: {
    format: 'directory',
    assets: '_astro',
  },
  trailingSlash: 'ignore',
  compressHTML: true,
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@layouts': path.resolve(__dirname, './src/layouts'),
        '@assets': path.resolve(__dirname, './src/assets'),
        '@scripts': path.resolve(__dirname, './src/scripts'),
        '@styles': path.resolve(__dirname, './src/styles'),
      },
    },
    plugins: [],
    server: {
      hmr: {
        timeout: 180000,
        overlay: false,
      },
      watch: {
        usePolling: false,
        ignored: [
          '**/node_modules/**',
          '**/.git/**',
          '**/dist/**',
          '**/.astro/**',
          '**/tina/**',
        ],
      },
      fs: {
        strict: false,
      },
      middlewareMode: false,
    },

    optimizeDeps: {
      force: true,
      include: ['@astrojs/alpinejs', 'alpinejs'],
      exclude: ['@astrojs/db', 'astro:db'],
    },
    ssr: {
      noExternal: ['@astrojs/vercel'],
    },
    cacheDir: 'node_modules/.vite',
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  },
});
