#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import slugify from 'slugify';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function searchMovie(query) {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=pt-BR`;
  const response = await fetchJson(url);
  return response.results || [];
}

async function getMovieDetails(movieId) {
  const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=pt-BR&append_to_response=credits`;
  return fetchJson(url);
}

function getYear(dateStr) {
  if (!dateStr) return new Date().getFullYear();
  return dateStr.split('-')[0];
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log('Usage: node scripts/add-movie.js <movie title>');
    console.log('Example: node scripts/add-movie.js Dune');
    process.exit(1);
  }

  const query = args.join(' ');
  console.log(`Procurando por: "${query}"...`);

  const results = await searchMovie(query);

  if (results.length === 0) {
    console.log('Nenhum filme encontrado.');
    process.exit(1);
  }

  console.log('\nSearch results:\n');
  results.forEach((movie, i) => {
    const date = movie.release_date ? ` (${movie.release_date.split('-')[0]})` : '';
    console.log(`${i + 1}. ${movie.title}${date} - ${movie.vote_average.toFixed(1)}`);
  });

  console.log('\nSelecione um filme (número): ');

  const readline = await import('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('', async answer => {
    rl.close();
    const index = parseInt(answer) - 1;

    if (isNaN(index) || index < 0 || index >= results.length) {
      console.log('Invalid selection.');
      process.exit(1);
    }

    const movie = results[index];
    const year = getYear(movie.release_date);
    const fileName = `${year}-${slugify(movie.title, {lower: true})}.md`;

    const moviesDir = path.resolve('src/content/watching/movies', year);

    if (!fs.existsSync(moviesDir)) {
      fs.mkdirSync(moviesDir, {recursive: true});
    }

    const filePath = path.join(moviesDir, fileName);

    // Get full details for director
    const details = await getMovieDetails(movie.id);
    const director = details.credits?.crew?.find(c => c.job === 'Director')?.name || '';
    const genres = details.genres?.map(g => g.name).join(', ') || '';

    const frontmatter = `---
title: ${movie.title}
director: ${director}
category: ${genres}
status: assistido
rating:
type: movie
watchedYear: ${year}
poster: ${movie.poster_path ? `https://image.tmdb.org/t/p/w600_and_h900_face${movie.poster_path}` : ''}
url: 'https://www.themoviedb.org/movie/${movie.id}-${slugify(movie.title, {lower: true})}'
watchedDate: ${new Date().toISOString()}
favorite: false
---

`;

    fs.writeFileSync(filePath, frontmatter);
    console.log(`\nCreated: ${filePath}`);
  });
}

main().catch(console.error);
