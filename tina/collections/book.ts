import type {Collection} from 'tinacms';

export const BookCollection: Collection = {
  name: 'book',
  label: 'Livros',
  path: 'src/content/books',
  format: 'md',
  match: {
    include: '**/*'
  },
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Título',
      isTitle: true,
      required: true
    },
    {
      type: 'string',
      name: 'author',
      label: 'Autor'
    },
    {
      type: 'string',
      name: 'category',
      label: 'Categoria'
    },
    {
      type: 'string',
      name: 'status',
      label: 'Status',
      options: [
        {value: 'lido', label: 'Lido'},
        {value: 'lendo', label: 'Lendo'},
        {value: 'quero-ler', label: 'Quero Ler'},
        {value: 'abandonado', label: 'Abandonado'}
      ]
    },
    {
      type: 'number',
      name: 'rating',
      label: 'Avaliação',
      ui: {
        component: 'number'
      }
    },
    {
      type: 'image',
      name: 'cover',
      label: 'Capa'
    },
    {
      type: 'string',
      name: 'description',
      label: 'Descrição',
      ui: {
        component: 'textarea'
      }
    },
    {
      type: 'string',
      name: 'thoughts',
      label: 'Pensamentos',
      ui: {
        component: 'textarea'
      }
    },
    {
      type: 'string',
      name: 'quotes',
      label: 'Citações',
      ui: {
        component: 'textarea'
      }
    },
    {
      type: 'number',
      name: 'attendedYear',
      label: 'Ano de Leitura'
    },
    {
      type: 'string',
      name: 'recommendBy',
      label: 'Recomendado por'
    },
    {
      type: 'string',
      name: 'tags',
      label: 'Tags',
      list: true,
      ui: {
        component: 'tags'
      }
    },
    {
      type: 'string',
      name: 'url',
      label: 'URL'
    },
    {
      type: 'datetime',
      name: 'date',
      label: 'Data',
      ui: {
        dateFormat: 'DD/MM/YYYY'
      }
    },
    {
      type: 'rich-text',
      name: 'body',
      label: 'Conteúdo',
      isBody: true
    }
  ]
};
