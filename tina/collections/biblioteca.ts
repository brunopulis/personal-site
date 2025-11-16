import type { Collection } from "tinacms";

export const BibliotecaCollection: Collection = {
  name: "book",
  label: "Meus Livros",
  path: "src/content/biblioteca",
  match: {
    include: "*",
  },
  format: "md",
  defaultItem: () => {
    return {
      title: "Novo Livro",
      status: ["quero_ler"], // garantir array
      tags: [],
      category: [],
      rating: "3",
    };
  },
  ui: {
    filename: {
      slugify: values => {
        return `${values?.title?.toLowerCase().replace(/ /g, "-")}`;
      },
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Título do Livro",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "description",
      label: "Descrição/Resumo",
      ui: {
        component: "textarea",
        description: "Breve resumo do livro",
      },
    },
    {
      type: "string",
      name: "author",
      label: "Autor(es)",
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
      type: "rich-text",
      name: "body",
      label: "Resenha e Citações",
      isBody: true,
      ui: {
        description: "Suas impressões, análise e citações favoritas",
      },
    },
    {
      type: "string",
      name: "category",
      label: "Categoria",
      list: true,
      required: true,
      options: [
        { value: "Ficção", label: "Ficção" },
        { value: "Não Ficção", label: "Não Ficção" },
        { value: "Técnicos", label: "Técnicos" },
        { value: "Negócios", label: "Negócios" },
        { value: "Finanças e investimentos", label: "Finanças e investimentos" },
        { value: "Empreendedorismo", label: "Empreendedorismo" },
        { value: "Produtividade", label: "Produtividade" },
        { value: "Autoajuda", label: "Autoajuda" },
        { value: "Filosofia", label: "Filosofia" },
        { value: "Religiao", label: "Religião" },
        { value: "Teologia", label: "Teologia" },
        { value: "Politica", label: "Política" },
        { value: "Educacao", label: "Educação" },
        { value: "Música", label: "Música" },
        { value: "Arte", label: "Arte" },
        { value: "Humor", label: "Humor" },
        { value: "Poesia", label: "Poesia" },
        { value: "Quadrinhos", label: "Quadrinhos" },
      ],
    },
    {
      type: "image",
      name: "cover",
      label: "Capa do Livro",
    },
    {
      type: "string",
      name: "rating",
      label: "⭐ Avaliação",
      options: [
        { value: "1", label: "⭐ 1 de 5" },
        { value: "2", label: "⭐⭐ 2 de 5" },
        { value: "3", label: "⭐⭐⭐ 3 de 5" },
        { value: "4", label: "⭐⭐⭐⭐ 4 de 5" },
        { value: "5", label: "⭐⭐⭐⭐⭐ 5 de 5" },
      ],
    },
    {
      type: "string",
      name: "status",
      label: "Status",
      required: true,
      list: true,
      options: [
        { value: "quero_ler", label: "Quero ler" },
        { value: "lido", label: "Lido" },
        { value: "lendo", label: "Lendo" },
        { value: "abandonado", label: "Abandonado" },
      ],
    },
    {
      type: "datetime",
      name: "reading_date",
      label: "Data de leitura",
      ui: {
        dateFormat: "DD/MM/YYYY",
        description: "Quando você leu o livro",
      },
    },
    {
      type: "number",
      name: "pages",
      label: "Número de Páginas",
      ui: {
        description: "Total de páginas do livro",
      },
    },
    {
      type: "string",
      name: "recommended_for",
      label: "Recomendado por:",
      ui: {
        description: "Quem te recomendou esse livro?",
      },
    },
    {
      type: "string",
      name: "purchase_link",
      label: "Onde Comprar/Encontrar",
      ui: {
        description: "Link para comprar ou encontrar o livro",
      },
    },
    {
      type: "string",
      name: "tags",
      label: "Tags",
      list: true,
      ui: {
        component: "tags",
      },
    },
  ],
};
