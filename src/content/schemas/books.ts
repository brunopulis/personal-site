import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

export const books = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/books" }),
	schema: z.object({
		title: z.string().min(1, "O título é obrigatório."),
		description: z.string().optional().describe("Breve resumo do livro"),

		author: z.array(
			z.object({
				name: z.string().min(1, "O nome do autor é obrigatório."),
			}),
		),

		publishDate: z.string().datetime({ offset: true }),
		year: z.number().int().min(1900).max(2030),
		reading_date: z.string().optional(),

		body: z.string().optional(),
		quotes: z.string().optional(),

		category: z.array(
			z.enum([
				"Ficção",
				"Não Ficção",
				"Técnicos",
				"Negócios",
				"Finanças e investimentos",
				"Empreendedorismo",
				"Produtividade",
				"Autoajuda",
				"Filosofia",
				"Religião",
				"Teologia",
				"Política",
				"Educação",
				"Música",
				"Arte",
				"Humor",
				"Poesia",
				"Quadrinhos",
			]),
		),

		rating: z.enum(["1", "2", "3", "4", "5"]).optional(),
		status: z
			.enum(["to_read", "read", "reading", "abandoned"])
			.default("to_read"),

		cover: z.string().optional(),
		pages: z.number().int().optional(),
		recommended_for: z.string().optional(),
		purchase_link: z.string().url().optional(),

		tags: z.array(z.object({ tag: z.string().min(1) })).optional(),
	}),
});
