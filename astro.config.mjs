// @ts-check
import { defineConfig } from 'astro/config';
import db from "@astrojs/db";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import alpinejs from '@astrojs/alpinejs';
import icon from 'astro-icon';
import react from '@astrojs/react';

import umami from "@yeskunall/astro-umami";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    db(),
    icon(),
    alpinejs(),
    sitemap(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    umami({ id: "f1cb7c07-2efc-4997-9dd3-d3198f0faa0c" })
  ]
});