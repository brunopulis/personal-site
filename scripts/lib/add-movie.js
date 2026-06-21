import slugify from 'slugify';

export function buildFrontmatter(fields) {
  const {
    title,
    director = '',
    category = '',
    status = 'assistindo',
    rating = '',
    type = 'movie',
    watchedYear = String(new Date().getFullYear()),
    poster = '',
    url = '',
    watchedDate = new Date().toISOString(),
  } = fields;

  return `---
title: "${title}"
director: ${director}
category: ${category}
status: ${status}
rating: ${rating}
type: ${type}
watchedYear: ${watchedYear}
poster: ${poster}
url: ${url}
watchedDate: ${watchedDate}
---
`;
}

export function buildFilePath({title, type, watchedYear}) {
  const contentDir = type === 'movie' ? 'movies' : 'shows';
  const slug = slugify(title, {lower: true, strict: true});
  const fileName = type === 'movie' ? `${slug}.md` : `${watchedYear}-${slug}.md`;
  return {contentDir, fileName};
}

export function computeDefaults(details, selected) {
  const isMovie = selected?.resultType === 'movie';
  const defaultTitle = details.title || details.name || selected?.displayTitle || '';
  const defaultDirector = isMovie
    ? details.credits?.crew?.find(c => c.job === 'Director')?.name || ''
    : details.created_by?.map(c => c.name).join(', ') || '';
  const defaultCategory = details.genres?.map(g => g.name).join(', ') || '';
  const defaultYear = isMovie
    ? (details.release_date || '').split('-')[0] || String(new Date().getFullYear())
    : (details.first_air_date || '').split('-')[0] || String(new Date().getFullYear());
  const defaultPoster = details.poster_path
    ? `https://image.tmdb.org/t/p/w600_and_h900_face${details.poster_path}`
    : '';
  const idPath = `${details.id}-${slugify(defaultTitle, {lower: true})}`;
  const defaultUrl = isMovie
    ? `https://www.themoviedb.org/movie/${idPath}`
    : `https://www.themoviedb.org/tv/${idPath}`;
  const type = isMovie ? 'movie' : 'tv';

  return {
    defaultTitle,
    defaultDirector,
    defaultCategory,
    defaultYear,
    defaultPoster,
    defaultUrl,
    type,
  };
}
