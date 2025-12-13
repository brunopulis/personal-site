import type {Collection} from 'tinacms';

export const MediaCollection: Collection = {
  name: 'media',
  label: 'Mídia (Filmes/Séries)',
  path: 'src/content/media',
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
      name: 'director',
      label: 'Diretor'
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
        {value: 'assistido', label: 'Assistido'},
        {value: 'assistindo', label: 'Assistindo'},
        {value: 'quero-assistir', label: 'Quero Assistir'}
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
      name: 'poster',
      label: 'Poster'
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
      type: 'number',
      name: 'attendedYear',
      label: 'Ano Assistido'
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
