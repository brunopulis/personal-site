import type { Collection } from 'tinacms';

export const NewsletterCollection: Collection = {
  name: 'newsletter',
  label: 'Newsletter',
  path: 'src/content/newsletter',
  format: 'md',
  match: {
    include: '**/*',
  },
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Título',
      required: true,
    },
    {
      type: 'string',
      name: 'issue',
      label: 'Edição',
      searchable: false,
    },
    {
      type: 'datetime',
      name: 'pubDate',
      label: 'Data de Publicação',
      ui: {
        dateFormat: 'DD/MM/YYYY',
      },
      searchable: false,
    },
    {
      type: 'rich-text',
      name: 'body',
      label: 'Conteúdo',
      isBody: true,
    },
  ],
};
