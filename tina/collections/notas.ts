import type { Collection } from 'tinacms';

export const NotasCollection: Collection = {
  name: 'note',
  label: 'Notas',
  path: 'src/content/notes',
  match: {
    include: '*',
  },
  format: 'md',
  defaultItem: () => ({
    pubDate: new Date().toISOString(),
    body: '',
    tags: [],
  }),
  ui: {
    filename: {
      slugify: (values) => {
        const date = new Date(values?.pubDate || Date.now());
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          '0'
        )}-${String(date.getDate()).padStart(2, '0')}`;
      },
    },
  },
  fields: [
    {
      type: 'datetime',
      name: 'pubDate',
      label: 'Data de Publicação',
      required: true,
      ui: {
        dateFormat: 'DD/MM/YYYY',
        timeFormat: 'HH:mm',
      },
    },
    {
      type: 'image',
      name: 'featured_image',
      label: 'Imagem Destaque',
    },
    {
      type: 'rich-text',
      name: 'body',
      label: 'Conteúdo',
      isBody: true,
      required: true,
    },
    {
      type: 'string',
      name: 'tags',
      label: 'Tags',
      list: true,
      options: [
        { value: 'pessoal', label: 'Pessoal' },
        { value: 'trabalho', label: 'Trabalho' },
        { value: 'estudos', label: 'Estudos' },
        { value: 'ideias', label: 'Ideias' },
        { value: 'projetos', label: 'Projetos' },
        { value: 'lembretes', label: 'Lembretes' },
        { value: 'anotacoes', label: 'Anotações' },
      ],
    },
  ],
};
