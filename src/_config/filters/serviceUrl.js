/**
 * 
 * @param {*} slug 
 * @returns 
 */
export const serviceUrl = (slug) => {
  const service = servicos.servicos.find(s => s.slug === slug);
  return service ? service.url : '#';
}
