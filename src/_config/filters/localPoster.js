import fs from 'node:fs';
import path from 'node:path';

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

  // fall back to the remote URL when the local copy is missing
  if (!fs.existsSync(path.join(process.cwd(), 'src', 'assets', 'images', 'posters', filename))) {
    return url;
  }

  return `/assets/images/posters/${filename}`;
};
