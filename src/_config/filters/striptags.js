export const striptags = string => {
  let prev;
  do {
    prev = string;
    string = string.replace(/<[^>]*>?/gm, '');
  } while (string !== prev);
  return string;
};
