import { defineConfig } from "tinacms";

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID || "",
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
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH,
      stopwordLanguages: ['por', 'eng'],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
  schema: {
    collections: [
      // ========================================
      // COLLECTION: POSTS
      // ========================================
      {
        name: "post",
        label: "Posts do Blog",
        path: "src/content/blog",
        format: "mdx",
        ui: {
          filename: {
            slugify: (values) => {
              return `${values?.title?.toLowerCase().replace(/ /g, '-')}`;
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Título",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "publishDate",
            label: "Data de Publicação",
            required: true,
            ui: {
              dateFormat: 'DD/MM/YYYY',
              timeFormat: 'HH:mm',
            },
          },
          {
            type: "string",
            name: "author",
            label: "Autor",
            required: true,
            default: "Seu Nome",
          },
          {
            type: "string",
            name: "description",
            label: "Descrição/Resumo",
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
            label: "Conteúdo",
            isBody: true,
            required: true,
          },
          {
            type: "string",
            name: "categories",
            label: "Categorias",
            list: true,
            options: [
              { value: "tecnologia", label: "Tecnologia" },
              { value: "design", label: "Design" },
              { value: "desenvolvimento", label: "Desenvolvimento" },
              { value: "tutorial", label: "Tutorial" },
              { value: "opiniao", label: "Opinião" },
              { value: "noticias", label: "Notícias" },
            ],
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "boolean",
            name: "draft",
            label: "Rascunho",
            default: false,
            ui: {
              description: "Marque para manter como rascunho",
            },
          },
          {
            type: "boolean",
            name: "featured",
            label: "Destaque",
            default: false,
            ui: {
              description: "Marcar como post em destaque",
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
      },

      // ========================================
      // COLLECTION: NOTAS
      // ========================================
      {
        name: "note",
        label: "Notas Pessoais",
        path: "src/content/notes",
        format: "mdx",
        ui: {
          filename: {
            slugify: (values) => {
              const date = new Date(values?.date || Date.now());
              return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Título",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Data",
            required: true,
            ui: {
              dateFormat: 'DD/MM/YYYY',
              timeFormat: 'HH:mm',
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Conteúdo",
            isBody: true,
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Categoria",
            options: [
              { value: "pessoal", label: "📝 Pessoal" },
              { value: "trabalho", label: "💼 Trabalho" },
              { value: "estudos", label: "📚 Estudos" },
              { value: "ideias", label: "💡 Ideias" },
              { value: "projetos", label: "🚀 Projetos" },
              { value: "lembretes", label: "⏰ Lembretes" },
              { value: "anotacoes", label: "📖 Anotações" },
            ],
            default: "pessoal",
          },
          {
            type: "string",
            name: "priority",
            label: "Prioridade",
            options: [
              { value: "baixa", label: "🟢 Baixa" },
              { value: "media", label: "🟡 Média" },
              { value: "alta", label: "🔴 Alta" },
            ],
            default: "media",
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "boolean",
            name: "favorite",
            label: "⭐ Favorito",
            default: false,
          },
          {
            type: "boolean",
            name: "archived",
            label: "📦 Arquivada",
            default: false,
          },
          {
            type: "image",
            name: "images",
            label: "Imagens",
            list: true,
          },
          {
            type: "object",
            name: "links",
            label: "Links",
            list: true,
            fields: [
              {
                type: "string",
                name: "title",
                label: "Título",
              },
              {
                type: "string",
                name: "url",
                label: "URL",
              },
            ],
          },
        ],
      },

      // ========================================
      // COLLECTION: BLOGROLL
      // ========================================
      {
        name: "blogroll",
        label: "Blogroll",
        path: "src/content/blogroll",
        format: "json",
        ui: {
          filename: {
            slugify: (values) => {
              return `${values?.title?.toLowerCase().replace(/ /g, '-')}`;
            },
          },
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
            label: "Descrição",
            required: true,
            ui: {
              component: "textarea",
              description: "Breve descrição do site/blog",
            },
          },
          {
            type: "string",
            name: "category",
            label: "Categoria",
            required: true,
            options: [
              { value: "design", label: "🎨 Design" },
              { value: "desenvolvimento", label: "💻 Desenvolvimento" },
              { value: "tecnologia", label: "📱 Tecnologia" },
              { value: "escrita", label: "✍️ Escrita" },
              { value: "produtividade", label: "🎯 Produtividade" },
              { value: "educacao", label: "🎓 Educação" },
              { value: "entretenimento", label: "🎮 Entretenimento" },
              { value: "noticias", label: "📰 Notícias" },
              { value: "geral", label: "🌐 Geral" },
            ],
          },
          {
            type: "image",
            name: "logo",
            label: "Logo/Avatar",
            ui: {
              description: "Favicon ou logo do site",
            },
          },
          {
            type: "string",
            name: "rss_feed",
            label: "Feed RSS",
            ui: {
              description: "URL do feed RSS (se disponível)",
            },
          },
          {
            type: "string",
            name: "author",
            label: "Autor/Responsável",
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "boolean",
            name: "featured",
            label: "⭐ Destacar",
            default: false,
            ui: {
              description: "Marcar como favorito/destaque",
            },
          },
          {
            type: "boolean",
            name: "active",
            label: "✅ Ativo",
            default: true,
            ui: {
              description: "Site ainda está ativo?",
            },
          },
          {
            type: "number",
            name: "order",
            label: "Ordem de Exibição",
            default: 0,
            ui: {
              description: "Número menor = aparece primeiro",
            },
          },
          {
            type: "datetime",
            name: "date_added",
            label: "Data de Adição",
            ui: {
              dateFormat: 'DD/MM/YYYY',
            },
          },
          {
            type: "object",
            name: "social",
            label: "Redes Sociais",
            fields: [
              {
                type: "string",
                name: "twitter",
                label: "Twitter/X",
              },
              {
                type: "string",
                name: "github",
                label: "GitHub",
              },
              {
                type: "string",
                name: "linkedin",
                label: "LinkedIn",
              },
              {
                type: "string",
                name: "instagram",
                label: "Instagram",
              },
            ],
          },
        ],
      },

      // ========================================
      // COLLECTION: BOOKS
      // ========================================
      {
        name: "book",
        label: "Meus Livros",
        path: "src/content/books",
        format: "mdx",
        ui: {
          filename: {
            slugify: (values) => {
              return `${values?.title?.toLowerCase().replace(/ /g, '-')}`;
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Título do Livro",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Descrição/Resumo",
            ui: {
              component: "textarea",
              description: "Breve resumo do livro",
            },
          },
          {
            type: "string",
            name: "author",
            label: "Autor(es)",
            list: true,
            required: true,
          },
          {
            type: "datetime",
            name: "publishDate",
            label: "Data de Publicação",
            required: true,
            ui: {
              dateFormat: 'DD/MM/YYYY',
              timeFormat: 'HH:mm',
            },
          },
          {
            type: "number",
            name: "year",
            label: "Ano de Lançamento",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Resenha e Citações",
            isBody: true,
            ui: {
              description: "Suas impressões, análise e citações favoritas",
            },
          },
          {
            type: "string",
            name: "category",
            label: "Categoria",
            list: true,
            required: true,
            options: [
              { value: "ficcao", label: "Ficção" },
              { value: "nao-ficcao", label: "Não Ficção" },
              { value: "tecnicos", label: "Técnicos" },
              { value: "negocios", label: "Negócios" },
              { value: "financas", label: "Finanças e investimentos" },
              { value: "empreendedorismo", label: "Empreendedorismo" },
              { value: "produtividade", label: "Produtividade" },
              { value: "autoajuda", label: "Autoajuda" },
              { value: "filosofia", label: "Filosofia" },
              { value: "religiao", label: "Religião" },
              { value: "teologia", label: "Teologia" },
              { value: "politica", label: "Política" },
              { value: "educacao", label: "Educação" },
              { value: "musica", label: "Música" },
              { value: "arte", label: "Arte" },
              { value: "humor", label: "Humor" },
              { value: "poesia", label: "Poesia" },
              { value: "quadrinhos", label: "Quadrinhos" },
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
            label: "⭐ Avaliação",
            options: [
              { value: "1", label: "⭐ 1 de 5" },
              { value: "2", label: "⭐⭐ 2 de 5" },
              { value: "3", label: "⭐⭐⭐ 3 de 5" },
              { value: "4", label: "⭐⭐⭐⭐ 4 de 5" },
              { value: "5", label: "⭐⭐⭐⭐⭐ 5 de 5" },
            ],
          },
          {
            type: "string",
            name: "status",
            label: "Status",
            required: true,
            default: "to_read",
            options: [
              { value: "to_read", label: "Quero Ler" },
              { value: "read", label: "Lido" },
              { value: "reading", label: "Lendo" },
              { value: "abandoned", label: "Abandonado" },
            ],
          },
          {
            type: "datetime",
            name: "reading_date",
            label: "Data de leitura",
            ui: {
              dateFormat: 'DD/MM/YYYY',
              description: "Quando você leu o livro",
            },
          },
          {
            type: "number",
            name: "pages",
            label: "Número de Páginas",
            ui: {
              description: "Total de páginas do livro",
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
          },
        ],
      },

      // ========================================
      // COLLECTION: MOVIES
      // ========================================
      {
        name: "movie",
        label: "Meus Filmes",
        path: "src/content/movies",
        format: "mdx",
        ui: {
          filename: {
            slugify: (values) => {
              return `${values?.title?.toLowerCase().replace(/ /g, '-')}`;
            },
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Título do Filme",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "original_title",
            label: "Título Original",
            ui: {
              description: "Título no idioma original (se diferente)",
            },
          },
          {
            type: "number",
            name: "year",
            label: "Ano de Lançamento",
            required: true,
          },
          {
            type: "string",
            name: "director",
            label: "Diretor(es)",
            list: true,
            required: true,
          },
          {
            type: "object",
            name: "cast",
            label: "Elenco Principal",
            list: true,
            fields: [
              {
                type: "string",
                name: "actor",
                label: "Ator/Atriz",
              },
              {
                type: "string",
                name: "character",
                label: "Personagem",
              },
            ],
          },
          {
            type: "string",
            name: "synopsis",
            label: "Sinopse",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Resenha/Comentários",
            isBody: true,
            ui: {
              description: "Suas impressões e análise do filme",
            },
          },
          {
            type: "string",
            name: "genres",
            label: "Gêneros",
            list: true,
            required: true,
            options: [
              { value: "acao", label: "Ação" },
              { value: "animacao", label: "Animação" },
              { value: "aventura", label: "Aventura" },
              { value: "comedia", label: "Comédia" },
              { value: "crime", label: "Crime" },
              { value: "documentario", label: "Documentário" },
              { value: "drama", label: "Drama" },
              { value: "fantasia", label: "Fantasia" },
              { value: "ficcao-cientifica", label: "Ficção Científica" },
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
            label: "⭐ Avaliação",
            options: [
              { value: "1", label: "⭐ 1/5" },
              { value: "2", label: "⭐⭐ 2/5" },
              { value: "3", label: "⭐⭐⭐ 3/5" },
              { value: "4", label: "⭐⭐⭐⭐ 4/5" },
              { value: "5", label: "⭐⭐⭐⭐⭐ 5/5" },
            ],
          },
          {
            type: "string",
            name: "status",
            label: "Status",
            required: true,
            default: "assistido",
            options: [
              { value: "assistido", label: "✅ Assistido" },
              { value: "assistindo", label: "📺 Assistindo" },
              { value: "quero_assistir", label: "📝 Quero Assistir" },
              { value: "abandonado", label: "❌ Abandonado" },
            ],
          },
          {
            type: "datetime",
            name: "watched_date",
            label: "Data Assistida",
            ui: {
              dateFormat: 'DD/MM/YYYY',
              description: "Quando você assistiu o filme",
            },
          },
          {
            type: "number",
            name: "runtime",
            label: "Duração (minutos)",
            ui: {
              description: "Duração em minutos",
            },
          },
          {
            type: "string",
            name: "language",
            label: "Idioma Original",
            default: "Inglês",
          },
          {
            type: "string",
            name: "country",
            label: "País de Origem",
            list: true,
          },
          {
            type: "string",
            name: "imdb_id",
            label: "IMDb ID",
            ui: {
              description: "ex: tt0111161",
            },
          },
          {
            type: "string",
            name: "trailer_url",
            label: "Trailer URL",
            ui: {
              description: "Link do YouTube ou outro serviço",
            },
          },
          {
            type: "boolean",
            name: "favorite",
            label: "❤️ Favorito",
            default: false,
          },
          {
            type: "object",
            name: "awards",
            label: "🏆 Prêmios",
            list: true,
            fields: [
              {
                type: "string",
                name: "award",
                label: "Nome do Prêmio",
              },
              {
                type: "string",
                name: "category",
                label: "Categoria",
              },
              {
                type: "number",
                name: "year",
                label: "Ano",
              },
            ],
          },
          {
            type: "string",
            name: "streaming",
            label: "Onde Assistir",
            list: true,
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
          },
          {
            type: "string",
            name: "notes",
            label: "Observações Extras",
            ui: {
              component: "textarea",
            },
          },
        ],
      },

      // ========================================
      // COLLECTION: NEWSLETTER (mantido do original)
      // ========================================
      {
        name: "newsletter",
        label: "Newsletter",
        path: "src/content/newsletter",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "issue",
            label: "Edição",
            required: true,
          },
          {
            type: "image",
            name: "coverImage",
            label: "Hero",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },

      // ========================================
      // COLLECTION: SPEAKING (mantido do original)
      // ========================================
      {
        name: "speaking",
        label: "Palestras",
        path: "src/content/speaking",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "issue",
            label: "Edição",
            required: true,
          },
          {
            type: "image",
            name: "coverImage",
            label: "Hero",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },

      // ========================================
      // COLLECTION: BOOKMARKS (mantido do original)
      // ========================================
      {
        name: "bookmark",
        label: "Bookmark",
        path: "src/content/bookmarks",
        format: "mdx",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "string",
            name: "url",
            label: "URL",
            required: true,
          },
        ],
      },
    ],
  },
});