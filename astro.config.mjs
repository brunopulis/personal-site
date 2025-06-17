// @ts-check
import { defineConfig } from 'astro/config';
import db from "@astrojs/db";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import sectionize from '@hbsnow/rehype-sectionize';
import tailwindcss from "@tailwindcss/vite";
import alpinejs from '@astrojs/alpinejs';
import icon from 'astro-icon';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import umami from "@yeskunall/astro-umami";
import robotsTxt from 'astro-robots-txt';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: "https://brunopulis.com",
  integrations: [
    react(),
    db(),
    icon(),
    alpinejs(),
    sitemap(),
    mdx(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    umami({ id: "f1cb7c07-2efc-4997-9dd3-d3198f0faa0c" }),
    robotsTxt()
  ],
  markdown:{
    rehypePlugins: [sectionize],
  },
});