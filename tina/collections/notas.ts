import type { Collection } from "tinacms";

export const NotasCollection: Collection = {
  name: "note",
  label: "Notas",
  path: "src/content/notes",
  match: {
    include: "*",
  },
  format: "md",
  defaultItem: () => ({
    title: "Nova Nota",
    publishDate: new Date().toISOString(),
    description: "",
    body: "",
    categories: ["Pessoal"],
    tags: [],
    draft: false,
    featured: false,
  }),
  ui: {
    filename: {
      slugify: values => {
        const date = new Date(values?.publishDate || Date.now());
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(date.getDate()).padStart(2, "0")}`;
      },
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Título",
      isTitle: true,
      required: true,
    },
    {
      type: "datetime",
      name: "publishDate",
      label: "Data de Publicação",
      required: true,
      ui: {
        dateFormat: "DD/MM/YYYY",
        timeFormat: "HH:mm",
      },
    },
    {
      type: "string",
      name: "description",
      label: "Descrição/Resumo",
      required: true,
      ui: {
        component: "textarea",
        description: "Resumo do post para SEO e preview",
      },
    },
    {
      type: "image",
      name: "featured_image",
      label: "Imagem Destaque",
    },
    {
      type: "rich-text",
      name: "body",
      label: "Conteúdo",
      isBody: true,
      required: true,
    },
    {
      type: "string",
      name: "categories",
      label: "Categorias",
      list: true,
      options: [
        { value: "pessoal", label: "Pessoal" },
        { value: "trabalho", label: "Trabalho" },
        { value: "estudos", label: "Estudos" },
        { value: "ideias", label: "Ideias" },
        { value: "projetos", label: "Projetos" },
        { value: "lembretes", label: "Lembretes" },
        { value: "anotacoes", label: "Anotações" },
      ],
    },
    {
      type: "string",
      name: "tags",
      label: "Tags",
      list: true,
    },
  ],
};
