import type { Collection } from "tinacms";

export const BlogrollCollection: Collection = {
  name: "blogroll",
  label: "Blogroll",
  path: "src/content/blogroll",
  format: "mdx",
  ui: {
    filename: {
      slugify: (values) => {
        return `${values?.title?.toLowerCase().replace(/ /g, '-')}`;
      },
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Nome do Site/Blog",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "url",
      label: "URL",
      required: true,
      ui: {
        description: "URL completa (https://exemplo.com)",
      },
    },
    {
      type: "string",
      name: "description",
      label: "Descrição",
      required: true,
      ui: {
        component: "textarea",
        description: "Breve descrição do site/blog",
      },
    },
    {
      type: "string",
      name: "category",
      label: "Categoria",
      required: true,
      options: [
        { value: "design", label: "🎨 Design" },
        { value: "desenvolvimento", label: "💻 Desenvolvimento" },
        { value: "tecnologia", label: "📱 Tecnologia" },
        { value: "escrita", label: "✍️ Escrita" },
        { value: "produtividade", label: "🎯 Produtividade" },
        { value: "educacao", label: "🎓 Educação" },
        { value: "entretenimento", label: "🎮 Entretenimento" },
        { value: "noticias", label: "📰 Notícias" },
        { value: "geral", label: "🌐 Geral" },
      ],
    },
    {
      type: "image",
      name: "logo",
      label: "Logo/Avatar",
      ui: {
        description: "Favicon ou logo do site",
      },
    },
    {
      type: "string",
      name: "rss_feed",
      label: "Feed RSS",
      ui: {
        description: "URL do feed RSS (se disponível)",
      },
    },
    {
      type: "string",
      name: "author",
      label: "Autor/Responsável",
    },
    {
      type: "number",
      name: "order",
      label: "Ordem de Exibição",
      ui: {
        description: "Número menor = aparece primeiro",
      },
    },
    {
      type: "datetime",
      name: "date_added",
      label: "Data de Adição",
      ui: {
        dateFormat: 'DD/MM/YYYY',
      },
    },
  ],
}