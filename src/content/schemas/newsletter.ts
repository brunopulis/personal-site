import { defineCollection, z } from 'astro:content';

export const newsletter = defineCollection({
  schema: z.object({
    issue: z.string(),
    title: z.string(),
    category: z.string().optional(),
    coverImage: z.string().optional(),
    date: z.coerce.date(),
  }),
});
