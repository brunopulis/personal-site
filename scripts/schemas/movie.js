import slugify from 'slugify';
import {slugToSegment} from '../lib/path-safety.js';
import {currentYear} from '../lib/util.js';

/**
 * @param {import('../lib/providers/tmdb.js').TmdbDefaults} [tmdbDefaults]
 * @returns {import('../lib/types.js').ContentSchema}
 */
export function buildMovieSchema(tmdbDefaults) {
  return {
    type: 'movie',
    contentDir: () => 'movies',
    fileName: ({title}) => `${slugToSegment(slugify(title, {lower: true, strict: true}))}.md`,
    fields: [
      {key: 'title', label: 'Título', required: true, quote: true, default: tmdbDefaults?.defaultTitle ?? ''},
      {key: 'director', label: 'Diretor(a)', default: tmdbDefaults?.defaultDirector ?? '', quote: true},
      {key: 'category', label: 'Categoria', default: tmdbDefaults?.defaultCategory ?? '', quote: true},
      {key: 'status', label: 'Status', type: 'choice', options: ['assistido', 'assistindo'], default: '1'},
      {key: 'rating', label: 'Nota', default: ''},
      {key: 'poster', label: 'Poster URL', default: tmdbDefaults?.defaultPoster ?? '', quote: true},
      {key: 'watchedYear', label: 'Ano assistido', default: tmdbDefaults?.defaultYear ?? currentYear()},
      {key: 'url', label: 'URL', default: tmdbDefaults?.defaultUrl ?? '', quote: true}
    ]
  };
}
