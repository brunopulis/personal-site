// @ts-check
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

import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  i18n: {
    defaultLocale: "pt-BR",
    locales: ["pt-BR", "en"],
    routing: {
      prefixDefaultLocale: false, // false = /sobre, true = /pt-BR/sobre
      redirectToDefaultLocale: true,
    },
    fallback: {
      en: "pt-BR",
    },
  },
  adapter: vercel(),
  output: "static",
  site: "https://brunopulis.com",
  markdown: {
    syntaxHighlight: "prism",
  },
  integrations: [
    db(),
    icon(),
    sitemap(),
    mdx(),
    compress(),
    umami({ id: "88ff3bbf-61c5-4303-bea2-f0da4f5dbb53" }),
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
  trailingSlash: "ignore",
  compressHTML: true,
  vite: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@layout/": path.resolve(__dirname, "./src/layout"),
        "@layouts": path.resolve(__dirname, "./src/layouts"),
        "@assets": path.resolve(__dirname, "./src/assets"),
        "@scripts": path.resolve(__dirname, "./src/scripts"),
        "@styles": path.resolve(__dirname, "./src/styles"),
      },
    },
    plugins: [tailwindcss()],
    server: {
      fs: {
        strict: false,
      },
    },
    ssr: {
      noExternal: ["@astrojs/vercel"], // garante compatibilidade no SSR
    },
  },
  image: {
    responsiveStyles: true,
  },
});
