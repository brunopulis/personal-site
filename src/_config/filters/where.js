export const where = (items, key, value) => {
  if (!items || !Array.isArray(items)) {
    return [];
  }
  return items.filter(item => {
    const itemValue = key.includes('.') ? key.split('.').reduce((obj, k) => obj?.[k], item) : item[key];
    return itemValue === value;
  });
};

export const keys = obj => {
  if (!obj || typeof obj !== 'object') {
    return [];
  }
  return Object.keys(obj);
};

export const concat = (arr1, arr2) => {
  if (!Array.isArray(arr1)) arr1 = [];
  if (!Array.isArray(arr2)) arr2 = [];
  return [...arr1, ...arr2];
};
