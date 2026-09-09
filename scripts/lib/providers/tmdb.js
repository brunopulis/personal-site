import slugify from 'slugify';

/**
 * @typedef {Object} TmdbDefaults
 * @property {string} defaultTitle
 * @property {string} defaultDirector
 * @property {string} defaultCategory
 * @property {string} defaultYear
 * @property {string} defaultPoster
 * @property {string} defaultUrl
 * @property {'movie'|'tv'} type
 */

/**
 * @param {Record<string, any>} details - Resposta detalhada da API do TMDB.
 * @param {{resultType?: string, displayTitle?: string}} [selected] - Item escolhido na busca.
 * @returns {TmdbDefaults}
 */
export function computeDefaults(details, selected) {
  const isMovie = selected?.resultType === 'movie';

  const defaultTitle = details.title || details.name || selected?.displayTitle || '';

  const defaultDirector = isMovie
    ? details.credits?.crew?.find((/** @type {any} */ c) => c.job === 'Director')?.name || ''
    : details.created_by?.map((/** @type {any} */ c) => c.name).join(', ') || '';

  const defaultCategory = details.genres?.map((/** @type {any} */ g) => g.name).join(', ') || '';

  const defaultYear = isMovie
    ? (details.release_date || '').split('-')[0] || String(new Date().getFullYear())
    : (details.first_air_date || '').split('-')[0] || String(new Date().getFullYear());

  const defaultPoster = details.poster_path
    ? `https://image.tmdb.org/t/p/w600_and_h900_face${details.poster_path}`
    : '';

  const idPath = `${details.id}-${slugify(defaultTitle, {lower: true})}`;
  const defaultUrl = isMovie
    ? `https://www.themoviedb.org/movie/${idPath}`
    : `https://www.themoviedb.org/tv/${idPath}`;

  return {
    defaultTitle,
    defaultDirector,
    defaultCategory,
    defaultYear,
    defaultPoster,
    defaultUrl,
    type: isMovie ? 'movie' : 'tv'
  };
}
