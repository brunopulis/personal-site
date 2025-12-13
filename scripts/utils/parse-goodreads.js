#!/usr/bin/env node

/**
 * Script para converter dados do Goodreads (review.json) para o formato books.json
 *
 * Usage: node scripts/parse-goodreads.js [options]
 *
 * Options:
 *   --merge     Fazer merge com books.json existente (padrão: true)
 *   --status    Status para filtrar (padrão: read)
 *   --output    Arquivo de saída (padrão: src/_data/books.json)
 */

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurações
const CONFIG = {
  goodreadsFile: path.join(__dirname, '../src/_data/goodreads/review.json'),
  outputFile: path.join(__dirname, '../src/_data/books.json'),
  statusToFilter: 'read', // Apenas livros lidos
  merge: true // Fazer merge com dados existentes
};

// Parse command line arguments
process.argv.slice(2).forEach(arg => {
  if (arg === '--no-merge') CONFIG.merge = false;
  if (arg.startsWith('--status=')) CONFIG.statusToFilter = arg.split('=')[1];
  if (arg.startsWith('--output=')) CONFIG.outputFile = arg.split('=')[1];
});

/**
 * Converte data UTC para formato YYYY-MM-DD
 */
function parseDate(dateString) {
  if (!dateString || dateString === '(not provided)') {
    return new Date().toISOString().split('T')[0];
  }

  try {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.warn(`⚠️  Erro ao parsear data: ${dateString}`);
    return new Date().toISOString().split('T')[0];
  }
}

/**
 * Extrai o ano de uma data
 */
function extractYear(dateString) {
  if (!dateString || dateString === '(not provided)') {
    return new Date().getFullYear().toString();
  }

  try {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  } catch (error) {
    console.warn(`⚠️  Erro ao extrair ano: ${dateString}`);
    return new Date().getFullYear().toString();
  }
}

/**
 * Mapeia status do Goodreads para o formato esperado
 */
function mapStatus(readStatus) {
  const statusMap = {
    'read': 'lido',
    'to-read': 'para ler',
    'currently-reading': 'lendo',
    'abandonei': 'abandonado'
  };

  return statusMap[readStatus] || readStatus;
}

/**
 * Normaliza o título do livro
 */
function normalizeTitle(title) {
  if (!title || title === '(not provided)') {
    return 'Título não disponível';
  }

  // Remove informações extras como "(Portuguese Edition)", etc.
  return title
    .replace(/\(Portuguese Edition\)/gi, '')
    .replace(/\(Em Portugues do Brasil\)/gi, '')
    .replace(/\(Clássicos MC\)/gi, '')
    .trim();
}

/**
 * Converte uma review do Goodreads para o formato books.json
 */
function convertReview(review, nextId) {
  const date = parseDate(review.last_revision_at || review.updated_at || review.created_at);
  const year = extractYear(review.created_at);

  return {
    id: nextId,
    title: normalizeTitle(review.book),
    author: '', // Não disponível no review.json
    category: '', // Não disponível no review.json
    status: mapStatus(review.read_status),
    rating: review.rating || 0,
    cover: '', // Não disponível no review.json
    description: '', // Não disponível no review.json
    thoughts: review.review !== '(not provided)' ? review.review : '',
    quotes: '', // Não disponível no review.json
    readingYear: year,
    recommendBy: '', // Não disponível no review.json
    tags: [], // Não disponível no review.json
    url: '', // Não disponível no review.json
    date: date
  };
}

/**
 * Função principal
 */
function main() {
  console.log('📚 Iniciando conversão de dados do Goodreads...\n');

  // 1. Ler arquivo do Goodreads
  console.log(`📖 Lendo ${CONFIG.goodreadsFile}...`);
  let goodreadsData;
  try {
    const rawData = fs.readFileSync(CONFIG.goodreadsFile, 'utf-8');
    goodreadsData = JSON.parse(rawData);
  } catch (error) {
    console.error(`❌ Erro ao ler arquivo do Goodreads: ${error.message}`);
    process.exit(1);
  }

  // Remover o primeiro item que é apenas explicação
  if (goodreadsData[0]?.explanation) {
    goodreadsData = goodreadsData.slice(1);
  }

  console.log(`   Total de reviews: ${goodreadsData.length}`);

  // 2. Filtrar apenas livros lidos
  const readBooks = goodreadsData.filter(review => review.read_status === CONFIG.statusToFilter);
  console.log(`   Livros com status "${CONFIG.statusToFilter}": ${readBooks.length}`);

  // 3. Ler dados existentes (se merge estiver habilitado)
  let existingBooks = [];
  let nextId = 1;

  if (CONFIG.merge && fs.existsSync(CONFIG.outputFile)) {
    console.log(`\n🔄 Fazendo merge com dados existentes...`);
    try {
      const existingData = fs.readFileSync(CONFIG.outputFile, 'utf-8');
      existingBooks = JSON.parse(existingData);
      console.log(`   Livros existentes: ${existingBooks.length}`);

      // Encontrar o maior ID
      const maxId = Math.max(...existingBooks.map(book => book.id || 0), 0);
      nextId = maxId + 1;
      console.log(`   Próximo ID disponível: ${nextId}`);
    } catch (error) {
      console.warn(`⚠️  Erro ao ler dados existentes: ${error.message}`);
      console.log('   Continuando sem merge...');
    }
  }

  // 4. Converter livros
  console.log(`\n🔄 Convertendo livros...`);
  const newBooks = readBooks.map((review, index) => {
    const book = convertReview(review, nextId + index);

    // Log de progresso a cada 10 livros
    if ((index + 1) % 10 === 0) {
      console.log(`   Processados: ${index + 1}/${readBooks.length}`);
    }

    return book;
  });

  console.log(`   ✅ ${newBooks.length} livros convertidos`);

  // 5. Combinar com dados existentes
  const allBooks = CONFIG.merge ? [...existingBooks, ...newBooks] : newBooks;

  // 6. Ordenar por data (mais recentes primeiro)
  allBooks.sort((a, b) => new Date(b.date) - new Date(a.date));

  // 7. Salvar resultado
  console.log(`\n💾 Salvando em ${CONFIG.outputFile}...`);
  try {
    const output = JSON.stringify(allBooks, null, 2);
    fs.writeFileSync(CONFIG.outputFile, output, 'utf-8');
    console.log(`   ✅ Arquivo salvo com sucesso!`);
  } catch (error) {
    console.error(`❌ Erro ao salvar arquivo: ${error.message}`);
    process.exit(1);
  }

  // 8. Estatísticas finais
  console.log(`\n📊 Estatísticas:`);
  console.log(`   Total de livros no arquivo final: ${allBooks.length}`);
  console.log(`   Novos livros adicionados: ${newBooks.length}`);
  console.log(`   Livros existentes mantidos: ${existingBooks.length}`);

  // Estatísticas por ano
  const booksByYear = allBooks.reduce((acc, book) => {
    const year = book.readingYear || 'unknown';
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  console.log(`\n📅 Livros por ano:`);
  Object.keys(booksByYear)
    .sort()
    .forEach(year => {
      console.log(`   ${year}: ${booksByYear[year]} livros`);
    });

  console.log('\n✨ Conversão concluída com sucesso!\n');
  console.log('💡 Próximos passos:');
  console.log('   1. Revise o arquivo gerado em src/_data/books.json');
  console.log('   2. Preencha manualmente os campos vazios (author, cover, category, etc.)');
  console.log('   3. Execute o build do Eleventy para testar');
}

// Executar
main();
