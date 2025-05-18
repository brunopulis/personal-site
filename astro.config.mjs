// @ts-check
import { defineConfig } from 'astro/config';
import db from "@astrojs/db";
import pagefind from "astro-pagefind";
import tailwindcss from "@tailwindcss/vite";
import alpinejs from '@astrojs/alpinejs';

import markdoc from '@astrojs/markdoc';

// https://astro.build/config
export default defineConfig({
  build: {
    format: "file",
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    db(),
    alpinejs(),
    markdoc(),
    pagefind()
  ]
});