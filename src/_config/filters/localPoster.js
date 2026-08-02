export const localPoster = url => {
  if (!url || !url.includes('image.tmdb.org')) return url;
  const filename = url.split('/').pop();

  return `/assets/images/posters/${filename}`;
};
