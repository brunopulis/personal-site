export const formatNumber = num => {
  if (num === undefined || num === null) return '0';
  return Number(num)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};
