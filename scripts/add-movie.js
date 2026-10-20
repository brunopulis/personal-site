#!/usr/bin/env node

import fs from 'fs';
import {resolve as resolvePath} from 'node:path';
import dotenv from 'dotenv';
import {buildFrontmatter, buildFilePath, computeDefaults, collectMovieInput} from './lib/add-movie.js';
import {searchTitles, getDetails} from './lib/tmdb.js';
import {createPrompter} from './lib/prompter.js';
import {resolveInside, safeFilename} from './lib/path-safety.js';

dotenv.config();

function writeMovieFile(input) {
  const {contentDir, fileName, year} = buildFilePath(input);
  const baseDir = resolveInside('src/content/watching', contentDir);
  const yearDir = resolveInside(baseDir, year);
  fs.mkdirSync(yearDir, {recursive: true});
  const filePath = resolveInside(yearDir, fileName);
  fs.writeFileSync(filePath, buildFrontmatter(input));
  return filePath;
}

async function downloadPoster(poster) {
  let posterUrl;
  try {
    posterUrl = new URL(poster);
  } catch {
    return;
  }

  if (posterUrl.hostname !== 'image.tmdb.org') return;

  const postersDir = 'src/assets/images/posters';
  fs.mkdirSync(postersDir, {recursive: true});
  const posterName = safeFilename(posterUrl.pathname.split('/').pop());
  const localPath = resolveInside(postersDir, posterName);

  if (fs.existsSync(localPath)) {
    console.log(`  🖼️ Poster já existe: ${posterName}`);
    return;
  }

  try {
    const res = await fetch(posterUrl);
    if (!res.ok) return;
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(localPath, buffer);
    console.log(`  🖼️ Poster baixado: ${posterName}`);
  } catch (err) {
    console.log(`  ⚠️ Falha ao baixar poster: ${err.message}`);
  }
}

async function main(argv) {
  if (!process.env.TMDB_API_KEY) {
    console.log('⚠️ TMDB_API_KEY não encontrada. Defina no arquivo .env.');
    process.exit(1);
  }

  const suggestedTitle = argv.join(' ');
  if (!suggestedTitle) {
    console.log('Uso: node scripts/add-movie.js <título>');
    console.log('Exemplo: node scripts/add-movie.js Duna');
    process.exit(1);
  }

  console.log(`🔍 Buscando por: "${suggestedTitle}"...`);
  const results = await searchTitles(suggestedTitle);

  if (results.length === 0) {
    console.log('Nenhum resultado encontrado.');
    process.exit(1);
  }

  console.log('\nResultados:\n');
  results.forEach((r, i) => {
    const tag = r.resultType === 'movie' ? 'FILME' : 'SÉRIE';
    const score = r.vote_average ? r.vote_average.toFixed(1) : '?';
    console.log(`  ${i + 1}. [${tag}] ${r.displayTitle} (${r.year}) ${score}`);
  });

  const prompter = createPrompter(process.stdin);
  const ask = question => prompter.ask(question);

  const selection = (await ask('\nSelecione (número): ')) || '1';
  const index = parseInt(selection, 10) - 1;

  if (isNaN(index) || index < 0 || index >= results.length) {
    console.log('Seleção inválida.');
    prompter.close();
    process.exit(1);
  }

  const selected = results[index];
  const isMovie = selected.resultType === 'movie';

  console.log(`\n${isMovie ? '🎬' : '📺'} Buscando detalhes de "${selected.displayTitle}"...`);

  let details;
  try {
    details = await getDetails(selected.id, selected.resultType);
  } catch (err) {
    console.log(`Erro ao buscar detalhes: ${err.message}`);
    prompter.close();
    process.exit(1);
  }

  const defaults = computeDefaults(details, selected);

  console.log('\n--- Preencha os campos (Enter para aceitar o valor sugerido) ---\n');

  const input = await collectMovieInput(ask, defaults);
  const filePath = writeMovieFile(input);
  console.log(`\n✓ Arquivo criado: ${filePath}`);

  await downloadPoster(input.poster);

  prompter.close();
}

const isMain = process.argv[1] && resolvePath(import.meta.dirname, process.argv[1]) === import.meta.filename;
if (isMain) {
  main(process.argv.slice(2)).catch(console.error);
}
