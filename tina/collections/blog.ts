import type { Collection } from 'tinacms';

export const BlogCollection: Collection = {
  name: 'post',
  label: 'Blog',
  path: 'src/content/blog',
  defaultItem: () => {
    return {
      title: 'Novo Post',
      author: 'Pulis',
      seo: {
        meta_title: '',
        meta_description: '',
        keywords: [],
      },
      tags: [],
      categories: [],
      draft: false,
      featured: false,
    };
  },
  match: {
    include: '*',
  },
  format: 'md',
  ui: {
    filename: {
      slugify: (values) => {
        return `${values?.title?.toLowerCase().replace(/ /g, '-')}`;
      },
    },
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
      name: 'publishDate',
      label: 'Data de Publicação',
      required: true,
      ui: {
        dateFormat: 'DD/MM/YYYY',
        timeFormat: 'HH:mm',
      },
    },
    {
      type: 'string',
      name: 'author',
      label: 'Autor',
      required: true,
    },
    {
      type: 'string',
      name: 'description',
      label: 'Descrição/Resumo',
      required: true,
      ui: {
        component: 'textarea',
        description: 'Resumo do post para SEO e preview',
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
      name: 'categories',
      label: 'Categorias',
      list: true,
      ui: {
        component: 'list',
      },
      options: [
        { value: 'tecnologia', label: 'Tecnologia' },
        { value: 'design', label: 'Design' },
        { value: 'desenvolvimento', label: 'Desenvolvimento' },
        { value: 'tutorial', label: 'Tutorial' },
        { value: 'opiniao', label: 'Opinião' },
        { value: 'noticias', label: 'Notícias' },
      ],
    },
    {
      type: 'string',
      name: 'tags',
      label: 'Tags',
      list: true,
      ui: {
        component: 'tags',
      },
    },
    {
      type: 'boolean',
      name: 'draft',
      label: 'Rascunho',
      ui: {
        description: 'Marque para manter como rascunho',
      },
    },
    {
      type: 'object',
      name: 'seo',
      label: 'SEO',
      fields: [
        {
          type: 'string',
          name: 'meta_title',
          label: 'Meta Title',
        },
        {
          type: 'string',
          name: 'meta_description',
          label: 'Meta Description',
          ui: {
            component: 'textarea',
          },
        },
        {
          type: 'string',
          name: 'keywords',
          label: 'Keywords',
          list: true,
        },
      ],
    },
  ],
};
