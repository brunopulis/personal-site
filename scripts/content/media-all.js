import fs from 'node:fs';
import path from 'node:path';
import { config } from 'dotenv';
import fetch from 'node-fetch';

config();

/**
 * Script melhorado que busca filmes de TODAS as listas do TMDB:
 * - Filmes avaliados (rated)
 * - Filmes favoritos (favorites)
 * - Watchlist (para assistir)
 * - Listas personalizadas
 *
 * Uso: node scripts/import-all-tmdb-movies.js
 */

const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
const BASE_URL = 'https://api.themoviedb.org/3';

async function getAccountInfo() {
  const response = await fetch(`${BASE_URL}/account`, {
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
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
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) return { results: [], total_pages: 0 };
  return await response.json();
}

async function getFavoriteMovies(accountId, page = 1) {
  const response = await fetch(
    `${BASE_URL}/account/${accountId}/favorite/movies?page=${page}&sort_by=created_at.desc`,
    {
      headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) return { results: [], total_pages: 0 };
  return await response.json();
}

async function getWatchlist(accountId, page = 1) {
  const response = await fetch(
    `${BASE_URL}/account/${accountId}/watchlist/movies?page=${page}&sort_by=created_at.desc`,
    {
      headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) return { results: [], total_pages: 0 };
  return await response.json();
}

async function getCustomLists(accountId, page = 1) {
  const response = await fetch(`${BASE_URL}/account/${accountId}/lists?page=${page}`, {
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) return { results: [], total_pages: 0 };
  return await response.json();
}

async function getListDetails(listId) {
  const response = await fetch(`${BASE_URL}/list/${listId}`, {
    headers: {
      Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) return { items: [] };
  return await response.json();
}

async function getMovieDetails(movieId) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?append_to_response=credits,keywords,videos,account_states`,
    {
      headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) return null;
  return await response.json();
}

async function fetchAllFromEndpoint(fetchFunction, accountId) {
  let allItems = [];
  let page = 1;
  let totalPages = 1;

  do {
    const data = await fetchFunction(accountId, page);
    allItems = allItems.concat(data.results || []);
    totalPages = data.total_pages || 0;
    page++;
    await new Promise(resolve => setTimeout(resolve, 250));
  } while (page <= totalPages && page <= 50);

  return allItems;
}

function createMovieMarkdown(movie, details, metadata) {
  const slug = movie.title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const releaseYear = movie.release_date?.substring(0, 4) || '';

  // Determina a data de visualização
  let watchedDate = '';
  let watchedYear = '';

  if (metadata.rated_at) {
    watchedDate = metadata.rated_at;
    watchedYear = new Date(metadata.rated_at).getFullYear();
  } else if (metadata.created_at) {
    watchedDate = metadata.created_at;
    watchedYear = new Date(metadata.created_at).getFullYear();
  } else if (details?.account_states?.rated) {
    // Filme foi avaliado, mas não temos a data exata
    watchedYear = new Date().getFullYear();
    watchedDate = new Date().toISOString();
  }

  const genres = details?.genres?.map(g => g.name) || [];
  const director = details?.credits?.crew?.find(c => c.job === 'Director')?.name || '';
  const cast = details?.credits?.cast?.slice(0, 5).map(c => c.name) || [];
  const runtime = details?.runtime || 0;

  const trailerKey =
    details?.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')?.key || '';

  // Pega a avaliação
  const myRating = metadata.rating || details?.account_states?.rated?.value || 0;

  return {
    content: `---
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
myRating: ${myRating}
tmdbRating: ${movie.vote_average || 0}
voteCount: ${movie.vote_count || 0}
isFavorite: ${metadata.isFavorite || false}
inWatchlist: ${metadata.inWatchlist || false}
status: ${metadata.status || 'watched'}
sources:
${metadata.sources?.map(s => `  - ${s}`).join('\n') || '  - unknown'}
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

*${metadata.status === 'want-to-watch' ? 'Na lista para assistir' : `Assistido em ${watchedYear || 'data desconhecida'}`}*
*Importado do TMDB em ${new Date().toLocaleDateString('pt-BR')}*
`,
    year: watchedYear || 'Sem data',
    slug: slug,
  };
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

    console.log('🎬 Buscando TODOS os filmes da sua conta TMDB...\n');

    const accountInfo = await getAccountInfo();
    console.log(`✓ Conta: ${accountInfo.username || accountInfo.name}\n`);
    const accountId = accountInfo.id;

    // Busca de todas as fontes
    console.log('📊 Buscando de múltiplas listas...\n');

    console.log('⭐ Filmes avaliados...');
    const ratedMovies = await fetchAllFromEndpoint(getRatedMovies, accountId);
    console.log(`   ✓ ${ratedMovies.length} filmes com avaliação`);

    console.log('❤️  Filmes favoritos...');
    const favoriteMovies = await fetchAllFromEndpoint(getFavoriteMovies, accountId);
    console.log(`   ✓ ${favoriteMovies.length} favoritos`);

    console.log('📝 Watchlist (para assistir)...');
    const watchlistMovies = await fetchAllFromEndpoint(getWatchlist, accountId);
    console.log(`   ✓ ${watchlistMovies.length} na watchlist`);

    console.log('📋 Listas personalizadas...');
    const customLists = await fetchAllFromEndpoint(getCustomLists, accountId);
    console.log(`   ✓ ${customLists.length} listas encontradas\n`);

    // Busca filmes das listas personalizadas
    let customListMovies = [];
    for (const list of customLists) {
      console.log(`   📑 Buscando lista "${list.name}"...`);
      const listDetails = await getListDetails(list.id);
      customListMovies = customListMovies.concat(listDetails.items || []);
      await new Promise(resolve => setTimeout(resolve, 250));
    }
    console.log(`   ✓ ${customListMovies.length} filmes em listas personalizadas\n`);

    // Consolida todos os filmes únicos
    const movieMap = new Map();
    const favoriteIds = new Set(favoriteMovies.map(m => m.id));
    const watchlistIds = new Set(watchlistMovies.map(m => m.id));

    // Adiciona filmes avaliados
    ratedMovies.forEach(movie => {
      if (!movieMap.has(movie.id)) {
        movieMap.set(movie.id, {
          ...movie,
          metadata: {
            rated_at: movie.rated_at,
            rating: movie.rating,
            isFavorite: favoriteIds.has(movie.id),
            inWatchlist: watchlistIds.has(movie.id),
            status: 'watched',
            sources: ['rated'],
          },
        });
      }
    });

    // Adiciona favoritos que não foram avaliados
    favoriteMovies.forEach(movie => {
      if (!movieMap.has(movie.id)) {
        movieMap.set(movie.id, {
          ...movie,
          metadata: {
            created_at: movie.created_at,
            isFavorite: true,
            inWatchlist: watchlistIds.has(movie.id),
            status: 'watched',
            sources: ['favorites'],
          },
        });
      } else {
        movieMap.get(movie.id).metadata.sources.push('favorites');
      }
    });

    // Adiciona watchlist
    watchlistMovies.forEach(movie => {
      if (!movieMap.has(movie.id)) {
        movieMap.set(movie.id, {
          ...movie,
          metadata: {
            created_at: movie.created_at,
            isFavorite: favoriteIds.has(movie.id),
            inWatchlist: true,
            status: 'want-to-watch',
            sources: ['watchlist'],
          },
        });
      } else {
        movieMap.get(movie.id).metadata.sources.push('watchlist');
      }
    });

    // Adiciona filmes de listas personalizadas
    customListMovies.forEach(movie => {
      if (!movieMap.has(movie.id)) {
        movieMap.set(movie.id, {
          ...movie,
          metadata: {
            isFavorite: favoriteIds.has(movie.id),
            inWatchlist: watchlistIds.has(movie.id),
            status: 'watched',
            sources: ['custom_list'],
          },
        });
      } else {
        if (!movieMap.get(movie.id).metadata.sources.includes('custom_list')) {
          movieMap.get(movie.id).metadata.sources.push('custom_list');
        }
      }
    });

    const allMovies = Array.from(movieMap.values());

    console.log(`\n📊 Total consolidado: ${allMovies.length} filmes únicos\n`);

    if (allMovies.length === 0) {
      console.log('❌ Nenhum filme encontrado na sua conta.');
      console.log('\n💡 Dicas:');
      console.log('   1. Avalie alguns filmes no TMDB');
      console.log('   2. Adicione filmes aos favoritos');
      console.log('   3. Crie uma watchlist');
      console.log('   4. Verifique se o token está correto');
      return;
    }

    const baseDir = path.join(process.cwd(), 'src', 'content', 'medias');
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
    }

    console.log('📥 Importando filmes...\n');

    let imported = 0;
    let skipped = 0;
    let failed = 0;

    for (const movieData of allMovies) {
      try {
        console.log(`⬇️  ${movieData.title}...`);

        // Busca detalhes completos
        const details = await getMovieDetails(movieData.id);

        // Cria conteúdo do arquivo
        const { content, year, slug } = createMovieMarkdown(movieData, details, movieData.metadata);

        // Cria diretório do ano
        const yearDir = path.join(baseDir, year.toString());
        if (!fs.existsSync(yearDir)) {
          fs.mkdirSync(yearDir, { recursive: true });
        }

        const filePath = path.join(yearDir, `${slug}.md`);

        if (fs.existsSync(filePath)) {
          console.log(`   ⏭️  já existe`);
          skipped++;
          continue;
        }

        fs.writeFileSync(filePath, content);
        console.log(`   ✅ importado em ${year}/`);
        imported++;

        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (error) {
        console.error(`   ❌ erro: ${error.message}`);
        failed++;
      }
    }

    console.log(`\n📊 RESUMO FINAL:`);
    console.log(`   Total de filmes: ${allMovies.length}`);
    console.log(`   ✅ Importados: ${imported}`);
    console.log(`   ⏭️  Pulados: ${skipped}`);
    console.log(`   ❌ Falharam: ${failed}`);

    // Mostra distribuição por fontes
    const sources = {};
    allMovies.forEach(m => {
      m.metadata.sources.forEach(s => {
        sources[s] = (sources[s] || 0) + 1;
      });
    });

    console.log(`\n📊 Por fonte:`);
    Object.entries(sources).forEach(([source, count]) => {
      const labels = {
        rated: 'Avaliados',
        favorites: 'Favoritos',
        watchlist: 'Watchlist',
        custom_list: 'Listas personalizadas',
      };
      console.log(`   ${labels[source]}: ${count}`);
    });

    console.log(`\n✅ Concluído!`);
    console.log('\n💡 Próximos passos:');
    console.log('   - Veja os arquivos em: src/content/medias/');
    console.log('   - Configure o TinaCMS para gerenciar');
    console.log('   - Execute novamente para adicionar novos filmes');
  } catch (error) {
    console.error('\n❌ Erro:', error.message);

    if (error.message.includes('401')) {
      console.log('\n🔑 Erro de autenticação. Verifique:');
      console.log('   1. TMDB_ACCESS_TOKEN está correto no .env');
      console.log('   2. O token não expirou');
      console.log('   3. Você tem permissão para acessar a conta');
    }
  }
}

main();
