#!/usr/bin/env node

/**
 * Script para converter books.json em arquivos markdown individuais
 * organizados por ano em src/content/books/{year}/{slug}.md
 */

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurações
const CONFIG = {
  booksJsonFile: path.join(__dirname, '../src/_data/books.json'),
  outputBaseDir: path.join(__dirname, '../src/content/books')
};

/**
 * Gera um slug a partir do título
 */
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/--+/g, '-') // Remove hífens duplicados
    .replace(/^-+/, '') // Remove hífens do início
    .replace(/-+$/, ''); // Remove hífens do final
}

/**
 * Escapa aspas duplas em strings YAML
 */
function escapeYaml(str) {
  if (!str) return '';
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

/**
 * Converte array para formato YAML
 */
function arrayToYaml(arr) {
  if (!arr || arr.length === 0) return '[]';
  return `[${arr.map(item => `"${escapeYaml(item)}"`).join(', ')}]`;
}

/**
 * Converte um objeto de livro para markdown com frontmatter
 */
function bookToMarkdown(book) {
  const frontmatter = [];

  frontmatter.push('---');
  frontmatter.push(`title: "${escapeYaml(book.title)}"`);

  if (book.author) {
    if (Array.isArray(book.author)) {
      frontmatter.push(`author: ${arrayToYaml(book.author)}`);
    } else {
      frontmatter.push(`author: "${escapeYaml(book.author)}"`);
    }
  } else {
    frontmatter.push(`author: ""`);
  }

  frontmatter.push(`category: "${book.category || ''}"`);
  frontmatter.push(`status: "${book.status || 'lido'}"`);
  frontmatter.push(`rating: ${book.rating || 0}`);
  frontmatter.push(`cover: "${book.cover || ''}"`);
  frontmatter.push(`description: "${escapeYaml(book.description || '')}"`);
  frontmatter.push(`thoughts: "${escapeYaml(book.thoughts || '')}"`);
  frontmatter.push(`quotes: "${escapeYaml(book.quotes || '')}"`);
  frontmatter.push(`attendedYear: "${book.readingYear || new Date().getFullYear()}"`);
  frontmatter.push(`recommendBy: "${escapeYaml(book.recommendBy || '')}"`);
  frontmatter.push(`tags: ${arrayToYaml(book.tags || [])}`);
  frontmatter.push(`url: "${book.url || ''}"`);
  frontmatter.push(`date: ${book.date || new Date().toISOString().split('T')[0]}`);
  frontmatter.push('---');

  return frontmatter.join('\n');
}

/**
 * Função principal
 */
function main() {
  console.log('📚 Convertendo books.json para arquivos markdown...\n');

  // 1. Ler books.json
  console.log(`📖 Lendo ${CONFIG.booksJsonFile}...`);
  let books;
  try {
    const rawData = fs.readFileSync(CONFIG.booksJsonFile, 'utf-8');
    books = JSON.parse(rawData);
  } catch (error) {
    console.error(`❌ Erro ao ler books.json: ${error.message}`);
    process.exit(1);
  }

  console.log(`   Total de livros: ${books.length}\n`);

  // 2. Agrupar por ano
  const booksByYear = {};
  books.forEach(book => {
    const year = book.readingYear || new Date().getFullYear().toString();
    if (!booksByYear[year]) {
      booksByYear[year] = [];
    }
    booksByYear[year].push(book);
  });

  console.log(`📅 Anos encontrados: ${Object.keys(booksByYear).sort().join(', ')}\n`);

  // 3. Criar diretórios e arquivos
  let totalCreated = 0;
  let totalSkipped = 0;

  Object.keys(booksByYear)
    .sort()
    .forEach(year => {
      const yearDir = path.join(CONFIG.outputBaseDir, year);

      // Criar diretório do ano se não existir
      if (!fs.existsSync(yearDir)) {
        fs.mkdirSync(yearDir, {recursive: true});
        console.log(`📁 Criado diretório: ${year}/`);
      }

      booksByYear[year].forEach((book, index) => {
        const slug = slugify(book.title);
        const filename = `${slug}.md`;
        const filepath = path.join(yearDir, filename);

        // Verificar se arquivo já existe
        if (fs.existsSync(filepath)) {
          console.log(`   ⏭️  Pulado (já existe): ${year}/${filename}`);
          totalSkipped++;
          return;
        }

        // Gerar markdown
        const markdown = bookToMarkdown(book);

        // Salvar arquivo
        try {
          fs.writeFileSync(filepath, markdown, 'utf-8');
          console.log(`   ✅ Criado: ${year}/${filename}`);
          totalCreated++;
        } catch (error) {
          console.error(`   ❌ Erro ao criar ${year}/${filename}: ${error.message}`);
        }
      });
    });

  console.log(`\n📊 Resumo:`);
  console.log(`   Arquivos criados: ${totalCreated}`);
  console.log(`   Arquivos pulados: ${totalSkipped}`);
  console.log(`   Total: ${books.length}`);

  console.log('\n✨ Conversão concluída!\n');
}

// Executar
main();
