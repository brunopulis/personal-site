import type { Language } from "@i18n/translations";

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

/**
 * Gera o caminho localizado para uma rota
 * @param routeKey - Chave da rota (ex: 'about', 'projects')
 * @param lang - Idioma (ex: 'pt-br', 'en')
 * @returns Caminho completo localizado
 *
 * @example
 * getLocalizedPath('about', 'pt-br') // returns '/sobre'
 * getLocalizedPath('about', 'en') // returns '/en/about'
 * getLocalizedPath('index', 'pt-br') // returns '/'
 * getLocalizedPath('index', 'en') // returns '/en'
 */
export function getLocalizedPath(routeKey: RouteKey, lang: Language): string {
  const path = routes[lang]?.[routeKey] ?? routes["pt-br"][routeKey];

  if (lang === "pt-br") {
    return path ? `/${path}` : "/";
  }

  return path ? `/${lang}/${path}` : `/${lang}`;
}

/**
 * Retorna todas as variações localizadas de uma rota
 * Útil para gerar tags hreflang
 * @param routeKey - Chave da rota
 * @returns Array com todos os caminhos localizados
 */
export function getAllLocalizedPaths(routeKey: RouteKey) {
  return Object.keys(routes).map(lang => ({
    lang: lang as Language,
    path: getLocalizedPath(routeKey, lang as Language),
  }));
}

/**
 * Extrai a chave da rota a partir do pathname
 * @param pathname - O pathname da URL
 * @param lang - Idioma detectado
 * @returns A chave da rota encontrada ou 'index'
 */
export function getRouteKeyFromPath(pathname: string, lang: Language): RouteKey {
  // Remove barras no início e fim
  let cleanPath = pathname.replace(/^\/|\/$/g, "");

  // Remove prefixo de idioma se existir
  if (lang !== "pt-br" && cleanPath.startsWith(lang)) {
    cleanPath = cleanPath.replace(`${lang}/`, "").replace(lang, "");
  }

  // Se o caminho está vazio, é a página inicial
  if (!cleanPath) {
    return "index";
  }

  // Busca a chave correspondente
  const routeEntries = Object.entries(routes[lang]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const found = routeEntries.find(([_, value]) => value === cleanPath);

  return (found?.[0] as RouteKey) || "index";
}
