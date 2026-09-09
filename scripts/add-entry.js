import readline from 'node:readline/promises';
import {stdin, stdout} from 'node:process';
import fs from 'node:fs/promises';
import path from 'node:path';
import {buildFrontmatter} from './lib/frontmatter.js';
import {buildFilePath} from './lib/file-path.js';
import {collectInput} from './lib/prompts.js';
import {computeDefaults} from './lib/providers/tmdb.js';
import {bookSchema} from './schemas/book.js';
import {buildMovieSchema} from './schemas/movie.js';
import {buildShowSchema} from './schemas/show.js';

/** @param {string} type @param {any} [tmdbDefaults] */
function resolveSchema(type, tmdbDefaults) {
  if (type === 'book') return bookSchema;
  if (type === 'movie') return buildMovieSchema(tmdbDefaults);
  if (type === 'tv') return buildShowSchema(tmdbDefaults);
  throw new Error(`Tipo desconhecido: ${type}`);
}

async function main() {
  const rl = readline.createInterface({input: stdin, output: stdout});
  const ask = (/** @type {string} */ prompt) => rl.question(prompt);

  const type = process.argv[2] || 'book';

  // Se vier de uma busca no TMDB (details + selected já resolvidos em outro lugar):
  // const tmdbDefaults = computeDefaults(details, selected);
  const schema = resolveSchema(type /*, tmdbDefaults */);

  const data = await collectInput(ask, schema);
  const frontmatter = buildFrontmatter(schema, data);
  const {contentDir, fileName} = buildFilePath(schema, data);

  const fullDir = path.join('content', contentDir);
  await fs.mkdir(fullDir, {recursive: true});
  await fs.writeFile(path.join(fullDir, fileName), frontmatter);

  console.log(`✅ Criado: ${path.join(fullDir, fileName)}`);
  rl.close();
}

main();
