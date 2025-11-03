import { defineCollection, z } from "astro:content";

export const bookmarks = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
  }),
});
