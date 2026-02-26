// tina/config.ts
import { defineConfig } from "tinacms";

// tina/collections/book.ts
var BookCollection = {
  name: "book",
  label: "Livros",
  path: "src/content/books",
  format: "md",
  match: {
    include: "**/*"
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo",
      isTitle: true,
      required: true
    },
    {
      type: "string",
      name: "author",
      label: "Autor",
      searchable: false
    },
    {
      type: "string",
      name: "category",
      label: "Categoria",
      searchable: false
    },
    {
      type: "string",
      name: "status",
      label: "Status",
      options: [
        { value: "lido", label: "Lido" },
        { value: "lendo", label: "Lendo" },
        { value: "quero-ler", label: "Quero Ler" },
        { value: "abandonado", label: "Abandonado" }
      ],
      searchable: false
    },
    {
      type: "number",
      name: "rating",
      label: "Avalia\xE7\xE3o",
      ui: {
        component: "number"
      },
      searchable: false
    },
    {
      type: "image",
      name: "cover",
      label: "Capa",
      searchable: false
    },
    {
      type: "string",
      name: "description",
      label: "Descri\xE7\xE3o",
      ui: {
        component: "textarea"
      },
      searchable: false
    },
    {
      type: "string",
      name: "thoughts",
      label: "Pensamentos",
      ui: {
        component: "textarea"
      },
      searchable: false
    },
    {
      type: "string",
      name: "quotes",
      label: "Cita\xE7\xF5es",
      ui: {
        component: "textarea"
      },
      searchable: false
    },
    {
      type: "number",
      name: "attendedYear",
      label: "Ano de Leitura",
      searchable: false
    },
    {
      type: "string",
      name: "recommendBy",
      label: "Recomendado por",
      searchable: false
    },
    {
      type: "string",
      name: "tags",
      label: "Tags",
      list: true,
      ui: {
        component: "tags"
      },
      searchable: false
    },
    {
      type: "string",
      name: "url",
      label: "URL",
      searchable: false
    },
    {
      type: "datetime",
      name: "pubDate",
      label: "Data",
      ui: {
        dateFormat: "DD/MM/YYYY"
      },
      searchable: false
    },
    {
      type: "rich-text",
      name: "body",
      label: "Conte\xFAdo",
      isBody: true
    }
  ]
};

// tina/collections/bookmark.ts
var BookmarkCollection = {
  name: "bookmark",
  label: "Bookmarks",
  path: "src/content/bookmarks",
  format: "md",
  match: {
    include: "**/*"
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo",
      isTitle: true,
      required: true
    },
    {
      type: "string",
      name: "url",
      label: "URL"
    },
    {
      type: "datetime",
      name: "pubDate",
      label: "Data",
      ui: {
        dateFormat: "DD/MM/YYYY"
      },
      searchable: false
    },
    {
      type: "rich-text",
      name: "body",
      label: "Conte\xFAdo",
      isBody: true
    }
  ]
};

// tina/collections/gallery.ts
var GalleryCollection = {
  name: "photos",
  label: "Galeria de Fotos",
  path: "src/content/gallery",
  format: "md",
  match: {
    include: "**/*"
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo",
      isTitle: true,
      required: true
    },
    {
      type: "datetime",
      name: "date",
      label: "Data",
      ui: {
        dateFormat: "DD/MM/YYYY"
      },
      searchable: false
    },
    {
      type: "image",
      name: "image",
      label: "Imagem",
      searchable: false
    },
    {
      type: "rich-text",
      name: "body",
      label: "Conte\xFAdo",
      isBody: true
    }
  ]
};

