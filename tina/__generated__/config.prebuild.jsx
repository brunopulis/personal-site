// tina/config.ts
import { defineConfig } from "tinacms";

// tina/collections/blog.ts
var BlogCollection = {
  name: "post",
  label: "Blog",
  path: "src/content/blog",
  defaultItem: () => {
    return {
      title: "Novo Post",
      author: "Pulis",
      seo: {
        meta_title: "",
        meta_description: "",
        keywords: [],
      },
      tags: [],
      categories: [],
      draft: false,
      featured: false,
    };
  },
  match: {
    include: "*",
  },
  format: "md",
  ui: {
    filename: {
      slugify: values => {
        return `${values?.title?.toLowerCase().replace(/ /g, "-")}`;
      },
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo",
      isTitle: true,
      required: true,
    },
    {
      type: "datetime",
      name: "publishDate",
      label: "Data de Publica\xE7\xE3o",
      required: true,
      ui: {
        dateFormat: "DD/MM/YYYY",
        timeFormat: "HH:mm",
      },
    },
    {
      type: "string",
      name: "author",
      label: "Autor",
      required: true,
    },
    {
      type: "string",
      name: "description",
      label: "Descri\xE7\xE3o/Resumo",
      required: true,
      ui: {
        component: "textarea",
        description: "Resumo do post para SEO e preview",
      },
    },
    {
      type: "image",
      name: "featured_image",
      label: "Imagem Destaque",
    },
    {
      type: "rich-text",
      name: "body",
      label: "Conte\xFAdo",
      isBody: true,
      required: true,
    },
    {
      type: "string",
      name: "categories",
      label: "Categorias",
      list: true,
      ui: {
        component: "list",
      },
      options: [
        { value: "tecnologia", label: "Tecnologia" },
        { value: "design", label: "Design" },
        { value: "desenvolvimento", label: "Desenvolvimento" },
        { value: "tutorial", label: "Tutorial" },
        { value: "opiniao", label: "Opini\xE3o" },
        { value: "noticias", label: "Not\xEDcias" },
      ],
    },
    {
      type: "string",
      name: "tags",
      label: "Tags",
      list: true,
      ui: {
        component: "tags",
      },
    },
    {
      type: "boolean",
      name: "draft",
      label: "Rascunho",
      ui: {
        description: "Marque para manter como rascunho",
      },
    },
    {
      type: "object",
      name: "seo",
      label: "SEO",
      fields: [
        {
          type: "string",
          name: "meta_title",
          label: "Meta Title",
        },
        {
          type: "string",
          name: "meta_description",
          label: "Meta Description",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "string",
          name: "keywords",
          label: "Keywords",
          list: true,
        },
      ],
    },
  ],
};

// tina/collections/blogroll.ts
var BlogrollCollection = {
  name: "blogroll",
  label: "Blogroll",
  path: "src/content/blogroll",
  match: {
    include: "*",
  },
  format: "md",
  ui: {
    filename: {
      slugify: values => {
        return `${values?.title?.toLowerCase().replace(/ /g, "-")}`;
      },
    },
  },
  defaultItem: () => {
    return {
      category: "geral",
      // valor padrão
    };
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "Nome do Site/Blog",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "url",
      label: "URL",
      required: true,
      ui: {
        description: "URL completa (https://exemplo.com)",
      },
    },
    {
      type: "string",
      name: "description",
      label: "Descri\xE7\xE3o",
      ui: {
        component: "textarea",
        description: "Breve descri\xE7\xE3o do site/blog",
      },
    },
    {
      type: "string",
      name: "category",
      label: "Categoria",
      required: true,
      options: [
        { value: "acessibilidade", label: "Acessibilidade" },
        { value: "desenvolvimento", label: "Desenvolvimento" },
        { value: "design", label: "Design" },
        { value: "educacao", label: "Educa\xE7\xE3o" },
        { value: "entretenimento", label: "Entretenimento" },
        { value: "escrita", label: "Escrita" },
        { value: "geral", label: "Geral" },
        { value: "tecnologia", label: "Tecnologia" },
        { value: "teologia", label: "Teologia" },
        { value: "produtividade", label: "Produtividade" },
        { value: "noticias", label: "Not\xEDcias" },
      ],
    },
    {
      type: "string",
      name: "rss_feed",
      label: "Feed RSS",
      ui: {
        description: "URL do feed RSS (se dispon\xEDvel)",
      },
    },
    {
      type: "datetime",
      name: "date_added",
      label: "Data de Adi\xE7\xE3o",
      ui: {
        dateFormat: "DD/MM/YYYY",
      },
    },
  ],
};

