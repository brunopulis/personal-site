import type {Collection} from 'tinacms';

export const NoteCollection: Collection = {
  name: 'note',
  label: 'Notas',
  path: 'src/content/notes',
  format: 'md',
  match: {
    include: '**/*.md'
  },
  fields: [
    {
      type: 'datetime',
      name: 'pubDate',
      label: 'Data de Publicação',
      required: true,
      ui: {
        dateFormat: 'DD/MM/YYYY',
        timeFormat: 'HH:mm'
      }
    },
    {
      type: 'boolean',
      name: 'published',
      label: 'Publicado'
    },
    {
      type: 'string',
      name: 'type',
      label: 'Tipo',
      options: [{value: 'note', label: 'Nota'}]
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
