import { defineCollection, z } from "astro:content";

export const stream = defineCollection({
  schema: z.object({
    title: z.string(),
    type: z.enum(['book', 'music', 'film', 'podcast', 'concert', 'link', 'note']),
    detail: z.string().optional(),
    pubDate: z.date(),
    tags: z.array(z.string()).optional(),
  }),
});
