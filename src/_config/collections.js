/**
 * 
 * @param {*} collectionApi 
 * @param {*} lang 
 * @returns 
 */
export const postsByLang = (collectionApi, lang) => {
  // Busca todos os .md dentro da pasta do idioma e devolve do mais novo ao mais antigo
  return collectionApi
    .getFilteredByGlob(`./src/content/posts/${lang}/**/*.md`)
    .reverse(); // reverse → ordem decrescente (mais recente primeiro)
};

/**
 * 
 * @param {*} collectionApi 
 * @returns 
 */
export const allPosts = collectionApi => {
  const pt = postsByLang(collectionApi, "pt-br");
  const en = postsByLang(collectionApi, "en");

  // Mantemos a ordem já invertida (mais recente → mais antigo) dentro de cada idioma
  // e depois concatenamos.  Se quiser intercalar por data, basta ordenar novamente:
  // return [...pt, ...en].sort((a, b) => new Date(b.date) - new Date(a.date));
  return [...pt, ...en];
};

/**
 * 
 * @param {*} collectionApi 
 * @returns 
 */
export const allStreams = collectionApi => {
  const pt = streamByLang(collectionApi, "pt-br");
  const en = streamByLang(collectionApi, "en");

  return [...pt, ...en];
};

/**
 * Streams por idioma
 * 
 * @param {string} collectionApi 
 * @param {string} lang 
 * @returns 
 */
export const streamByLang = (collectionApi, lang) => {
  return collectionApi
    .getFilteredByGlob(`./src/content/stream/${lang}/**/*.md`)
    .reverse(); // ordem decrescente
};

/**
 * 
 * @param {*} collectionApi 
 * @returns 
 */
export const showInSitemap = collectionApi => {
  return collectionApi.getFilteredByGlob("./src/**/*.{md,njk}");
};


/**
 * 
 * @param {*} collection 
 * @returns 
 */
export const tagList = collection => {
  const tagsSet = new Set();
  collection.getAll().forEach(item => {
    if (!item.data.tags) return;
    item.data.tags.filter(tag => !['posts', 'all'].includes(tag)).forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
};

export default {
  blog_pt_br: collectionApi => postsByLang(collectionApi, "pt-br"),
  blog_en: collectionApi => postsByLang(collectionApi, "en"),
  stream_pt_br: collectionApi => streamByLang(collectionApi, "pt-br"),
  stream_en: collectionApi => streamByLang(collectionApi, "en"),
  allPosts,
  allStreams,
  showInSitemap,
  tagList
};