import { defineCollection, z } from 'astro:content';

export const notes = defineCollection({
  schema: z.object({
    title: z.string().optional(),
    pubDate: z.coerce.date(),
    published: z.boolean().default(true),
    type: z.enum(['note', 'reply', 'article']).default('note'),
    syndication: z.array(z.string().url()).optional(),
    tags: z.array(z.string()).optional(),
    in_reply_to: z.string().url().optional(),
    metrics: z
      .object({
        retweets: z.number(),
        favorites: z.number(),
      })
      .optional(),
  }),
});