// tina/collections/media.ts
var MediaCollection = {
  name: "media",
  label: "M\xEDdia (Filmes/S\xE9ries)",
  path: "src/content/medias",
  format: "md",
  match: {
    include: "**/*"
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo",
      isTitle: true,
      required: true
    },
    {
      type: "string",
      name: "director",
      label: "Diretor",
      searchable: false
    },
    {
      type: "string",
      name: "category",
      label: "Categoria",
      searchable: false
    },
    {
      type: "string",
      name: "status",
      label: "Status",
      options: [
        { value: "assistido", label: "Assistido" },
        { value: "assistindo", label: "Assistindo" },
        { value: "quero-assistir", label: "Quero Assistir" }
      ],
      searchable: false
    },
    {
      type: "number",
      name: "rating",
      label: "Avalia\xE7\xE3o",
      ui: {
        component: "number"
      },
      searchable: false
    },
    {
      type: "image",
      name: "poster",
      label: "Poster",
      searchable: false
    },
    {
      type: "string",
      name: "description",
      label: "Descri\xE7\xE3o",
      ui: {
        component: "textarea"
      },
      searchable: false
    },
    {
      type: "string",
      name: "thoughts",
      label: "Pensamentos",
      ui: {
        component: "textarea"
      },
      searchable: false
    },
    {
      type: "number",
      name: "watchedYear",
      label: "Ano Assistido",
      searchable: false
    },
    {
      type: "string",
      name: "recommendBy",
      label: "Recomendado por",
      searchable: false
    },
    {
      type: "string",
      name: "tags",
      label: "Tags",
      list: true,
      ui: {
        component: "tags"
      },
      searchable: false
    },
    {
      type: "string",
      name: "url",
      label: "URL",
      searchable: false
    },
    {
      type: "datetime",
      name: "watchedDate",
      label: "Data",
      ui: {
        dateFormat: "DD/MM/YYYY"
      },
      searchable: false
    },
    {
      type: "rich-text",
      name: "body",
      label: "Conte\xFAdo",
      isBody: true
    }
  ]
};

// tina/collections/newsletter.ts
var NewsletterCollection = {
  name: "newsletter",
  label: "Newsletter",
  path: "src/content/newsletter",
  format: "md",
  match: {
    include: "**/*"
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo",
      required: true
    },
    {
      type: "string",
      name: "issue",
      label: "Edi\xE7\xE3o",
      searchable: false
    },
    {
      type: "datetime",
      name: "pubDate",
      label: "Data de Publica\xE7\xE3o",
      ui: {
        dateFormat: "DD/MM/YYYY"
      },
      searchable: false
    },
    {
      type: "rich-text",
      name: "body",
      label: "Conte\xFAdo",
      isBody: true
    }
  ]
};

// tina/collections/note.ts
var NoteCollection = {
  name: "note",
  label: "Notas",
  path: "src/content/notes",
  format: "md",
  match: {
    include: "**/*"
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo"
    },
    {
      type: "datetime",
      name: "pubDate",
      label: "Data de Publica\xE7\xE3o",
      required: true,
      ui: {
        dateFormat: "DD/MM/YYYY",
        timeFormat: "HH:mm"
      },
      searchable: false
    },
    {
      type: "boolean",
      name: "published",
      label: "Publicado",
      searchable: false
    },
    {
      type: "string",
      name: "type",
      label: "Tipo",
      options: [{ value: "note", label: "Nota" }],
      searchable: false
    },
    {
      type: "string",
      name: "tags",
      label: "Tags",
      list: true,
      ui: {
        component: "tags"
      },
      searchable: false
    },
    {
      type: "rich-text",
      name: "body",
      label: "Conte\xFAdo",
      isBody: true
    }
  ]
};

// tina/collections/page.ts
var PageCollection = {
  name: "page",
  label: "P\xE1ginas",
  path: "src/pages",
  format: "md",
  match: {
    include: "*",
    exclude: "services/**/*"
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo",
      isTitle: true,
      required: true
    },
    {
      type: "string",
      name: "description",
      label: "Descri\xE7\xE3o",
      ui: {
        component: "textarea"
      },
      searchable: false
    },
    {
      type: "string",
      name: "permalink",
      label: "Permalink",
      searchable: false
    },
    {
      type: "rich-text",
      name: "body",
      label: "Conte\xFAdo",
      isBody: true
    }
  ]
};

