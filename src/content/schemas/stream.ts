import { defineCollection, z } from "astro:content";
import { seoSchema } from "./seo";

export const stream = defineCollection({
  schema: z.object({
    title: z.string(),
    type: z.enum(['book', 'music', 'film', 'podcast', 'concert', 'link', 'note']),
    detail: z.string().optional(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    seo: seoSchema.optional(),
  }),
});
