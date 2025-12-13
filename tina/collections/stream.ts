import type {Collection} from 'tinacms';

export const StreamCollection: Collection = {
  name: 'stream',
  label: 'Streams',
  path: 'src/content/streams',
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
      name: 'type',
      label: 'Tipo'
    },
    {
      type: 'string',
      name: 'detail',
      label: 'Detalhes'
    },
    {
      type: 'datetime',
      name: 'pubDate',
      label: 'Data de Publicação',
      ui: {
        dateFormat: 'DD/MM/YYYY'
      }
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
      type: 'rich-text',
      name: 'body',
      label: 'Conteúdo',
      isBody: true
    }
  ]
};
