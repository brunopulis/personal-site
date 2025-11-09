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

export default defineConfig({
  adapter: vercel({ static: true }),
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
