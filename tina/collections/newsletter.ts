import type { Collection } from "tinacms";

export const NewsletterCollection : Collection =       {
  name: "newsletter",
  label: "Newsletter",
  path: "src/content/newsletter",
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