// tina/collections/notas.ts
var NotasCollection = {
  name: "note",
  label: "Notas",
  path: "src/content/notes",
  match: {
    include: "*",
  },
  format: "md",
  defaultItem: () => ({
    pubDate: /* @__PURE__ */ new Date().toISOString(),
    body: "",
    tags: [],
  }),
  ui: {
    filename: {
      slugify: values => {
        const date = new Date(values?.pubDate || Date.now());
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(date.getDate()).padStart(2, "0")}`;
      },
    },
  },
  fields: [
    {
      type: "datetime",
      name: "pubDate",
      label: "Data de Publica\xE7\xE3o",
      required: true,
      ui: {
        dateFormat: "DD/MM/YYYY",
        timeFormat: "HH:mm",
      },
    },
    {
      type: "image",
      name: "featured_image",
      label: "Imagem Destaque",
    },
    {
      type: "rich-text",
      name: "body",
      label: "Conte\xFAdo",
      isBody: true,
      required: true,
    },
    {
      type: "string",
      name: "tags",
      label: "Tags",
      list: true,
      options: [
        { value: "pessoal", label: "Pessoal" },
        { value: "trabalho", label: "Trabalho" },
        { value: "estudos", label: "Estudos" },
        { value: "ideias", label: "Ideias" },
        { value: "projetos", label: "Projetos" },
        { value: "lembretes", label: "Lembretes" },
        { value: "anotacoes", label: "Anota\xE7\xF5es" },
      ],
    },
  ],
};

// tina/collections/biblioteca.ts
var BibliotecaCollection = {
  name: "book",
  label: "Meus Livros",
  path: "src/content/biblioteca",
  match: {
    include: "*",
  },
  format: "md",
  defaultItem: () => {
    return {
      title: "Novo Livro",
      status: ["quero_ler"],
      // garantir array
      tags: [],
      category: [],
      rating: "3",
    };
  },
  ui: {
    filename: {
      slugify: values => {
        return `${values?.title?.toLowerCase().replace(/ /g, "-")}`;
      },
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo do Livro",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "description",
      label: "Descri\xE7\xE3o/Resumo",
      ui: {
        component: "textarea",
        description: "Breve resumo do livro",
      },
    },
    {
      type: "string",
      name: "author",
      label: "Autor(es)",
      required: true,
    },
    {
      type: "datetime",
      name: "publishDate",
      label: "Data de Publica\xE7\xE3o",
      required: true,
      ui: {
        dateFormat: "DD/MM/YYYY",
        timeFormat: "HH:mm",
      },
    },
    {
      type: "rich-text",
      name: "body",
      label: "Resenha e Cita\xE7\xF5es",
      isBody: true,
      ui: {
        description: "Suas impress\xF5es, an\xE1lise e cita\xE7\xF5es favoritas",
      },
    },
    {
      type: "string",
      name: "category",
      label: "Categoria",
      list: true,
      required: true,
      options: [
        { value: "Fic\xE7\xE3o", label: "Fic\xE7\xE3o" },
        { value: "N\xE3o Fic\xE7\xE3o", label: "N\xE3o Fic\xE7\xE3o" },
        { value: "T\xE9cnicos", label: "T\xE9cnicos" },
        { value: "Neg\xF3cios", label: "Neg\xF3cios" },
        { value: "Finan\xE7as e investimentos", label: "Finan\xE7as e investimentos" },
        { value: "Empreendedorismo", label: "Empreendedorismo" },
        { value: "Produtividade", label: "Produtividade" },
        { value: "Autoajuda", label: "Autoajuda" },
        { value: "Filosofia", label: "Filosofia" },
        { value: "Religiao", label: "Religi\xE3o" },
        { value: "Teologia", label: "Teologia" },
        { value: "Politica", label: "Pol\xEDtica" },
        { value: "Educacao", label: "Educa\xE7\xE3o" },
        { value: "M\xFAsica", label: "M\xFAsica" },
        { value: "Arte", label: "Arte" },
        { value: "Humor", label: "Humor" },
        { value: "Poesia", label: "Poesia" },
        { value: "Quadrinhos", label: "Quadrinhos" },
      ],
    },
    {
      type: "image",
      name: "cover",
      label: "Capa do Livro",
    },
    {
      type: "string",
      name: "rating",
      label: "\u2B50 Avalia\xE7\xE3o",
      options: [
        { value: "1", label: "\u2B50 1 de 5" },
        { value: "2", label: "\u2B50\u2B50 2 de 5" },
        { value: "3", label: "\u2B50\u2B50\u2B50 3 de 5" },
        { value: "4", label: "\u2B50\u2B50\u2B50\u2B50 4 de 5" },
        { value: "5", label: "\u2B50\u2B50\u2B50\u2B50\u2B50 5 de 5" },
      ],
    },
    {
      type: "string",
      name: "status",
      label: "Status",
      required: true,
      list: true,
      options: [
        { value: "quero_ler", label: "Quero ler" },
        { value: "lido", label: "Lido" },
        { value: "lendo", label: "Lendo" },
        { value: "abandonado", label: "Abandonado" },
      ],
    },
    {
      type: "datetime",
      name: "reading_date",
      label: "Data de leitura",
      ui: {
        dateFormat: "DD/MM/YYYY",
        description: "Quando voc\xEA leu o livro",
      },
    },
    {
      type: "number",
      name: "pages",
      label: "N\xFAmero de P\xE1ginas",
      ui: {
        description: "Total de p\xE1ginas do livro",
      },
    },
    {
      type: "string",
      name: "recommended_for",
      label: "Recomendado por:",
      ui: {
        description: "Quem te recomendou esse livro?",
      },
    },
    {
      type: "string",
      name: "purchase_link",
      label: "Onde Comprar/Encontrar",
      ui: {
        description: "Link para comprar ou encontrar o livro",
      },
    },
    {
      type: "string",
      name: "tags",
      label: "Tags",
      list: true,
      ui: {
        component: "tags",
      },
    },
  ],
};

// tina/collections/movies.ts
var MoviesCollection = {
  name: "movie",
  label: "Meus Filmes",
  path: "src/content/movies",
  match: {
    include: "*",
  },
  format: "md",
  defaultItem: () => ({
    title: "Novo filme",
    publishDate: /* @__PURE__ */ new Date().toISOString(),
    status: "quero_assistir",
    favorite: false,
    rating: "3",
    description: "",
    body: "",
    tags: [],
    draft: false,
    featured: false,
  }),
  ui: {
    filename: {
      slugify: values => {
        return `${values?.title?.toLowerCase().replace(/ /g, "-")}`;
      },
    },
  },
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo do Filme",
      isTitle: true,
      required: true,
    },
    {
      type: "rich-text",
      name: "body",
      label: "Resenha/Coment\xE1rios",
      isBody: true,
      ui: {
        description: "Suas impress\xF5es e an\xE1lise do filme",
      },
    },
    {
      type: "string",
      name: "genres",
      label: "G\xEAneros",
      list: true,
      required: true,
      ui: {
        component: "list",
      },
      options: [
        { value: "acao", label: "A\xE7\xE3o" },
        { value: "animacao", label: "Anima\xE7\xE3o" },
        { value: "aventura", label: "Aventura" },
        { value: "comedia", label: "Com\xE9dia" },
        { value: "crime", label: "Crime" },
        { value: "documentario", label: "Document\xE1rio" },
        { value: "drama", label: "Drama" },
        { value: "fantasia", label: "Fantasia" },
        { value: "ficcao-cientifica", label: "Fic\xE7\xE3o Cient\xEDfica" },
        { value: "guerra", label: "Guerra" },
        { value: "horror", label: "Horror" },
        { value: "musical", label: "Musical" },
        { value: "romance", label: "Romance" },
        { value: "suspense", label: "Suspense" },
        { value: "western", label: "Western" },
      ],
    },
    {
      type: "image",
      name: "poster",
      label: "Poster",
    },
    {
      type: "string",
      name: "rating",
      label: "\u2B50 Avalia\xE7\xE3o",
      options: [
        { value: "1", label: "\u2B50 1 de 5" },
        { value: "2", label: "\u2B50\u2B50 2 de 5" },
        { value: "3", label: "\u2B50\u2B50\u2B50 3 de 5" },
        { value: "4", label: "\u2B50\u2B50\u2B50\u2B50 4 de 5" },
        { value: "5", label: "\u2B50\u2B50\u2B50\u2B50\u2B50 5 de 5" },
      ],
    },
    {
      type: "string",
      name: "status",
      label: "Status",
      required: true,
      options: [
        { value: "assistido", label: "Assistido" },
        { value: "assistindo", label: "Assistindo" },
        { value: "quero_assistir", label: "uero Assistir" },
        { value: "abandonado", label: "Abandonado" },
      ],
    },
    {
      type: "datetime",
      name: "watched_date",
      label: "Data Assistida",
      ui: {
        dateFormat: "DD/MM/YYYY",
        description: "Quando voc\xEA assistiu o filme",
      },
    },
    {
      type: "boolean",
      name: "favorite",
      label: "\u2764\uFE0F Favorito",
    },
    {
      type: "string",
      name: "streaming",
      label: "Onde Assistir",
      list: true,
      ui: {
        component: "list",
      },
      options: [
        { value: "netflix", label: "Netflix" },
        { value: "amazon-prime", label: "Amazon Prime" },
        { value: "disney-plus", label: "Disney+" },
        { value: "hbo-max", label: "HBO Max" },
        { value: "apple-tv", label: "Apple TV+" },
        { value: "paramount-plus", label: "Paramount+" },
        { value: "globoplay", label: "Globoplay" },
        { value: "star-plus", label: "Star+" },
        { value: "outro", label: "Outro" },
      ],
    },
    {
      type: "string",
      name: "tags",
      label: "Tags",
      list: true,
      ui: {
        component: "tags",
      },
    },
    {
      type: "string",
      name: "notes",
      label: "Observa\xE7\xF5es Extras",
      ui: {
        component: "textarea",
      },
    },
  ],
};

// tina/collections/newsletter.ts
var NewsletterCollection = {
  name: "newsletter",
  label: "Newsletter",
  path: "src/content/newsletter",
  match: {
    include: "*",
  },
  format: "md",
  defaultItem: () => ({
    title: "Nova Newsletter",
    issue: "1",
    body: "",
  }),
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "issue",
      label: "Edi\xE7\xE3o",
      required: true,
    },
    {
      type: "image",
      name: "coverImage",
      label: "Imagem de Capa",
    },
    {
      type: "rich-text",
      name: "body",
      label: "Conte\xFAdo",
      isBody: true,
    },
  ],
};

// tina/collections/speaking.ts
var SpeakingCollection = {
  name: "speaking",
  label: "Palestras",
  path: "src/content/speaking",
  match: {
    include: "*",
  },
  format: "md",
  defaultItem: () => ({
    title: "Nova Palestra",
    issue: "",
    coverImage: "",
    body: "",
  }),
  fields: [
    {
      type: "string",
      name: "title",
      label: "T\xEDtulo",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "issue",
      label: "Edi\xE7\xE3o",
      required: true,
    },
    {
      type: "image",
      name: "coverImage",
      label: "Imagem Capa",
    },
    {
      type: "rich-text",
      name: "body",
      label: "Conte\xFAdo",
      isBody: true,
    },
  ],
};

// tina/config.ts
var branch =
  process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var config_default = defineConfig({
  branch,
  clientId: process.env.PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      BlogCollection,
      NotasCollection,
      BlogrollCollection,
      BibliotecaCollection,
      MoviesCollection,
      NewsletterCollection,
      SpeakingCollection,
    ],
  },
});
export { config_default as default };
