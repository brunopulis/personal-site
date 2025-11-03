import type { Collection } from "tinacms";

export const BlogrollCollection: Collection = {
  name: "blogroll",
  label: "Blogroll",
  path: "src/content/blogroll",
  match: {
    include: "*",
  },
  format: "md",
  ui: {
    filename: {
      slugify: values => {
        return `${values?.title?.toLowerCase().replace(/ /g, "-")}`;
      },
    },
  },
  defaultItem: () => {
    return {
      category: "geral", // valor padrão
    };
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
        { value: "acessibilidade", label: "Acessibilidade" },
        { value: "desenvolvimento", label: "Desenvolvimento" },
        { value: "design", label: "Design" },
        { value: "educacao", label: "Educação" },
        { value: "entretenimento", label: "Entretenimento" },
        { value: "escrita", label: "Escrita" },
        { value: "geral", label: "Geral" },
        { value: "tecnologia", label: "Tecnologia" },
        { value: "teologia", label: "Teologia" },
        { value: "produtividade", label: "Produtividade" },
        { value: "noticias", label: "Notícias" },
      ],
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
      type: "datetime",
      name: "date_added",
      label: "Data de Adição",
      ui: {
        dateFormat: "DD/MM/YYYY",
      },
    },
  ],
};
