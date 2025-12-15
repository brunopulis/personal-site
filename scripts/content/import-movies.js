import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';

config();

/**
 * Importa filmes da sua conta TMDB como arquivos Markdown individuais
 * Para usar com TinaCMS
 * 
 * Uso: node scripts/import-tmdb-movies.js
 */

const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

async function getAccountInfo() {
  const response = await fetch(`${BASE_URL}/account`, {
    headers: {
      'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error(`Erro ao buscar conta: ${response.statusText}`);
  }
  
  return await response.json();
}

async function getRatedMovies(accountId, page = 1) {
  const response = await fetch(
    `${BASE_URL}/account/${accountId}/rated/movies?page=${page}&sort_by=created_at.desc`,
    {
      headers: {
        'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  );
  
  if (!response.ok) {
    throw new Error(`Erro ao buscar filmes: ${response.statusText}`);
  }
  
  return await response.json();
}

async function getMovieDetails(movieId) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?append_to_response=credits,keywords,videos`,
    {
      headers: {
        'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  );
  
  if (!response.ok) {
    return null;
  }
  
  return await response.json();
}

async function getFavoriteMovies(accountId) {
  const response = await fetch(
    `${BASE_URL}/account/${accountId}/favorite/movies?page=1`,
    {
      headers: {
        'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  );
  
  if (!response.ok) {
    return [];
  }
  
  const data = await response.json();
  return data.results || [];
}

async function fetchAllMovies(fetchFunction, accountId) {
  let allMovies = [];
  let page = 1;
  let totalPages = 1;
  
  do {
    const data = await fetchFunction(accountId, page);
    allMovies = allMovies.concat(data.results);
    totalPages = data.total_pages;
    page++;
    await new Promise(resolve => setTimeout(resolve, 250));
  } while (page <= totalPages && page <= 50);
  
  return allMovies;
}

function createMovieMarkdown(movie, details, isFavorite, watchedYear) {
  const slug = movie.title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  
  const releaseYear = movie.release_date?.substring(0, 4) || '';
  const watchedDate = movie.rated_at || movie.created_at || '';
  
  const genres = details?.genres?.map(g => g.name) || [];
  const director = details?.credits?.crew?.find(c => c.job === 'Director')?.name || '';
  const cast = details?.credits?.cast?.slice(0, 5).map(c => c.name) || [];
  const runtime = details?.runtime || 0;
  
  const trailerKey = details?.videos?.results?.find(v => 
    v.type === 'Trailer' && v.site === 'YouTube'
  )?.key || '';
  
  return `---
title: ${movie.title}
slug: ${slug}
originalTitle: ${movie.original_title || movie.title}
tmdbId: ${movie.id}
type: movie
releaseYear: ${releaseYear}
releaseDate: ${movie.release_date || ''}
posterPath: ${movie.poster_path || ''}
backdropPath: ${movie.backdrop_path || ''}
watchedDate: ${watchedDate}
watchedYear: ${watchedYear}
myRating: ${movie.rating || 0}
tmdbRating: ${movie.vote_average || 0}
voteCount: ${movie.vote_count || 0}
isFavorite: ${isFavorite}
status: watched
genres:
${genres.map(g => `  - ${g}`).join('\n') || '  - Desconhecido'}
director: ${director}
cast:
${cast.map(c => `  - ${c}`).join('\n')}
runtime: ${runtime}
originalLanguage: ${movie.original_language || 'en'}
budget: ${details?.budget || 0}
revenue: ${details?.revenue || 0}
trailerKey: ${trailerKey}
tmdbUrl: https://www.themoviedb.org/movie/${movie.id}
tags: []
---

${movie.overview || details?.overview || 'Sinopse não disponível.'}

${details?.tagline ? `\n> "${details.tagline}"\n` : ''}

## Informações Adicionais

**Diretor:** ${director || 'Desconhecido'}
**Elenco Principal:** ${cast.join(', ') || 'Não disponível'}
${runtime ? `**Duração:** ${runtime} minutos` : ''}
${details?.budget ? `**Orçamento:** $${details.budget.toLocaleString('en-US')}` : ''}
${details?.revenue ? `**Bilheteria:** $${details.revenue.toLocaleString('en-US')}` : ''}

---

*Assistido em ${watchedYear || 'data desconhecida'}*
*Importado do TMDB em ${new Date().toLocaleDateString('pt-BR')}*
`;
}

async function main() {
  try {
    if (!TMDB_ACCESS_TOKEN) {
      console.error('❌ TMDB_ACCESS_TOKEN não encontrado no .env');
      console.log('\n📖 Como obter seu Access Token:');
      console.log('1. Acesse: https://www.themoviedb.org/settings/api');
      console.log('2. Em "API Read Access Token", copie o token');
      console.log('3. Adicione no .env: TMDB_ACCESS_TOKEN=seu_token_aqui');
      return;
    }
    
    console.log('🎬 Importando filmes da sua conta TMDB...\n');
    
    const accountInfo = await getAccountInfo();
    console.log(`✓ Conta: ${accountInfo.username || accountInfo.name}\n`);
    
    const accountId = accountInfo.id;
    
    console.log('⭐ Buscando filmes avaliados...');
    const ratedMovies = await fetchAllMovies(getRatedMovies, accountId);
    console.log(`✓ ${ratedMovies.length} filmes encontrados\n`);
    
    console.log('❤️  Buscando favoritos...');
    const favoriteMovies = await getFavoriteMovies(accountId);
    const favoriteIds = new Set(favoriteMovies.map(m => m.id));
    console.log(`✓ ${favoriteMovies.length} favoritos\n`);
    
    const baseDir = path.join(process.cwd(), 'src', 'content', 'medias');
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
    }
    
    console.log('📥 Importando filmes...\n');
    
    let imported = 0;
    let skipped = 0;
    let failed = 0;
    
    // Organiza filmes por ano
    const moviesByYear = {};
    ratedMovies.forEach(movie => {
      const watchedDate = movie.rated_at || movie.created_at;
      const year = watchedDate ? new Date(watchedDate).getFullYear() : 'Sem data';
      if (!moviesByYear[year]) moviesByYear[year] = [];
      moviesByYear[year].push(movie);
    });
    
    for (const [year, movies] of Object.entries(moviesByYear)) {
      // Cria diretório do ano
      const yearDir = path.join(baseDir, year.toString());
      if (!fs.existsSync(yearDir)) {
        fs.mkdirSync(yearDir, { recursive: true });
      }
      
      console.log(`📁 Importando filmes de ${year}...`);
      
      for (const movie of movies) {
        const slug = movie.title
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
        
        const filePath = path.join(yearDir, `${slug}.md`);
        
        if (fs.existsSync(filePath)) {
          console.log(`  ⏭️  ${movie.title} - já existe`);
          skipped++;
          continue;
        }
        
        try {
          console.log(`  ⬇️  ${movie.title}...`);
          
          // Busca detalhes completos
          const details = await getMovieDetails(movie.id);
          const isFavorite = favoriteIds.has(movie.id);
          
          const markdown = createMovieMarkdown(movie, details, isFavorite, year);
          fs.writeFileSync(filePath, markdown);
          
          console.log(`  ✅ ${movie.title} - importado`);
          imported++;
          
          await new Promise(resolve => setTimeout(resolve, 300));
          
        } catch (error) {
          console.error(`  ❌ ${movie.title} - erro: ${error.message}`);
          failed++;
        }
      }
      
      console.log(`✓ ${year}: ${movies.length} filmes\n`);
    }
    
    console.log(`\n📊 RESUMO:
  ✅ Importados: ${imported}
  ⏭️  Pulados (já existem): ${skipped}
  ❌ Falharam: ${failed}
  📁 Total: ${ratedMovies.length}
    `);
    
    console.log('📁 Estrutura criada:');
    Object.keys(moviesByYear).sort((a, b) => {
      if (a === 'Sem data') return 1;
      if (b === 'Sem data') return -1;
      return parseInt(b) - parseInt(a);
    }).forEach(year => {
      console.log(`   src/content/medias/${year}/ - ${moviesByYear[year].length} filmes`);
    });
    
    if (imported > 0) {
      console.log(`\n🎉 Importação concluída!
💡 Próximos passos:
   1. Veja os arquivos em: src/content/medias/{ANO}/
   2. Configure o TinaCMS para gerenciar filmes
   3. Acesse /admin para editar seus filmes
   4. Adicione notas e tags personalizadas
      `);
    }
    
  } catch (error) {
    console.error('\n❌ Erro:', error.message);
  }
}

main();