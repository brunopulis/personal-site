// @ts-check

import alpinejs from "@astrojs/alpinejs";

import db from "@astrojs/db";
import mdx from "@astrojs/mdx";
import netlify from "@astrojs/netlify";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import umami from "@yeskunall/astro-umami";
import { defineConfig } from "astro/config";
import compress from "astro-compress";
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";

export default defineConfig({
	integrations: [
		react(),
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
	adapter: netlify(),
	output: "server",
	site: "https://brunopulis.com",
	build: {
		assets: "assets",
	},
	compressHTML: true,
	vite: {
		plugins: [tailwindcss()],
	},
	image: {
		responsiveStyles: true,
	},
});