// tina/collections/post.ts
var PostCollection = {
  name: "post",
  label: "Blog",
  path: "src/content/posts",
  format: "md",
  match: {
    include: "**/*"
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo",
      isTitle: true,
      required: true
    },
    {
      type: "datetime",
      name: "date",
      label: "Data de Publica\xE7\xE3o",
      required: true,
      ui: {
        dateFormat: "DD/MM/YYYY"
      },
      searchable: false
    },
    {
      type: "string",
      name: "description",
      label: "Descri\xE7\xE3o/Resumo",
      required: true,
      ui: {
        component: "textarea",
        description: "Resumo do post para SEO e preview"
      }
    },
    {
      type: "image",
      name: "featured_image",
      label: "Imagem Destaque",
      searchable: false
    },
    {
      type: "rich-text",
      name: "body",
      label: "Conte\xFAdo",
      isBody: true
    },
    {
      type: "string",
      name: "categories",
      label: "Categorias",
      list: true,
      ui: {
        component: "list"
      },
      options: [
        { value: "tecnologia", label: "Tecnologia" },
        { value: "design", label: "Design" },
        { value: "desenvolvimento", label: "Desenvolvimento" },
        { value: "tutorial", label: "Tutorial" },
        { value: "opiniao", label: "Opini\xE3o" },
        { value: "noticias", label: "Not\xEDcias" }
      ],
      searchable: false
    },
    {
      type: "string",
      name: "tags",
      label: "Tags",
      list: true,
      ui: {
        component: "tags"
      },
      searchable: false
    },
    {
      type: "boolean",
      name: "draft",
      label: "Rascunho",
      ui: {
        description: "Marque para manter como rascunho"
      },
      searchable: false
    },
    {
      type: "object",
      name: "seo",
      label: "SEO",
      fields: [
        {
          type: "string",
          name: "meta_title",
          label: "Meta Title"
        },
        {
          type: "string",
          name: "meta_description",
          label: "Meta Description",
          ui: {
            component: "textarea"
          }
        },
        {
          type: "string",
          name: "keywords",
          label: "Keywords",
          list: true,
          searchable: false
        }
      ],
      searchable: false
    }
  ]
};

// tina/collections/service.ts
var ServiceCollection = {
  name: "service",
  label: "Servi\xE7os",
  path: "src/content/pages/services",
  format: "md",
  match: {
    include: "**/*"
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo",
      isTitle: true,
      required: true
    },
    {
      type: "string",
      name: "slug",
      label: "Slug",
      searchable: false
    },
    {
      type: "string",
      name: "description",
      label: "Descri\xE7\xE3o",
      ui: {
        component: "textarea"
      },
      searchable: false
    },
    {
      type: "string",
      name: "permalink",
      label: "Permalink",
      searchable: false
    },
    {
      type: "string",
      name: "url",
      label: "URL",
      searchable: false
    },
    {
      type: "object",
      name: "service",
      label: "Detalhes do Servi\xE7o",
      fields: [
        {
          type: "string",
          name: "color",
          label: "Cor (Tailwind Class)",
          searchable: false
        },
        {
          type: "string",
          name: "tagline",
          label: "Tagline",
          searchable: false
        },
        {
          type: "string",
          name: "icon",
          label: "\xCDcone (Emoji)",
          searchable: false
        },
        {
          type: "string",
          name: "problem",
          label: "Problema",
          ui: {
            component: "textarea"
          },
          searchable: false
        },
        {
          type: "string",
          name: "solution",
          label: "Solu\xE7\xE3o",
          ui: {
            component: "textarea"
          },
          searchable: false
        },
        {
          type: "string",
          name: "differentials",
          label: "Diferenciais",
          list: true,
          searchable: false
        },
        {
          type: "string",
          name: "included",
          label: "O que est\xE1 incluso",
          list: true,
          searchable: false
        },
        {
          type: "object",
          name: "results",
          label: "Resultados",
          list: true,
          fields: [
            {
              type: "string",
              name: "title",
              label: "T\xEDtulo"
            },
            {
              type: "string",
              name: "description",
              label: "Descri\xE7\xE3o"
            }
          ],
          searchable: false
        },
        {
          type: "string",
          name: "target",
          label: "P\xFAblico Alvo",
          list: true,
          searchable: false
        },
        {
          type: "object",
          name: "processes",
          label: "Processo",
          list: true,
          fields: [
            {
              type: "string",
              name: "title",
              label: "T\xEDtulo"
            },
            {
              type: "string",
              name: "description",
              label: "Descri\xE7\xE3o"
            }
          ],
          searchable: false
        },
        {
          type: "string",
          name: "timeline",
          label: "Timeline",
          searchable: false
        },
        {
          type: "object",
          name: "plans",
          label: "Planos",
          list: true,
          fields: [
            {
              type: "string",
              name: "name",
              label: "Nome"
            },
            {
              type: "boolean",
              name: "highlight",
              label: "Destaque"
            },
            {
              type: "string",
              name: "subtitle",
              label: "Subt\xEDtulo"
            },
            {
              type: "string",
              name: "description",
              label: "Descri\xE7\xE3o",
              ui: {
                component: "textarea"
              }
            },
            {
              type: "string",
              name: "includes",
              label: "Incluso",
              list: true,
              searchable: false
            },
            {
              type: "string",
              name: "delivery",
              label: "Entrega"
            }
          ],
          searchable: false
        },
        {
          type: "object",
          name: "testimonials",
          label: "Depoimentos",
          fields: [
            {
              type: "string",
              name: "cliente",
              label: "Cliente"
            },
            {
              type: "string",
              name: "quote",
              label: "Cita\xE7\xE3o",
              ui: {
                component: "textarea"
              }
            },
            {
              type: "string",
              name: "resultado",
              label: "Resultado"
            }
          ],
          searchable: false
        },
        {
          type: "object",
          name: "faq",
          label: "FAQ",
          list: true,
          fields: [
            {
              type: "string",
              name: "question",
              label: "Pergunta"
            },
            {
              type: "string",
              name: "answer",
              label: "Resposta",
              ui: {
                component: "textarea"
              }
            }
          ],
          searchable: false
        },
        {
          type: "object",
          name: "cta",
          label: "Call to Action",
          fields: [
            {
              type: "string",
              name: "title",
              label: "T\xEDtulo"
            },
            {
              type: "string",
              name: "description",
              label: "Descri\xE7\xE3o"
            },
            {
              type: "string",
              name: "primary",
              label: "Bot\xE3o Prim\xE1rio"
            },
            {
              type: "string",
              name: "secondary",
              label: "Bot\xE3o Secund\xE1rio"
            },
            {
              type: "string",
              name: "link",
              label: "Link"
            }
          ],
          searchable: false
        }
      ]
    }
  ]
};

