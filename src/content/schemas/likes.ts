import { defineCollection, z } from "astro:content";

export const likes = defineCollection({
  schema: z.object({
    title: z.string(),
    publishDate: z.coerce.date(),
    url: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});
