import { defineCollection, z } from "astro:content";

export const musics = defineCollection({
  schema: z.object({
    title: z.string(),
    artist: z.string(),
    album: z.string().optional(),
    type: z.enum(['album', 'single', 'concert']),
    pubDate: z.coerce.date(),
    coverImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});
