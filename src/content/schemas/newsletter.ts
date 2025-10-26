import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

export const newsletter = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/newsletter" }),
	schema: z.object({
		issue: z.string(),
		title: z.string(),
		category: z.string().optional(),
		coverImage: z.string().optional(),
		date: z.coerce.date(),
	}),
});
