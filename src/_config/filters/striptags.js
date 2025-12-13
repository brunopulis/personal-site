export const striptags = string => {
  let prev;
  do {
    prev = string;
    string = string.replaceAll(/<[^>]*>?/gm, '');
  } while (string !== prev);
  return string;
};
