import type { Collection } from "tinacms";

export const NewsletterCollection: Collection = {
  name: "newsletter",
  label: "Newsletter",
  path: "src/content/newsletter",
  match: {
    include: "*",
  },
  format: "md",
  defaultItem: () => ({
    title: "Nova Newsletter",
    issue: "1",
    body: "",
  }),
  fields: [
    {
      type: "string",
      name: "title",
      label: "Título",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "issue",
      label: "Edição",
      required: true,
    },
    {
      type: "image",
      name: "coverImage",
      label: "Imagem de Capa",
    },
    {
      type: "rich-text",
      name: "body",
      label: "Conteúdo",
      isBody: true,
    },
  ],
};
