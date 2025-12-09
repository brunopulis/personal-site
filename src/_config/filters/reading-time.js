/**
 * 
 * @author Bruno Pulis
 * @param {*} text 
 * @returns 
 */
export const readingTime = text => {
  let content = new String(text);
  const speed = 230; // reading speed in words per minute

  let re = /(&lt;.*?&gt;)|(<.*?>)/gi;
  let plain = content;
  let previous;
  do {
    previous = plain;
    plain = plain.replace(re, '');
  } while (plain !== previous);

  plain = plain.replace(/\n+|'s/g, ' ');

  let words = plain.split(' ');
  let count = words.length;

  const calculatedReadingTime = Math.round(count / speed);
  return calculatedReadingTime;
};