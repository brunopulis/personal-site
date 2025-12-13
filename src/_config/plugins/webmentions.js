// src/_config/plugins/webmentions.js

import EleventyFetch from '@11ty/eleventy-fetch';

const DOMAIN = 'https://brunopulis.com';
const WEBMENTION_API = 'https://webmention.io/api/mentions.jf2';

/**
 * Busca webmentions de um URL
 * @param {string} url - URL da página
 * @returns {Promise<Array>} Array de webmentions
 */
async function fetchWebmentions(url) {
  try {
    // Garante que a URL não tenha barra no final para consistência
    const cleanUrl = url.replace(/\/$/, '') || '/';
    const fullUrl = `${DOMAIN}${cleanUrl}/`; // Adiciona barra no final pois muitos serviços indexam assim

    // Busca mentions especificamente para esta URL
    const apiUrl = `${WEBMENTION_API}?target=${encodeURIComponent(fullUrl)}`;

    const response = await EleventyFetch(apiUrl, {
      duration: '1h',
      type: 'json',
      directory: '.cache',
      dryRun: false,
      fetchOptions: {
        headers: {
          'User-Agent': '11ty-webmentions/1.0'
        }
      }
    });

    return response.children || [];
  } catch (error) {
    console.error(`❌ Erro ao buscar webmentions para ${url}:`, error.message);
    return [];
  }
}

/**
 * Filtra webmentions por tipo
 * @param {Array} mentions - Array de webmentions
 * @param {string} type - Tipo de webmention (like-of, repost-of, in-reply-to, bookmark-of)
 * @returns {Array} Webmentions filtradas
 */
function filterByType(mentions, type) {
  if (!type) return mentions;
  return mentions.filter(m => m['wm-property'] === type);
}

/**
 * Conta webmentions por tipo
 * @param {Array} mentions - Array de webmentions
 * @param {string} type - Tipo de webmention
 * @returns {number} Quantidade de webmentions
 */
function countMentions(mentions, type) {
  if (!type) return mentions.length;
  return filterByType(mentions, type).length;
}

/**
 * Obtém autores únicos de webmentions
 * @param {Array} mentions - Array de webmentions
 * @returns {Array} Array de autores únicos
 */
function getUniqueAuthors(mentions) {
  const authors = new Map();

  mentions.forEach(mention => {
    const author = mention.author;
    if (author?.name) {
      const key = author.url || author.name;
      if (!authors.has(key)) {
        authors.set(key, author);
      }
    }
  });

  return Array.from(authors.values());
}

/**
 * Formata data para português brasileiro
 * @param {string|Date} dateObj - Data a ser formatada
 * @returns {string} Data formatada
 */
function formatDate(dateObj) {
  if (!dateObj) return '';

  try {
    return new Date(dateObj).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.log('❌ Erro ao formatar data:', dateObj);
    return '';
  }
}

/**
 * Trunca texto em um comprimento específico
 * @param {string} text - Texto a ser truncado
 * @param {number} length - Comprimento máximo
 * @returns {string} Texto truncado
 */
function truncateText(text, length = 300) {
  if (!text) return '';
  return text.length > length ? text.substring(0, length) + '...' : text;
}

/**
 * Plugin de Webmentions para 11ty
 * @param {object} eleventyConfig - Configuração do 11ty
 */
function webmentions(eleventyConfig) {
  console.log('🔧 Registrando filtros de webmentions...');

  // Filtro assíncrono para buscar webmentions
  eleventyConfig.addNunjucksAsyncFilter('webmentions', async (url, callback) => {
    try {
      console.log('📡 Buscando webmentions para:', url);
      const result = await fetchWebmentions(url);
      console.log('✅ Webmentions encontrados:', result.length);
      callback(null, result);
    } catch (error) {
      console.error('❌ Erro no filtro webmentions:', error);
      callback(null, []); // Retorna array vazio em caso de erro para não quebrar o build
    }
  });

  // Filtro para filtrar por tipo
  eleventyConfig.addFilter('filterByType', filterByType);

  // Filtro para contar webmentions
  eleventyConfig.addFilter('countMentions', countMentions);

  // Filtro para obter autores únicos
  eleventyConfig.addFilter('uniqueAuthors', getUniqueAuthors);

  // Filtro para formatar data
  eleventyConfig.addFilter('readableDate', formatDate);

  // Filtro para truncar texto
  eleventyConfig.addFilter('truncate', truncateText);

  console.log('✅ Plugin de Webmentions carregado com sucesso');
}

// Exportar como named exports
export {
  webmentions,
  fetchWebmentions,
  filterByType,
  countMentions,
  getUniqueAuthors,
  formatDate,
  truncateText
};
