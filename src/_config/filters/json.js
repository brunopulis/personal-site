export const json = (value, spaces = 0) => {
  try {
    return JSON.stringify(value, null, spaces);
  } catch {
    return 'null';
  }
};
