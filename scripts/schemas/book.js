import slugify from 'slugify';
import {safeDate, safeYear, slugToSegment} from '../lib/path-safety.js';
import {currentYear, formatTags, parseRating, todayString} from '../lib/util.js';

/** @type {import('../lib/types.js').ContentSchema} */
export const bookSchema = {
  type: 'book',
  contentDir: ({attendedYear}) => safeYear(attendedYear),
  fileName: ({title, pubDate}) =>
    `${safeDate(pubDate)}-${slugToSegment(slugify(title, {lower: true, strict: true}))}.md`,
  fields: [
    {key: 'title', label: 'Título', required: true, quote: true},
    {key: 'subtitle', label: 'Subtítulo', default: '', quote: true, optional: true},
    {key: 'author', label: 'Autor(a)', default: '', quote: true},
    {key: 'category', label: 'Categoria', default: '', quote: true},
    {key: 'status', label: 'Status', type: 'choice', options: ['lido', 'lendo'], default: '1'},
    {key: 'rating', label: 'Nota (1-5, Enter para pular)', parse: parseRating, default: ''},
    {key: 'attendedYear', label: 'Ano de leitura', default: currentYear},
    {key: 'poster', label: 'Poster URL', default: '', quote: true},
    {key: 'description', label: 'Descrição', default: '', quote: true},
    {key: 'thoughts', label: 'Pensamentos', default: '', quote: true, optional: true},
    {key: 'quotes', label: 'Citação', default: '', quote: true, optional: true},
    {key: 'recommendBy', label: 'Recomendado por', default: '', quote: true, optional: true},
    {key: 'tags', label: 'Tags separadas por vírgula', default: '', format: formatTags},
    {key: 'url', label: 'URL', default: '', quote: true},
    {key: 'pubDate', label: 'Data de leitura YYYY-MM-DD', default: todayString}
  ]
};
