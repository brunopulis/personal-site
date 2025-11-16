import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

export const notes = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/notes" }),
	schema: z.object({
		pubDate: z.coerce.date(),
		tags: z.array(z.string()).default([]),
	}),
});
