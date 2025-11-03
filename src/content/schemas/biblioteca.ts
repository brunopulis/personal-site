import { defineCollection, z } from "astro:content";

export const biblioteca = defineCollection({
  schema: z.object({
    title: z.string().min(1, "O título é obrigatório."),
    description: z.string().optional().describe("Breve resumo do livro"),
    author: z.string().min(1, "O nome do autor é obrigatório."),
    reading_date: z.coerce.date(),
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
      ])
    ),

    rating: z.enum(["1", "2", "3", "4", "5"]).optional(),
    status: z.enum(["Quero ler", "Lido", "Lendo", "Abandonado"]),
    cover: z.string().optional(),
    pages: z.number().int().optional(),
    recommended_for: z.string().optional(),
    purchase_link: z.string().url().optional(),
    tags: z.array(z.object({ tag: z.string().min(1) })).optional(),
  }),
});
