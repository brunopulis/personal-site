export const contentType = item => {
  const url = item?.url || '';

  if (url.startsWith('/watching/movies/')) return 'Filme';
  if (url.startsWith('/watching/shows/')) return 'Série';
  if (url.startsWith('/notes/')) return 'Nota';
  if (url.startsWith('/blog/')) return 'Artigo';
  if (url.startsWith('/book/')) return 'Livro';
  if (url.startsWith('/poetry/')) return 'Poema';
  if (url.startsWith('/likes/')) return 'Like';
  if (url.startsWith('/newsletters/')) return 'Newsletter';

  return 'Item';
};
