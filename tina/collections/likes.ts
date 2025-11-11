import type { Collection } from "tinacms";

export const LikesCollection: Collection = {
  name: "like",
  label: "Likes",
  path: "src/content/likes",
  match: {
    include: "*",
  },
  format: "md",
  ui: {
    filename: {
      slugify: values => {
        const date = new Date(values?.date || Date.now());
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
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
      label: "Data",
      required: true,
      ui: {
        dateFormat: "DD/MM/YYYY",
      },
    },
    {
      type: "string",
      name: "url",
      label: "URL",
      required: true,
    },
    {
      type: "rich-text",
      name: "body",
      label: "Comentário/Observação",
      isBody: true,
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
