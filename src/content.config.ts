// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";

// 2. Import loader(s)
import { glob, file } from "astro/loaders";

// 3. Define your collection(s)
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog/" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional().default(false),
    excerpt: z.string().optional(),
    coverImage: z.string().optional(),
    modifiedDate: z.string().date().optional(),
  })
});

const notes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/notes" }),
  schema: z.object({
    date: z.string().date()
  }),
})

const newsletter = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/newsletter" }),
  schema: z.object({
    issue: z.string(),
    title: z.string(),
    category: z.string().optional(),
    coverImage: z.string().optional(),
    date: z.string().date()
  }),
})

export const collections = {
  blog,
  newsletter,
  notes
};