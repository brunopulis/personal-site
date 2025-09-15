// @ts-check
import { defineConfig } from 'astro/config';
// import db from "@astrojs/db";
import partytown from "@astrojs/partytown";
import sitemapPlugin from '@astrojs/sitemap';
import compress from 'astro-compress';
import tailwindcss from "@tailwindcss/vite";
import alpinejs from '@astrojs/alpinejs';
import icon from 'astro-icon';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import umami from "@yeskunall/astro-umami";
import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
  },

  site: "https://brunopulis.com",

  integrations: [
    react(),
    icon(),
    alpinejs(),
    sitemapPlugin(),
    mdx(),
    compress(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    umami({ id: "f1cb7c07-2efc-4997-9dd3-d3198f0faa0c" }),
    robotsTxt({
      policy: [
        {
          userAgent: 'CCBot',
          disallow: '/',
        },
        {
          userAgent: 'ChatGPT-User',
          disallow: '/',
        },
        {
          userAgent: 'GPTBot',
          disallow: '/',
        },
        {
          userAgent: 'Google-Extended',
          disallow: '/',
        },
        {
          userAgent: 'Omgilibot',
          disallow: '/',
        },
        {
          userAgent: 'FacebookBot',
          disallow: '/',
        },
      ]
    })
  ],

  image: {
    responsiveStyles: true,
  }
});