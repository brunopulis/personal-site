import { defineCollection, z } from "astro:content";

export const pages = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lang: z.enum(['pt-br', 'en']),
    routeKey: z.string(),
    draft: z.boolean().default(false),
  }),
});

