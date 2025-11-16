import { defineCollection, z } from "astro:content";

export const notes = defineCollection({
	schema: z.object({
		pubDate: z.coerce.date(),
		tags: z.array(z.string()).default([]),
	}),
});
