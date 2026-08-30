import slugify from 'slugify';
import {safeDate, safeYear, slugToSegment} from './path-safety.js';
import {currentYear, formatTags, parseChoice, parseRating, quote, todayString} from './util.js';

export function buildFrontmatter(book) {
  const {
    title,
    subtitle = '',
    author = '',
    category = '',
    status = 'lido',
    rating = '',
    poster = '',
    description = '',
    thoughts = '',
    quotes = '',
    attendedYear = currentYear(),
    recommendBy = '',
    tags = [],
    url = '',
    pubDate = todayString()
  } = book;

  let yaml = `---
title: ${quote(title)}
`;
  if (subtitle) yaml += `subtitle: ${quote(subtitle)}\n`;
  yaml += `author: ${quote(author)}
category: ${quote(category)}
status: ${status}
rating: ${rating}
poster: ${quote(poster)}
description: ${quote(description)}
`;
  if (thoughts) yaml += `thoughts: ${quote(thoughts)}\n`;
  if (quotes) yaml += `quotes: ${quote(quotes)}\n`;
  yaml += `attendedYear: ${attendedYear}
`;
  if (recommendBy) yaml += `recommendBy: ${quote(recommendBy)}\n`;
  yaml += `tags: ${formatTags(tags)}
url: ${quote(url)}
pubDate: ${pubDate}
---
`;

  return yaml;
}

export function buildFilePath({title, attendedYear, pubDate}) {
  const year = safeYear(attendedYear);
  const date = safeDate(pubDate);
  const slug = slugToSegment(slugify(title, {lower: true, strict: true}));
  const fileName = `${date}-${slug}.md`;
  return {contentDir: year, fileName};
}

export function buildReviewBody() {
  return `
## O livro em 3 frases

## Impressões

## Como eu descobri esse livro?

## Quem deve ler?

## Como o livro me mudou
Como minha vida / comportamento / pensamentos / ideias mudaram com o resultado da leitura.

## Minhas 3 melhores citações

## Resumo + Notas
`;
}

const TITLE_PROMPT = 'Título';
const STATUS_OPTIONS = ['lido', 'lendo'];

const BOOK_PROMPTS = [
  {key: 'subtitle', label: 'Subtítulo', default: ''},
  {key: 'author', label: 'Autor(a)', default: ''},
  {key: 'category', label: 'Categoria', default: ''},
  {key: 'status', label: 'Status', type: 'choice', options: STATUS_OPTIONS, default: '1'},
  {key: 'rating', label: 'Nota (1-5, Enter para pular)', parse: parseRating, default: ''},
  {key: 'attendedYear', label: 'Ano de leitura', default: currentYear},
  {key: 'poster', label: 'Poster URL', default: ''},
  {key: 'description', label: 'Descrição', default: ''},
  {key: 'thoughts', label: 'Pensamentos', default: ''},
  {key: 'quotes', label: 'Citação', default: ''},
  {key: 'recommendBy', label: 'Recomendado por', default: ''},
  {key: 'tags', label: 'Tags separadas por vírgula', default: ''},
  {key: 'url', label: 'URL', default: ''},
  {key: 'pubDate', label: 'Data de leitura YYYY-MM-DD', default: todayString}
];

async function askTitle(ask, suggestedTitle) {
  let title = '';
  while (!title) {
    title = (await ask(`${TITLE_PROMPT}${suggestedTitle ? ` (${suggestedTitle})` : ''}: `)) || suggestedTitle;
    if (!title) console.log('  ⚠️ O título é obrigatório.');
  }
  return title;
}

async function askChoice(ask, prompt) {
  prompt.options.forEach((option, index) => console.log(`  ${index + 1}. ${option}`));
  const answer = (await ask(`Escolha (${prompt.default}): `)) || prompt.default;
  return parseChoice(answer, prompt.options);
}

export async function collectBookInput(ask, suggestedTitle = '') {
  const book = {
    title: await askTitle(ask, suggestedTitle)
  };

  for (const prompt of BOOK_PROMPTS) {
    if (prompt.type === 'choice') {
      book[prompt.key] = await askChoice(ask, prompt);
      continue;
    }

    const defaultValue = typeof prompt.default === 'function' ? prompt.default() : prompt.default;
    const hint = prompt.parse ? '' : defaultValue === '' ? ' (—)' : ` (${defaultValue})`;
    const answer = (await ask(`${prompt.label}${hint}: `)) || defaultValue;
    book[prompt.key] = prompt.parse ? prompt.parse(answer) : answer;
  }

  return book;
}