// tina/collections/stream.ts
var StreamCollection = {
  name: "stream",
  label: "Streams",
  path: "src/content/streams",
  format: "md",
  match: {
    include: "**/*"
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo",
      isTitle: true,
      required: true
    },
    {
      type: "string",
      name: "type",
      label: "Tipo",
      searchable: false
    },
    {
      type: "string",
      name: "detail",
      label: "Detalhes",
      searchable: false
    },
    {
      type: "datetime",
      name: "pubDate",
      label: "Data de Publica\xE7\xE3o",
      ui: {
        dateFormat: "DD/MM/YYYY"
      },
      searchable: false
    },
    {
      type: "string",
      name: "tags",
      label: "Tags",
      list: true,
      ui: {
        component: "tags"
      },
      searchable: false
    },
    {
      type: "rich-text",
      name: "body",
      label: "Conte\xFAdo",
      isBody: true
    }
  ]
};

// tina/collections/talk.ts
var TalkCollection = {
  name: "talk",
  label: "Palestras",
  path: "src/content/talks",
  format: "md",
  match: {
    include: "**/*"
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo",
      isTitle: true,
      required: true
    },
    {
      type: "datetime",
      name: "date",
      label: "Data",
      ui: {
        dateFormat: "DD/MM/YYYY"
      },
      searchable: false
    },
    {
      type: "rich-text",
      name: "body",
      label: "Conte\xFAdo",
      isBody: true
    }
  ]
};

// tina/config.ts
var branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";
var _isLocal = !process.env.TINA_SEARCH;
var config_default = defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "./"
  },
  media: {
    tina: {
      mediaRoot: "assets/images",
      publicFolder: "src"
    }
  },
  schema: {
    collections: [
      PostCollection,
      PageCollection,
      ServiceCollection,
      NoteCollection,
      BookCollection,
      NewsletterCollection,
      MediaCollection,
      BookmarkCollection,
      StreamCollection,
      TalkCollection,
      GalleryCollection
    ]
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH,
      stopwordLanguages: ["por"]
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100
  }
});
export {
  config_default as default
};
