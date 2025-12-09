export const groupBy = (array, key) => {
  if (!array || !Array.isArray(array)) {
    return {};
  }
  
  return array.reduce((result, item) => {
    const group = item.data ? item.data[key] : item[key];
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(item);
    return result;
  }, {});
}

export default groupBy;