import { defineCollection, z } from "astro:content";

export const notes = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
  }),
});
