// tina/config.ts
import { defineConfig } from "tinacms";

// tina/collections/post.ts
var PostCollection = {
  name: "post",
  label: "Blog",
  path: "src/content/posts",
  format: "md",
  defaultItem: () => {
    return {
      title: "Novo Post",
      author: "Pulis",
      publishDate: (/* @__PURE__ */ new Date()).toISOString(),
      seo: {
        meta_title: "",
        meta_description: "",
        keywords: []
      },
      tags: [],
      categories: [],
      draft: false,
      featured: false
    };
  },
  match: {
    include: "**/*"
  },
  ui: {
    filename: {
      slugify: (values) => {
        const date = values?.publishDate ? new Date(values.publishDate) : /* @__PURE__ */ new Date();
        const year = date.getFullYear();
        const slug = values?.title?.toLowerCase().trim().replaceAll(/\s+/g, "-").replaceAll(/[^\w-]/g, "") || "post";
        const locale = "pt-br";
        return `${locale}/${year}/${slug}`;
      }
    }
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
      name: "publishDate",
      label: "Data de Publica\xE7\xE3o",
      required: true,
      ui: {
        dateFormat: "DD/MM/YYYY",
        timeFormat: "HH:mm"
      }
    },
    {
      type: "string",
      name: "author",
      label: "Autor",
      required: true
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
      label: "Imagem Destaque"
    },
    {
      type: "rich-text",
      name: "body",
      label: "Conte\xFAdo",
      isBody: true,
      required: true
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
      ]
    },
    {
      type: "string",
      name: "tags",
      label: "Tags",
      list: true,
      ui: {
        component: "tags"
      }
    },
    {
      type: "boolean",
      name: "draft",
      label: "Rascunho",
      ui: {
        description: "Marque para manter como rascunho"
      }
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
          list: true
        }
      ]
    }
  ]
};

// tina/collections/page.ts
var PageCollection = {
  name: "page",
  label: "P\xE1ginas",
  path: "src/content/pages",
  format: "md",
  match: {
    include: "*"
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
      }
    },
    {
      type: "string",
      name: "permalink",
      label: "Permalink"
    },
    {
      type: "rich-text",
      name: "body",
      label: "Conte\xFAdo",
      isBody: true
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
    include: "*"
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
      label: "Slug"
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
      name: "permalink",
      label: "Permalink"
    },
    {
      type: "object",
      name: "service",
      label: "Detalhes do Servi\xE7o",
      fields: [
        {
          type: "string",
          name: "color",
          label: "Cor (Tailwind Class)"
        },
        {
          type: "string",
          name: "tagline",
          label: "Tagline"
        },
        {
          type: "string",
          name: "icon",
          label: "\xCDcone (Emoji)"
        },
        {
          type: "string",
          name: "problem",
          label: "Problema",
          ui: {
            component: "textarea"
          }
        },
        {
          type: "string",
          name: "solution",
          label: "Solu\xE7\xE3o",
          ui: {
            component: "textarea"
          }
        },
        {
          type: "string",
          name: "differentials",
          label: "Diferenciais",
          list: true
        },
        {
          type: "string",
          name: "included",
          label: "O que est\xE1 incluso",
          list: true
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
          ]
        },
        {
          type: "string",
          name: "target",
          label: "P\xFAblico Alvo",
          list: true
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
          ]
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
          ]
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
          ]
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
          ]
        }
      ]
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
      type: "datetime",
      name: "pubDate",
      label: "Data de Publica\xE7\xE3o",
      required: true,
      ui: {
        dateFormat: "DD/MM/YYYY",
        timeFormat: "HH:mm"
      }
    },
    {
      type: "boolean",
      name: "published",
      label: "Publicado"
    },
    {
      type: "string",
      name: "type",
      label: "Tipo",
      options: [{ value: "note", label: "Nota" }]
    },
    {
      type: "string",
      name: "tags",
      label: "Tags",
      list: true,
      ui: {
        component: "tags"
      }
    },
    {
      type: "rich-text",
      name: "body",
      label: "Conte\xFAdo",
      isBody: true
    }
  ]
};

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
      label: "Autor"
    },
    {
      type: "string",
      name: "category",
      label: "Categoria"
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
      ]
    },
    {
      type: "number",
      name: "rating",
      label: "Avalia\xE7\xE3o",
      ui: {
        component: "number"
      }
    },
    {
      type: "image",
      name: "cover",
      label: "Capa"
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
      name: "thoughts",
      label: "Pensamentos",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "string",
      name: "quotes",
      label: "Cita\xE7\xF5es",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "string",
      name: "attendedYear",
      label: "Ano de Leitura"
    },
    {
      type: "string",
      name: "recommendBy",
      label: "Recomendado por"
    },
    {
      type: "string",
      name: "tags",
      label: "Tags",
      list: true,
      ui: {
        component: "tags"
      }
    },
    {
      type: "string",
      name: "url",
      label: "URL"
    },
    {
      type: "datetime",
      name: "date",
      label: "Data",
      ui: {
        dateFormat: "DD/MM/YYYY"
      }
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
      isTitle: true,
      required: true
    },
    {
      type: "string",
      name: "issue",
      label: "Edi\xE7\xE3o"
    },
    {
      type: "datetime",
      name: "pubDate",
      label: "Data de Publica\xE7\xE3o",
      ui: {
        dateFormat: "DD/MM/YYYY"
      }
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
  path: "src/content/media",
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
      label: "Diretor"
    },
    {
      type: "string",
      name: "category",
      label: "Categoria"
    },
    {
      type: "string",
      name: "status",
      label: "Status",
      options: [
        { value: "assistido", label: "Assistido" },
        { value: "assistindo", label: "Assistindo" },
        { value: "quero-assistir", label: "Quero Assistir" }
      ]
    },
    {
      type: "number",
      name: "rating",
      label: "Avalia\xE7\xE3o",
      ui: {
        component: "number"
      }
    },
    {
      type: "image",
      name: "poster",
      label: "Poster"
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
      name: "thoughts",
      label: "Pensamentos",
      ui: {
        component: "textarea"
      }
    },
    {
      type: "number",
      name: "attendedYear",
      label: "Ano Assistido"
    },
    {
      type: "string",
      name: "recommendBy",
      label: "Recomendado por"
    },
    {
      type: "string",
      name: "tags",
      label: "Tags",
      list: true,
      ui: {
        component: "tags"
      }
    },
    {
      type: "string",
      name: "url",
      label: "URL"
    },
    {
      type: "datetime",
      name: "date",
      label: "Data",
      ui: {
        dateFormat: "DD/MM/YYYY"
      }
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
      type: "datetime",
      name: "date",
      label: "Data",
      ui: {
        dateFormat: "DD/MM/YYYY"
      }
    },
    {
      type: "rich-text",
      name: "body",
      label: "Conte\xFAdo",
      isBody: true
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
      label: "Tipo"
    },
    {
      type: "string",
      name: "detail",
      label: "Detalhes"
    },
    {
      type: "datetime",
      name: "pubDate",
      label: "Data de Publica\xE7\xE3o",
      ui: {
        dateFormat: "DD/MM/YYYY"
      }
    },
    {
      type: "string",
      name: "tags",
      label: "Tags",
      list: true,
      ui: {
        component: "tags"
      }
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
      }
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
  name: "gallery",
  label: "Galeria",
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
      }
    },
    {
      type: "image",
      name: "image",
      label: "Imagem"
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
var config_default = defineConfig({
  branch,
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,
  // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "dist"
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
  }
});
export {
  config_default as default
};
