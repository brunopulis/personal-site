export const head = (arr, n) => {
  if (!Array.isArray(arr)) return arr;
  if (n < 0) {
    return arr.slice(n);
  }
  return arr.slice(0, n);
};
