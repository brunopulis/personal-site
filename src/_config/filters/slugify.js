import slugifyFn from 'slugify';

const slugify = str => {
  return slugifyFn(str, {
    replacement: '-',
    remove: /[#,&,+()$~%.'":*¿?¡!<>{}]/g,
    lower: true
  });
};

export const slugifyString = str => {
  if (typeof str !== 'string') {
    return '';
  }
  return slugify(str);
};

export const postSlug = data => {
  const title = data?.page?.title || data?.title || '';
  const fileSlug = data?.page?.fileSlug || '';

  if (title) {
    return slugify(title);
  }

  return slugify(fileSlug);
};
