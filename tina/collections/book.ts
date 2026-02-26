import type { Collection } from 'tinacms';

export const BookCollection: Collection = {
  name: 'book',
  label: 'Livros',
  path: 'src/content/books',
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
      name: 'author',
      label: 'Autor',
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
        { value: 'lido', label: 'Lido' },
        { value: 'lendo', label: 'Lendo' },
        { value: 'quero-ler', label: 'Quero Ler' },
        { value: 'abandonado', label: 'Abandonado' },
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
      name: 'cover',
      label: 'Capa',
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
      type: 'string',
      name: 'quotes',
      label: 'Citações',
      ui: {
        component: 'textarea',
      },
      searchable: false,
    },
    {
      type: 'number',
      name: 'attendedYear',
      label: 'Ano de Leitura',
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
