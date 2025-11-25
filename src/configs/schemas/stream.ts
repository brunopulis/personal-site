import { defineCollection, z } from 'astro:content';

export const stream = defineCollection({
  schema: z.object({
    title: z.string(),
    type: z.enum(['book', 'music', 'film', 'podcast', 'concert', 'link', 'note']),
    pubDate: z.coerce.date(),
    bookSlug: z.string().optional(),
    filmSlug: z.string().optional(),
    musicSlug: z.string().optional(),
    detail: z.string().optional(),
    url: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});
