import { defineCollection, z } from 'astro:content';

export const blogrolls = defineCollection({
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    description: z.string().optional(),
    category: z.string(),
    rss_feed: z.string().url().optional(),
    date_added: z.date().optional(),
  }),
});
