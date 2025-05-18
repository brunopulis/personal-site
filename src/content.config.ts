// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';

// 2. Import loader(s)
import { glob, file } from 'astro/loaders';

// 3. Define your collection(s)
const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    tags: z.array(z.string()).optional(),
    date: z.date(),
    modifiedDate: z.string().date().optional(),
  })
});

// const blogroll = defineCollection({
//   loader: file("src/data/blogroll.json"),
//   schema: z.object({
//     title: z.string(),
//     category: z.string(),
//     date: z.date(),
//     url: z.string().url(),
//     description: z.string(),
//   }),
// });

const notes = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/notes" }),
  schema: z.object({
    date: z.string().date()
  }),
})

export const collections = {
  "blog": blogCollection,
  notes
};