export const localPoster = url => {
  if (!url) return url;

  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch {
    return url;
  }

  if (parsedUrl.hostname !== 'image.tmdb.org') return url;
  const filename = parsedUrl.pathname.split('/').pop();

  return `/assets/images/posters/${filename}`;
};
