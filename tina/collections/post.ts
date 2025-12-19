import type {Collection} from 'tinacms';

export const PostCollection: Collection = {
  name: 'post',
  label: 'Blog',
  path: 'src/content/posts',
  format: 'md',
  match: {
    include: '**/*'
  },

  defaultItem: () => {
    return {
      title: 'Novo Post',
      author: 'Pulis',
      pubDate: new Date().toISOString(),
      seo: {
        meta_title: '',
        meta_description: '',
        keywords: []
      },
      tags: [],
      categories: [],
      draft: false,
      featured: false
    };
  },
  ui: {
    // @ts-ignore
    itemProps: (item: any) => {
      return {
        label: item?.title,
        subtitle: item?.pubDate ? new Date(item.pubDate).toLocaleDateString('pt-BR') : ''
      };
    },
    router: ({document}: {document: any}) => {
      return `/blog/${document._sys.filename}/`;
    },
    filename: {
      slugify: (values: any) => {
        const date = values?.pubDate ? new Date(values.pubDate) : new Date();
        const year = date.getFullYear();
        const slug =
          values?.title
            ?.toLowerCase()
            .trim()
            .replaceAll(/\s+/g, '-')
            .replaceAll(/[^\w-]/g, '') || 'post';
        // Preserve locale from existing path or default to pt-br
        const locale = 'pt-br'; // You can make this dynamic based on a field
        return `${locale}/${year}/${slug}`;
      }
    }
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
      label: 'Data de Publicação',
      required: true,
      ui: {
        dateFormat: 'DD/MM/YYYY',
        timeFormat: 'HH:mm'
      }
    },
    {
      type: 'string',
      name: 'author',
      label: 'Autor',
      required: true
    },
    {
      type: 'string',
      name: 'description',
      label: 'Descrição/Resumo',
      required: true,
      ui: {
        component: 'textarea',
        description: 'Resumo do post para SEO e preview'
      }
    },
    {
      type: 'image',
      name: 'featured_image',
      label: 'Imagem Destaque'
    },
    {
      type: 'rich-text',
      name: 'body',
      label: 'Conteúdo',
      isBody: true,
      required: true
    },
    {
      type: 'string',
      name: 'categories',
      label: 'Categorias',
      list: true,
      ui: {
        component: 'list'
      },
      options: [
        {value: 'tecnologia', label: 'Tecnologia'},
        {value: 'design', label: 'Design'},
        {value: 'desenvolvimento', label: 'Desenvolvimento'},
        {value: 'tutorial', label: 'Tutorial'},
        {value: 'opiniao', label: 'Opinião'},
        {value: 'noticias', label: 'Notícias'}
      ]
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
      type: 'boolean',
      name: 'draft',
      label: 'Rascunho',
      ui: {
        description: 'Marque para manter como rascunho'
      }
    },
    {
      type: 'object',
      name: 'seo',
      label: 'SEO',
      fields: [
        {
          type: 'string',
          name: 'meta_title',
          label: 'Meta Title'
        },
        {
          type: 'string',
          name: 'meta_description',
          label: 'Meta Description',
          ui: {
            component: 'textarea'
          }
        },
        {
          type: 'string',
          name: 'keywords',
          label: 'Keywords',
          list: true
        }
      ]
    }
  ]
};
