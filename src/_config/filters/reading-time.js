/**
 *
 * @author Bruno Pulis
 * @param {*} text
 * @returns
 */
export const readingTime = text => {
  const content = new String(text);
  const speed = 230; // reading speed in words per minute

  const re = /(&lt;.*?&gt;)|(<.*?>)/gi;
  let plain = content;
  let previous;
  do {
    previous = plain;
    plain = plain.replace(re, '');
  } while (plain !== previous);

  plain = plain.replace(/\n+|'s/g, ' ');

  const words = plain.split(' ');
  const count = words.length;

  const calculatedReadingTime = Math.round(count / speed);
  return calculatedReadingTime;
};
