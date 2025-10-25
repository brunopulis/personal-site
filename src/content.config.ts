import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const seoSchema = z.object({
  title: z.string().min(5).max(120).optional(),
  description: z.string().min(15).max(160).optional(),
  image: z
    .object({
      src: z.string(),
      alt: z.string().optional(),
    })
    .optional(),
  pageType: z.enum(['website', 'article']).default('website'),
})

// 3. Define your collection(s)
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog/' }),
  schema: z.object({
    title: z.string(),
    location: z.string().optional(),
    country: z.string().optional(),
    category: z.string().optional(),
    excerpt: z.string().optional(),
    publishDate: z.coerce.date(),
    publishedAt: z.array(z.string()).optional(),
    reply: z.string().optional(),
    modifiedDate: z.date().optional(),
    isFeatured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().optional().default(false),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    readingTime: z.number().optional(),
    url: z.string().optional(),
    canonicalUrl: z.string().optional(),
    seo: seoSchema.optional(),
  }),
})

const books = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/books' }),
  schema: z.object({
    title: z.string().min(1, 'O título é obrigatório.'),
    description: z.string().optional().describe('Breve resumo do livro'),

    author: z.array(
      z.object({
        name: z.string().min(1, 'O nome do autor é obrigatório.'),
      }),
    ),

    publishDate: z.string().datetime({ offset: true }).describe('Data de publicação (YYYY-MM-DD HH:mm:ss)'),
    year: z.number().int().min(1900).max(2030).describe('Ano de lançamento do livro'),
    body: z.string().optional().describe('Resenha ou análise do livro'),
    quotes: z.string().optional().describe('Citações favoritas'),
    category: z.array(
      z.enum([
        'Ficção',
        'Não Ficção',
        'Técnicos',
        'Negócios',
        'Finanças e investimentos',
        'Empreendedorismo',
        'Produtividade',
        'Autoajuda',
        'Filosofia',
        'Religião',
        'Teologia',
        'Política',
        'Educação',
        'Música',
        'Arte',
        'Humor',
        'Poesia',
        'Quadrinhos',
      ]),
    ),

    cover: z.string().optional().describe('Caminho da imagem da capa do livro'),
    rating: z.enum(['1', '2', '3', '4', '5']).optional().describe('Avaliação do livro de 1 a 5'),
    status: z.enum(['to_read', 'read', 'reading', 'abandoned']).default('to_read'),
    reading_date: z.string().optional().describe('Data em que o livro foi lido (YYYY-MM-DD)'),
    pages: z.number().int().optional().describe('Número total de páginas do livro'),
    recommended_for: z.string().optional().describe('Quem recomendou o livro'),
    purchase_link: z.string().url().optional().describe('Link para compra ou acesso do livro'),
    tags: z
      .array(
        z.object({
          tag: z.string().min(1),
        }),
      )
      .optional(),
  }),
})

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    date: z.coerce.date(),
  }),
})

const newsletter = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/newsletter' }),
  schema: z.object({
    issue: z.string(),
    title: z.string(),
    category: z.string().optional(),
    coverImage: z.string().optional(),
    date: z.coerce.date(),
  }),
})

export const collections = {
  blog,
  newsletter,
  books,
  notes,
}
