import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const seoSchema = z.object({
  title: z.string().min(5).max(120).optional(),
  description: z.string().min(15).max(160).optional(),
  image: z
    .object({
      src: z.string(),
      alt: z.string().optional(),
    })
    .optional(),
  pageType: z.enum(["website", "article"]).default("website"),
});

// 3. Define your collection(s)
const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog/" }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    excerpt: z.string().optional(),
    publishDate: z.date(),
    modifiedDate: z.date().optional(),
    isFeatured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().optional().default(false),
    image: z.string().optional(),
    seo: seoSchema.optional()
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/notes" }),
  schema: z.object({
    date: z.string().date(),
  }),
});

const newsletter = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/newsletter" }),
  schema: z.object({
    issue: z.string(),
    title: z.string(),
    category: z.string().optional(),
    coverImage: z.string().optional(),
    date: z.string().date(),
  }),
});

export const collections = {
  blog,
  newsletter,
  notes,
};
