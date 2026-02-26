export const limit = (array, limit) => {
  if (!Array.isArray(array)) {
    console.warn('⚠️ limit: esperava um array, recebeu:', typeof array);
    return array;
  }
  return array.slice(0, limit);
};
