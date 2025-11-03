import type { Collection } from "tinacms";

export const MoviesCollection: Collection = {
  name: "movie",
  label: "Meus Filmes",
  path: "src/content/movies",
  match: {
    include: "*",
  },
  format: "md",
  defaultItem: () => ({
    title: "Novo filme",
    publishDate: new Date().toISOString(),
    status: "quero_assistir",
    favorite: false,
    rating:  "3",
    description: "",
    body: "",
    tags: [],
    draft: false,
    featured: false,
  }),
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
      label: "Título do Filme",
      isTitle: true,
      required: true,
    },
    {
      type: "rich-text",
      name: "body",
      label: "Resenha/Comentários",
      isBody: true,
      ui: {
        description: "Suas impressões e análise do filme",
      },
    },
    {
      type: "string",
      name: "genres",
      label: "Gêneros",
      list: true,
      required: true,
      ui: {
        component: "list",
      },
      options: [
        { value: "acao", label: "Ação" },
        { value: "animacao", label: "Animação" },
        { value: "aventura", label: "Aventura" },
        { value: "comedia", label: "Comédia" },
        { value: "crime", label: "Crime" },
        { value: "documentario", label: "Documentário" },
        { value: "drama", label: "Drama" },
        { value: "fantasia", label: "Fantasia" },
        { value: "ficcao-cientifica", label: "Ficção Científica" },
        { value: "guerra", label: "Guerra" },
        { value: "horror", label: "Horror" },
        { value: "musical", label: "Musical" },
        { value: "romance", label: "Romance" },
        { value: "suspense", label: "Suspense" },
        { value: "western", label: "Western" },
      ],
    },
    {
      type: "image",
      name: "poster",
      label: "Poster",
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
      options: [
        { value: "assistido", label: "Assistido" },
        { value: "assistindo", label: "Assistindo" },
        { value: "quero_assistir", label: "uero Assistir" },
        { value: "abandonado", label: "Abandonado" },
      ],
    },
    {
      type: "datetime",
      name: "watched_date",
      label: "Data Assistida",
      ui: {
        dateFormat: "DD/MM/YYYY",
        description: "Quando você assistiu o filme",
      },
    },
    {
      type: "boolean",
      name: "favorite",
      label: "❤️ Favorito",
    },
    {
      type: "string",
      name: "streaming",
      label: "Onde Assistir",
      list: true,
      ui: {
        component: "list",
      },
      options: [
        { value: "netflix", label: "Netflix" },
        { value: "amazon-prime", label: "Amazon Prime" },
        { value: "disney-plus", label: "Disney+" },
        { value: "hbo-max", label: "HBO Max" },
        { value: "apple-tv", label: "Apple TV+" },
        { value: "paramount-plus", label: "Paramount+" },
        { value: "globoplay", label: "Globoplay" },
        { value: "star-plus", label: "Star+" },
        { value: "outro", label: "Outro" },
      ],
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
    {
      type: "string",
      name: "notes",
      label: "Observações Extras",
      ui: {
        component: "textarea",
      },
    },
  ],
};
