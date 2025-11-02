import type { Collection } from "tinacms";

export const SpeakingCollection : Collection = {
  name: "speaking",
  label: "Palestras",
  path: "src/content/speaking",
  match: {
    include: '*',
  },
  format: "md",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
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
      label: "Hero",
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
    },
  ],
}
