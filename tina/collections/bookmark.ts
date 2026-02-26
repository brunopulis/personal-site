import type { Collection } from 'tinacms';

export const BookmarkCollection: Collection = {
  name: 'bookmark',
  label: 'Bookmarks',
  path: 'src/content/bookmarks',
  format: 'md',
  match: {
    include: '**/*',
  },
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Título',
      isTitle: true,
      required: true,
    },
    {
      type: 'string',
      name: 'url',
      label: 'URL',
    },
    {
      type: 'datetime',
      name: 'pubDate',
      label: 'Data',
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
