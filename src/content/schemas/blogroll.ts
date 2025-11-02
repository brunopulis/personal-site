import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

export const blogrolls = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blogroll/" }),
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    description: z.string().optional(),
    category: z.string(),
    rss_feed: z.string().url().optional(),
    date_added: z.date().optional(),
  }),
});
