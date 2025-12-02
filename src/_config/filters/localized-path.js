export function localizedPath(urlPath, locale) {
  if (!urlPath) return urlPath;
  
  // Se for uma string simples (como 'stream'), monta o caminho completo
  if (!urlPath.startsWith('/')) {
    if (locale === 'pt-br') {
      return `/${urlPath}/`;
    }
    return `/${locale}/${urlPath}/`;
  }
  
  // Remove qualquer prefixo de idioma existente
  const cleanUrl = urlPath
    .replace(/^\/en\//, '/')
    .replace(/^\/pt-br\//, '/');
  
  // Para pt-br, usa a raiz
  if (locale === 'pt-br') {
    return cleanUrl;
  }
  
  // Para outros idiomas (en), adiciona o prefixo
  return cleanUrl === '/' ? `/${locale}/` : `/${locale}${cleanUrl}`;
}