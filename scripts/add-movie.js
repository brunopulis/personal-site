#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import {createInterface} from 'readline';
import dotenv from 'dotenv';
import {buildFrontmatter, buildFilePath, computeDefaults} from './lib/add-movie.js';

dotenv.config();

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

function ask(question) {
  const rl = createInterface({input: process.stdin, output: process.stdout});
  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer);
    });
  });
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function searchMovies(query) {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=pt-BR`;
  const data = await fetchJson(url);
  return (data.results || []).map(r => ({
    ...r,
    resultType: 'movie',
    displayTitle: r.title,
    year: (r.release_date || '').split('-')[0] || '?'
  }));
}

async function searchShows(query) {
  const url = `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=pt-BR`;
  const data = await fetchJson(url);
  return (data.results || []).map(r => ({
    ...r,
    resultType: 'show',
    displayTitle: r.name,
    year: (r.first_air_date || '').split('-')[0] || '?'
  }));
}

async function getMovieDetails(movieId) {
  const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=pt-BR&append_to_response=credits`;
  return fetchJson(url);
}

async function getTVDetails(showId) {
  const url = `${BASE_URL}/tv/${showId}?api_key=${API_KEY}&language=pt-BR&append_to_response=credits`;
  return fetchJson(url);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Uso: node scripts/add-movie.js <título>');
    console.log('Exemplo: node scripts/add-movie.js Duna');
    process.exit(1);
  }

  const query = args.join(' ');
  console.log(`🔍 Buscando por: "${query}"...`);

  const [movies, shows] = await Promise.allSettled([searchMovies(query), searchShows(query)]);

  const results = [
    ...(movies.status === 'fulfilled' ? movies.value : []),
    ...(shows.status === 'fulfilled' ? shows.value : [])
  ];

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

  const answer = await ask('\nSelecione (número): ');
  const index = parseInt(answer) - 1;

  if (isNaN(index) || index < 0 || index >= results.length) {
    console.log('Seleção inválida.');
    process.exit(1);
  }

  const selected = results[index];
  const isMovie = selected.resultType === 'movie';

  console.log(`\n${isMovie ? '🎬' : '📺'} Buscando detalhes de "${selected.displayTitle}"...`);

  let details;
  try {
    details = isMovie ? await getMovieDetails(selected.id) : await getTVDetails(selected.id);
  } catch (err) {
    console.log(`Erro ao buscar detalhes: ${err.message}`);
    process.exit(1);
  }

  const defaults = computeDefaults(details, selected);

  console.log('\n--- Preencha os campos (Enter para aceitar o valor sugerido) ---\n');

  const title = (await ask(`Título (${defaults.defaultTitle}): `)) || defaults.defaultTitle;
  const director = (await ask(`Diretor(a) (${defaults.defaultDirector || '—'}): `)) || defaults.defaultDirector;

  let category = await ask(`Categoria (${defaults.defaultCategory || '—'}): `);
  if (!category) category = defaults.defaultCategory;

  console.log('\nStatus:');
  const statusOptions = ['assistindo', 'reassistindo', 'abandonei'];
  statusOptions.forEach((s, i) => console.log(`  ${i + 1}. ${s}`));
  const statusAnswer = (await ask('Escolha (1): ')) || '1';
  const status = statusOptions[parseInt(statusAnswer) - 1] || 'assistindo';

  const ratingRaw = await ask('Nota (1-5, Enter para pular): ');
  const rating = ratingRaw ? parseInt(ratingRaw) || '' : '';

  const watchedYear = (await ask(`Ano (${defaults.defaultYear}): `)) || defaults.defaultYear;
  const poster = (await ask(`Poster URL (${defaults.defaultPoster || '—'}): `)) || defaults.defaultPoster;
  const url = (await ask(`URL (${defaults.defaultUrl}): `)) || defaults.defaultUrl;

  const frontmatter = buildFrontmatter({
    title,
    director,
    category,
    status,
    rating,
    type: defaults.type,
    watchedYear,
    poster,
    url,
  });

  const {contentDir, fileName} = buildFilePath({title, type: defaults.type, watchedYear});
  const baseDir = path.resolve(`src/content/watching/${contentDir}`);
  const yearDir = path.join(baseDir, watchedYear);

  if (!fs.existsSync(yearDir)) {
    fs.mkdirSync(yearDir, {recursive: true});
  }

  const filePath = path.join(yearDir, fileName);
  fs.writeFileSync(filePath, frontmatter);
  console.log(`\n✓ Arquivo criado: ${filePath}`);

  // Download poster image for local processing
  if (poster && poster.includes('image.tmdb.org')) {
    const postersDir = path.resolve('src/assets/images/posters');
    if (!fs.existsSync(postersDir)) {
      fs.mkdirSync(postersDir, {recursive: true});
    }

    const posterFilename = poster.split('/').pop();
    const localPath = path.join(postersDir, posterFilename);

    if (!fs.existsSync(localPath)) {
      try {
        const res = await fetch(poster);
        if (res.ok) {
          const buffer = Buffer.from(await res.arrayBuffer());
          fs.writeFileSync(localPath, buffer);
          console.log(`  🖼️ Poster baixado: ${posterFilename}`);
        }
      } catch (err) {
        console.log(`  ⚠️ Falha ao baixar poster: ${err.message}`);
      }
    } else {
      console.log(`  🖼️ Poster já existe: ${posterFilename}`);
    }
  }
}

main().catch(console.error);
