import { defineCollection, z } from "astro:content";
import { seoSchema } from "./seo";

export const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional(),
    location: z.string().optional(),
    country: z.string().optional(),
    category: z.string().optional(),
    publishDate: z.coerce.date(),
    modifiedDate: z.date().optional(),
    publishedAt: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
    isFeatured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    reply: z.string().optional(),
    readingTime: z.number().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    url: z.string().optional(),
    canonicalUrl: z.string().optional(),
    seo: seoSchema.optional(),
  }),
});
