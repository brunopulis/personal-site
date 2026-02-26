import type { Collection } from 'tinacms';

export const MediaCollection: Collection = {
  name: 'media',
  label: 'Mídia (Filmes/Séries)',
  path: 'src/content/medias',
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
      name: 'director',
      label: 'Diretor',
      searchable: false,
    },
    {
      type: 'string',
      name: 'category',
      label: 'Categoria',
      searchable: false,
    },
    {
      type: 'string',
      name: 'status',
      label: 'Status',
      options: [
        { value: 'assistido', label: 'Assistido' },
        { value: 'assistindo', label: 'Assistindo' },
        { value: 'quero-assistir', label: 'Quero Assistir' },
      ],
      searchable: false,
    },
    {
      type: 'number',
      name: 'rating',
      label: 'Avaliação',
      ui: {
        component: 'number',
      },
      searchable: false,
    },
    {
      type: 'image',
      name: 'poster',
      label: 'Poster',
      searchable: false,
    },
    {
      type: 'string',
      name: 'description',
      label: 'Descrição',
      ui: {
        component: 'textarea',
      },
      searchable: false,
    },
    {
      type: 'string',
      name: 'thoughts',
      label: 'Pensamentos',
      ui: {
        component: 'textarea',
      },
      searchable: false,
    },
    {
      type: 'number',
      name: 'watchedYear',
      label: 'Ano Assistido',
      searchable: false,
    },
    {
      type: 'string',
      name: 'recommendBy',
      label: 'Recomendado por',
      searchable: false,
    },
    {
      type: 'string',
      name: 'tags',
      label: 'Tags',
      list: true,
      ui: {
        component: 'tags',
      },
      searchable: false,
    },
    {
      type: 'string',
      name: 'url',
      label: 'URL',
      searchable: false,
    },
    {
      type: 'datetime',
      name: 'watchedDate',
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
