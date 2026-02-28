export const sortKeys = obj => {
  return Object.keys(obj).sort((a, b) => b - a);
};

export default sortKeys;
