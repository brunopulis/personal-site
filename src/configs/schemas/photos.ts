import { defineCollection, z } from 'astro:content';

export const photos = defineCollection({
  schema: z.object({
    id: z.number(),
    title: z.string(),
    thumb: z.string(),
    alt: z.string(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
  }),
});
