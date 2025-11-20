import { 
  translations, 
  defaultLanguage,
  languages, 
  type Language, 
  type TranslationKey,
} from "./index";

import { routes, type RouteKey } from "./routes";

export { translations, defaultLanguage, languages, Language, TranslationKey, RouteKey, routes };

/*/**
 * 
 * 
 * @param lang 
 * @returns 
 */
export function useTranslations(lang: Language) {
  return function t(key: TranslationKey): string {
    const translation = translations[lang]?.[key];

    if (!translation) {
      // eslint-disable-next-line no-undef
      console.warn(`Translation key "${key}" not found for language "${lang}"`);
      return key;
    }

    return translation;
  };
}

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

  if (routeKey === 'index') {
    return `/${lang}`; 
  }

  // Rota Normal (ex: 'now', 'about'): retorna /prefixo/caminho
  // Como 'path' não deve ser vazio para rotas não-index, podemos garantir a estrutura:
  return `/${lang}/${path}`;
}

/**
 * 
 * 
 * @param pathname 
 * @returns 
 */
export function getLanguageFromPath(pathname: string): Language {
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment === "en") {
    return "en";
  }

  return defaultLanguage;
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
