/**
 * Ordena um array alfabeticamente por uma propriedade
 * @param {Array} array - Array a ordenar
 * @param {String} property - Propriedade para ordenar (padrão: 'title')
 * @returns {Array} Array ordenado
 */
export const sortAlphabetically = (array, property = 'title') => {
  if (!Array.isArray(array)) {
    console.warn('sortAlphabetically: input is not an array', array);
    return [];
  }

  if (array.length === 0) {
    return [];
  }

  return array
    .filter(item => item && item[property])
    .sort((a, b) => {
      const aValue = String(a[property]).toLowerCase().trim();
      const bValue = String(b[property]).toLowerCase().trim();
      return aValue.localeCompare(bValue, 'pt-BR');
    });
};

export default sortAlphabetically;
