/**
 * Define as rotas para cada idioma
 * Estrutura: { [language]: { [routeKey]: routePath } }
 */
export const routes = {
  "pt-br": {
    index: "",
    about: "sobre",
    projects: "projetos",
    services: "servicos",
    blog: "blog",
    newsletter: "newsletter",
    contact: "contato",
  },
  en: {
    index: "",
    about: "about",
    projects: "projects",
    services: "services",
    blog: "blog",
    newsletter: "newsletter",
    contact: "contact",
  },
} as const;

export type RouteKey = keyof (typeof routes)["pt-br"];
