import type { Collection } from 'tinacms';

export const GalleryCollection: Collection = {
  name: 'photos',
  label: 'Fotos',
  path: 'src/content/gallery',
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
      type: 'datetime',
      name: 'date',
      label: 'Data',
      ui: {
        dateFormat: 'DD/MM/YYYY',
      },
      searchable: false,
    },
    {
      type: 'image',
      name: 'image',
      label: 'Imagem',
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
