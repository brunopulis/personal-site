import {defineConfig, type TinaField} from 'tinacms';
import {slugifyString} from '../src/_config/filters/slugify.js';
import {categories} from '../src/_data/taxonomy.js';

const branch = process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || process.env.GITHUB_BRANCH || 'main';

const categoryOptions = (list: {label: string}[]): string[] => list.map(item => item.label);

const typeOptions = (values: string[]): {label: string; value: string}[] =>
  values.map(value => ({label: value, value}));

const ymd = (date?: string) => {
  const d = date ? new Date(date) : new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const postFields: TinaField[] = [
  {type: 'string', name: 'title', label: 'Título', isTitle: true, required: true},
  {type: 'string', name: 'subtitle', label: 'Subtítulo (opcional)'},
  {type: 'string', name: 'description', label: 'Descrição', ui: {component: 'textarea'}},
  {
    type: 'datetime',
    name: 'pubDate',
    label: 'Data de publicação',
    required: true,
    ui: {dateFormat: 'YYYY-MM-DD', timeFormat: ''}
  },
  {
    type: 'string',
    name: 'category',
    label: 'Categoria',
    required: true,
    options: categoryOptions(categories.posts),
    ui: {component: 'select'}
  },
  {type: 'string', name: 'tags', label: 'Tags', list: true, ui: {component: 'tags'}},
  {type: 'string', name: 'atUri', label: 'AT URI (Bluesky)'},
  {type: 'boolean', name: 'draft', label: 'Rascunho'},
  {type: 'image', name: 'featuredImage', label: 'Imagem de destaque'},
  {type: 'rich-text', name: 'body', label: 'Corpo', isBody: true}
];

const noteFields: TinaField[] = [
  {
    type: 'datetime',
    name: 'pubDate',
    label: 'Data',
    required: true,
    ui: {dateFormat: 'YYYY-MM-DD', timeFormat: ''}
  },
  {type: 'boolean', name: 'published', label: 'Publicado', required: true},
  {type: 'string', name: 'type', label: 'Tipo', options: ['note'], ui: {component: 'select'}},
  {type: 'string', name: 'tags', label: 'Tags', list: true, ui: {component: 'tags'}},
  {type: 'rich-text', name: 'body', label: 'Nota', isBody: true}
];

const movieFields: TinaField[] = [
  {type: 'string', name: 'title', label: 'Título', isTitle: true, required: true},
  {type: 'string', name: 'director', label: 'Diretor'},
  {
    type: 'string',
    name: 'type',
    label: 'Tipo',
    options: typeOptions(['movie']),
    ui: {component: 'select'}
  },
  {
    type: 'string',
    name: 'category',
    label: 'Gênero',
    required: true,
    options: categoryOptions(categories.movies),
    ui: {component: 'select'}
  },
  {
    type: 'string',
    name: 'status',
    label: 'Status',
    options: ['assistido', 'assistindo', 'planejado'],
    ui: {component: 'select'}
  },
  {type: 'number', name: 'rating', label: 'Nota (1–5)', ui: {component: 'number'}},
  {type: 'number', name: 'watchedYear', label: 'Ano', required: true},
  {type: 'image', name: 'poster', label: 'Pôster'},
  {type: 'string', name: 'url', label: 'Link (TMDB)'},
  {type: 'datetime', name: 'watchedDate', label: 'Data em que assistiu'},
  {type: 'boolean', name: 'favorite', label: 'Favorito'}
];

export default defineConfig({
  clientId: process.env.TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || '',
  branch,

  build: {
    publicFolder: '_site',
    outputFolder: 'admin'
  },

  media: {
    tina: {
      publicFolder: '_site',
      mediaRoot: 'src/assets/images'
    }
  },

  schema: {
    collections: [
      {
        name: 'post',
        label: 'Posts',
        path: 'src/content/posts',
        format: 'md',
        match: {include: '**/*'},
        defaultItem: () => ({
          pubDate: ymd(),
          category: 'Pessoal',
          tags: [],
          atUri: '',
          draft: false
        }),
        ui: {
          filename: {
            readonly: false,
            slugify: values => {
              const title = slugifyString(values?.title ?? '');
              return title ? `${ymd(values?.pubDate)}-${title}` : ymd(values?.pubDate);
            }
          }
        },
        fields: postFields
      },
      {
        name: 'note',
        label: 'Notas',
        path: 'src/content/notes',
        format: 'md',
        match: {include: '**/*'},
        defaultItem: () => ({
          pubDate: ymd(),
          published: true,
          type: 'note',
          tags: []
        }),
        ui: {
          filename: {
            readonly: true,
            slugify: values => ymd(values?.pubDate)
          }
        },
        fields: noteFields
      },
      {
        name: 'movie',
        label: 'Filmes',
        path: 'src/content/watching/movies',
        format: 'md',
        match: {include: '**/*'},
        defaultItem: () => ({
          type: 'movie',
          category: 'Ação',
          status: 'assistido',
          rating: 3,
          watchedYear: new Date().getFullYear(),
          watchedDate: new Date().toISOString(),
          favorite: false
        }),
        ui: {
          filename: {
            readonly: false,
            slugify: values => {
              const year = values?.watchedYear ?? new Date().getFullYear();
              const title = slugifyString(values?.title ?? '');
              return title ? `${year}-${title}` : String(year);
            }
          }
        },
        fields: movieFields
      }
    ]
  }
});
