import type { Collection } from "tinacms";

export const SpeakingCollection: Collection = {
  name: "speaking",
  label: "Palestras",
  path: "src/content/speaking",
  match: {
    include: "*",
  },
  format: "md",
  defaultItem: () => ({
    title: "Nova Palestra",
    issue: "",
    coverImage: "",
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
      label: "Imagem Capa",
    },
    {
      type: "rich-text",
      name: "body",
      label: "Conteúdo",
      isBody: true,
    },
  ],
};
