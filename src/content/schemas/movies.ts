import { defineCollection, z } from "astro:content";

export const movies = defineCollection({
  schema: z.object({
    id: z.number(),
    title: z.string(),
    category: z.string(), // exemplo: drama, ação, comédia
    status: z.enum(["assistido", "não assistido", "planejado"]).optional(),
    rating: z.number().min(0).max(5).optional(), // nota de 0 a 5
    poster: z.string().url().optional(),
    description: z.string().optional(),
    thoughts: z.string().optional(),
    attendedYear: z.string().optional(), // ano de assistido
    recommendBy: z.string().optional(),
    tags: z.array(z.string()).default([]),
    url: z.string().url().optional(),
    date: z.coerce.date().optional(), // converte string para Date
  }),
});
