import slugify from 'slugify';

export const getVariable = function (string) {
  // Need this to access global variables with dashes. (`like-of`)
  // https://github.com/11ty/eleventy/issues/567#issuecomment-575828788
  // https://www.11ty.dev/docs/languages/javascript/#warning-about-arrow-functions
  return this.getVariables()[string];
};

export const slug = str =>
  !str ? null : /\p{Emoji_Presentation}/u.test(str) ? str : slugify(str, { lower: true });

export const toArray = value => (!value ? [] : Array.isArray(value) ? value : [value]);

export const limit = (arr, n) => arr.slice(0, n);
