import slugify from 'slugify';
import {safeYear, slugToSegment} from './path-safety.js';
import {currentYear, parseChoice, parseRating, quote} from './util.js';
import {defaultPosterUrl} from './tmdb.js';

export const STATUS_OPTIONS = ['assistindo', 'assistido', 'reassistindo', 'quero assistir', 'abandonei'];
const FAVORITE_OPTIONS = ['não', 'sim'];

export function buildFrontmatter(fields) {
  const {
    title,
    director = '',
    category = '',
    status = 'assistindo',
    rating = '',
    poster = '',
    favorite = false,
    type = 'movie',
    watchedYear = currentYear(),
    url = '',
    watchedDate = new Date().toISOString()
  } = fields;

  let yaml = `---
title: ${quote(title)}
director: ${quote(director)}
category: ${category}
status: ${status}
rating: ${rating}
`;
  if (favorite) yaml += `favorite: true\n`;
  yaml += `type: ${type}
watchedYear: ${watchedYear}
poster: ${quote(poster)}
url: ${quote(url)}
watchedDate: ${watchedDate}
---
`;

  return yaml;
}

export function buildFilePath({title, type, watchedYear}) {
  const contentDir = type === 'movie' ? 'movies' : 'shows';
  const year = safeYear(watchedYear);
  const slug = slugToSegment(slugify(title, {lower: true, strict: true}));
  const fileName = type === 'movie' ? `${slug}.md` : `${year}-${slug}.md`;
  return {contentDir, fileName, year};
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
  const defaultPoster = defaultPosterUrl(details.poster_path);
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
    type
  };
}

const TITLE_PROMPT = 'Título';

async function askTitle(ask, suggestedTitle) {
  let title = '';
  while (!title) {
    title = (await ask(`${TITLE_PROMPT}${suggestedTitle ? ` (${suggestedTitle})` : ''}: `)) || suggestedTitle;
    if (!title) console.log('  ⚠️ O título é obrigatório.');
  }
  return title;
}

async function askChoice(ask, prompt) {
  console.log(`${prompt.label}:`);
  prompt.options.forEach((option, index) => console.log(`  ${index + 1}. ${option}`));
  const answer = (await ask(`Escolha (${prompt.default}): `)) || prompt.default;
  return parseChoice(answer, prompt.options);
}

export async function collectMovieInput(ask, defaults, suggestedTitle = '') {
  const movie = {
    title: await askTitle(ask, suggestedTitle || defaults.defaultTitle)
  };

  const prompts = [
    {key: 'director', label: 'Diretor(a)', default: defaults.defaultDirector || ''},
    {key: 'category', label: 'Categoria', default: defaults.defaultCategory || ''},
    {key: 'status', label: 'Status', type: 'choice', options: STATUS_OPTIONS, default: '1'},
    {key: 'rating', label: 'Nota (1-5, Enter para pular)', parse: parseRating, default: ''},
    {key: 'favorite', label: 'Favorito?', type: 'choice', options: FAVORITE_OPTIONS, default: '1'},
    {key: 'watchedYear', label: 'Ano', default: defaults.defaultYear || currentYear()},
    {key: 'poster', label: 'Poster URL', default: defaults.defaultPoster || ''},
    {key: 'url', label: 'URL', default: defaults.defaultUrl || ''}
  ];

  for (const prompt of prompts) {
    if (prompt.type === 'choice') {
      movie[prompt.key] = await askChoice(ask, prompt);
      continue;
    }

    const hint = prompt.parse ? '' : prompt.default === '' ? ' (—)' : ` (${prompt.default})`;
    const answer = (await ask(`${prompt.label}${hint}: `)) || prompt.default;
    movie[prompt.key] = prompt.parse ? prompt.parse(answer) : answer;
  }

  movie.favorite = movie.favorite === 'sim';

  return movie;
}
