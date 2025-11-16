// @ts-check

import alpinejs from "@astrojs/alpinejs";
import db from "@astrojs/db";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";
import umami from "@yeskunall/astro-umami";
import { defineConfig } from "astro/config";
import compress from "astro-compress";
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";

import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  adapter: vercel(),
  output: "static",
  site: "https://brunopulis.com",
  markdown: {
    syntaxHighlight: "prism",
  },
  integrations: [
    db(),
    icon(),
    alpinejs(),
    sitemap(),
    mdx(),
    compress(),
    umami({ id: "f1cb7c07-2efc-4997-9dd3-d3198f0faa0c" }),
    robotsTxt({
      policy: [
        {
          userAgent: "CCBot",
          disallow: "/",
        },
        {
          userAgent: "ChatGPT-User",
          disallow: "/",
        },
        {
          userAgent: "GPTBot",
          disallow: "/",
        },
        {
          userAgent: "Google-Extended",
          disallow: "/",
        },
        {
          userAgent: "Omgilibot",
          disallow: "/",
        },
        {
          userAgent: "FacebookBot",
          disallow: "/",
        },
      ],
    }),
  ],
  build: {
    format: "directory",
    assets: "_astro",
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
        '@styles': path.resolve(__dirname, './src/styles')
      }
    },
    plugins: [tailwindcss()],
    server: {
      hmr: {
        timeout: 180000, // Aumentado para 180 segundos (3 minutos)
        overlay: false, // Desabilita overlay de erro que pode travar
      },
      watch: {
        usePolling: false,
        ignored: [
          '**/node_modules/**', 
          '**/.git/**', 
          '**/dist/**',
          '**/.astro/**', // Ignora cache do Astro
          '**/tina/**' // Ignora arquivos do TinaCMS
        ]
      },
      fs: {
        strict: false,
      },
      // Aumenta limite de memória para assets
      middlewareMode: false,
    },
    // Otimizações de build e dependências
    optimizeDeps: {
      force: true, // Força rebuild das dependências
      include: [
        '@astrojs/alpinejs',
        'alpinejs',
      ],
      exclude: [
        '@astrojs/db',
        'astro:db',
      ],
    },
    ssr: {
      noExternal: ["@astrojs/vercel"], // garante compatibilidade no SSR
    },
    // Configurações de cache
    cacheDir: 'node_modules/.vite',
    // Limita processamento paralelo para evitar sobrecarga de memória
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: undefined, // Desabilita chunking manual para dev
        },
      },
    },
  },
  image: {
    responsiveStyles: true,
  },
});