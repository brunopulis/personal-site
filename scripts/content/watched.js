import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { config } from 'dotenv';

config();

/**
 * Busca filmes assistidos da sua conta TMDB
 * Organiza por ano de visualização
 * 
 * Uso: node scripts/fetch-tmdb-watched.js
 */

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;
const TMDB_ACCOUNT_ID = process.env.TMDB_ACCOUNT_ID;

const BASE_URL = 'https://api.themoviedb.org/3';

/**
 * Busca informações da conta
 */
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

/**
 * Busca filmes com rating (assistidos)
 */
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

/**
 * Busca lista de watchlist (filmes marcados para assistir)
 */
async function getWatchlist(accountId, page = 1) {
  const response = await fetch(
    `${BASE_URL}/account/${accountId}/watchlist/movies?page=${page}&sort_by=created_at.desc`,
    {
      headers: {
        'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  );
  
  if (!response.ok) {
    throw new Error(`Erro ao buscar watchlist: ${response.statusText}`);
  }
  
  return await response.json();
}

/**
 * Busca filmes favoritos
 */
async function getFavoriteMovies(accountId, page = 1) {
  const response = await fetch(
    `${BASE_URL}/account/${accountId}/favorite/movies?page=${page}&sort_by=created_at.desc`,
    {
      headers: {
        'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  );
  
  if (!response.ok) {
    throw new Error(`Erro ao buscar favoritos: ${response.statusText}`);
  }
  
  return await response.json();
}

/**
 * Busca detalhes completos de um filme
 */
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
    throw new Error(`Erro ao buscar detalhes do filme ${movieId}`);
  }
  
  return await response.json();
}

/**
 * Busca todos os filmes com paginação
 */
async function fetchAllMovies(fetchFunction, accountId) {
  let allMovies = [];
  let page = 1;
  let totalPages = 1;
  
  do {
    console.log(`  📄 Buscando página ${page}...`);
    const data = await fetchFunction(accountId, page);
    allMovies = allMovies.concat(data.results);
    totalPages = data.total_pages;
    page++;
    
    // Rate limiting - aguarda 250ms entre requisições
    await new Promise(resolve => setTimeout(resolve, 250));
  } while (page <= totalPages && page <= 50); // Limita a 50 páginas (1000 filmes)
  
  return allMovies;
}

/**
 * Cria conteúdo Markdown para um filme
 */
function createMovieMarkdown(movie, details, watchedYear) {
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
watchedYear: ${watchedYear !== 'Sem data' ? watchedYear : ''}
myRating: ${movie.rating || 0}
tmdbRating: ${movie.vote_average || 0}
voteCount: ${movie.vote_count || 0}
isFavorite: ${movie.isFavorite || false}
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

*Assistido em ${watchedYear !== 'Sem data' ? watchedYear : 'data desconhecida'}*
*Importado do TMDB em ${new Date().toLocaleDateString('pt-BR')}*
`;
}

/**
 * Organiza filmes por ano de visualização
 */
function organizeByYear(movies) {
  const byYear = {};
  
  movies.forEach(movie => {
    // Tenta extrair o ano da data de rating/adição
    let year = 'Sem data';
    
    if (movie.rated_at) {
      year = new Date(movie.rated_at).getFullYear();
    } else if (movie.created_at) {
      year = new Date(movie.created_at).getFullYear();
    }
    
    if (!byYear[year]) {
      byYear[year] = [];
    }
    
    byYear[year].push(movie);
  });
  
  return byYear;
}

/**
 * Função principal
 */
async function main() {
  try {
    // Validações
    if (!TMDB_ACCESS_TOKEN) {
      console.error('❌ TMDB_ACCESS_TOKEN não encontrado no .env');
      console.log('\n📖 Como obter seu Access Token:');
      console.log('1. Acesse: https://www.themoviedb.org/settings/api');
      console.log('2. Em "API Read Access Token", copie o token');
      console.log('3. Adicione no .env: TMDB_ACCESS_TOKEN=seu_token_aqui');
      return;
    }
    
    console.log('🎬 Buscando filmes da sua conta TMDB...\n');
    
    // Busca informações da conta
    console.log('👤 Obtendo informações da conta...');
    const accountInfo = await getAccountInfo();
    console.log(`✓ Conta: ${accountInfo.username || accountInfo.name}`);
    console.log(`  ID: ${accountInfo.id}\n`);
    
    const accountId = accountInfo.id;
    
    // Busca filmes com rating (assistidos)
    console.log('⭐ Buscando filmes com avaliação...');
    const ratedMovies = await fetchAllMovies(getRatedMovies, accountId);
    console.log(`✓ ${ratedMovies.length} filmes avaliados\n`);
    
    // Busca favoritos
    console.log('❤️  Buscando filmes favoritos...');
    const favoriteMovies = await fetchAllMovies(getFavoriteMovies, accountId);
    console.log(`✓ ${favoriteMovies.length} filmes favoritos\n`);
    
    // Marca favoritos
    const favoriteIds = new Set(favoriteMovies.map(m => m.id));
    ratedMovies.forEach(movie => {
      movie.isFavorite = favoriteIds.has(movie.id);
    });
    
    // Organiza por ano
    console.log('📅 Organizando filmes por ano...');
    const moviesByYear = organizeByYear(ratedMovies);
    console.log(`✓ Organizado em ${Object.keys(moviesByYear).length} anos\n`);
    
    // Cria diretório de saída base
    const baseDir = path.join(process.cwd(), 'src', 'content', 'medias');
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
    }
    
    // Gera arquivos Markdown individuais por ano
    console.log('📝 Gerando arquivos Markdown...\n');
    
    let totalCreated = 0;
    let totalSkipped = 0;
    
    for (const [year, movies] of Object.entries(moviesByYear)) {
      // Cria diretório do ano
      const yearDir = path.join(baseDir, year.toString());
      if (!fs.existsSync(yearDir)) {
        fs.mkdirSync(yearDir, { recursive: true });
      }
      
      console.log(`📁 Criando filmes de ${year}...`);
      
      for (const movie of movies) {
        // Cria slug do título
        const slug = movie.title
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '');
        
        const filePath = path.join(yearDir, `${slug}.md`);
        
        // Verifica se já existe
        if (fs.existsSync(filePath)) {
          console.log(`  ⏭️  ${movie.title} - já existe`);
          totalSkipped++;
          continue;
        }
        
        // Busca detalhes completos se necessário
        let details = null;
        try {
          details = await getMovieDetails(movie.id);
          await new Promise(resolve => setTimeout(resolve, 250)); // Rate limiting
        } catch (error) {
          console.log(`  ⚠️  ${movie.title} - erro ao buscar detalhes, usando dados básicos`);
        }
        
        // Gera conteúdo do arquivo
        const markdown = createMovieMarkdown(movie, details, year);
        fs.writeFileSync(filePath, markdown);
        
        console.log(`  ✅ ${movie.title}`);
        totalCreated++;
      }
      
      console.log(`✓ ${year}: ${movies.length} filmes\n`);
    }
    
    console.log(`📊 Arquivos criados: ${totalCreated}`);
    console.log(`⏭️  Arquivos pulados (já existiam): ${totalSkipped}\n`);
    
    // Sumário
    console.log('📊 RESUMO:');
    console.log(`   Total de filmes: ${ratedMovies.length}`);
    console.log(`   Favoritos: ${favoriteMovies.length}`);
    console.log(`   Anos diferentes: ${Object.keys(moviesByYear).length}`);
    console.log(`   Arquivos criados: ${totalCreated}`);
    console.log(`   Arquivos pulados: ${totalSkipped}\n`);
    
    console.log('📁 Estrutura criada:');
    Object.keys(moviesByYear).sort((a, b) => {
      if (a === 'Sem data') return 1;
      if (b === 'Sem data') return -1;
      return parseInt(b) - parseInt(a);
    }).forEach(year => {
      console.log(`   src/content/medias/${year}/ - ${moviesByYear[year].length} filmes`);
    });
    
    console.log('\n✅ Concluído!');
    console.log('\n💡 Próximos passos:');
    console.log('   - Veja os arquivos em: src/content/medias/');
    console.log('   - Cada filme está em: src/content/medias/{ANO}/{filme}.md');
    console.log('   - Configure o TinaCMS para gerenciar os filmes');
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