// @ts-check
import { defineConfig } from "astro/config";
import alpinejs from "@astrojs/alpinejs";
import db from "@astrojs/db";
import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import umami from "@yeskunall/astro-umami";
import vercel from '@astrojs/vercel/static';
import compress from "astro-compress";
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";

export default defineConfig({
	integrations: [
		db(),
		icon(),
		alpinejs(),
		sitemap(),
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
	output: "static",
	site: "https://brunopulis.com",
	adapter: vercel(),
	build: {
		format: 'file',
		assets: "assets",
	},
	compressHTML: true,
	vite: {
		plugins: [tailwindcss()],
		server: {
      fs: {
        strict: false
      }
    }
	},
	image: {
		responsiveStyles: true,
	},
});
