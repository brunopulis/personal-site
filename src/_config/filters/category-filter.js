/**
 * Filtra posts/coleção por categoria
 * @param {Array} items - Array de posts/items
 * @param {String} category - Categoria a filtrar
 * @returns {Array} Items filtrados pela categoria
 */
export const categoryFilter = (items, category) => {
  if (!items) {
    console.warn('categoryFilter: items is undefined or null');
    return [];
  }

  if (!Array.isArray(items)) {
    console.warn('categoryFilter: items is not an array', typeof items);
    return [];
  }

  if (items.length === 0) {
    return [];
  }

  if (!category || category === '') {
    console.warn('categoryFilter: category is required');
    return items;
  }

  return items.filter(item => {
    try {
      let itemCategories = null;

      if (item.data && item.data.categories) {
        itemCategories = item.data.categories;
      } else if (item.data && item.data.category) {
        itemCategories = item.data.category;
      } else if (item.categories) {
        itemCategories = item.categories;
      } else if (item.category) {
        itemCategories = item.category;
      }

      if (!itemCategories) {
        return false;
      }

      const categoriesArray = Array.isArray(itemCategories) 
        ? itemCategories 
        : [itemCategories];

      return categoriesArray.some(cat => 
        String(cat).toLowerCase().trim() === String(category).toLowerCase().trim()
      );
    } catch (error) {
      console.error('categoryFilter: error filtering item', error);
      return false;
    }
  });
};

export default categoryFilter;