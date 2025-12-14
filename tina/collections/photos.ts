import type {Collection} from 'tinacms';

export const PhotosCollection: Collection = {
  name: 'photos',
  label: 'Galeria de Fotos',
  path: 'src/content/photos',
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
      type: 'datetime',
      name: 'date',
      label: 'Data',
      ui: {
        dateFormat: 'DD/MM/YYYY'
      }
    },
    {
      type: 'image',
      name: 'image',
      label: 'Imagem'
    },
    {
      type: 'rich-text',
      name: 'body',
      label: 'Conteúdo',
      isBody: true
    }
  ]
};
