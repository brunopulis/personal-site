import urlSlugs from '../../_data/url_slugs.js';

/**
 * Gera uma URL localizada baseada em uma chave e idioma
 * @param {string} key - Chave da página (ex: 'blog', 'about')
 * @param {string} locale - Código do idioma ('pt-br' ou 'en')
 * @returns {string} URL localizada
 * 
 * Exemplos:
 * - getLocalizedUrl('about', 'pt-br') → '/sobre/'
 * - getLocalizedUrl('about', 'en') → '/en/about/'
 * - getLocalizedUrl('blog', 'pt-br') → '/blog/'
 * - getLocalizedUrl('blog', 'en') → '/en/blog/'
 */
export function getLocalizedUrl(key, locale = 'pt-br') {
  // Busca o slug correspondente no mapeamento
  const slug = urlSlugs[locale]?.[key] || key;
  
  // Para pt-br, usa a raiz
  if (locale === 'pt-br') {
    return `/${slug}/`;
  }
  
  // Para outros idiomas, adiciona o prefixo do idioma
  return `/${locale}/${slug}/`;
}

/**
 * Gera URL para a home page baseada no idioma
 * @param {string} locale - Código do idioma
 * @returns {string} URL da home
 */
export function getHomeUrl(locale = 'pt-br') {
  return locale === 'pt-br' ? '/' : `/${locale}/`;
}
