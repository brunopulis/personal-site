#!/usr/bin/env node

/**
 * Script para remover duplicatas do books.json
 */

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BOOKS_FILE = path.join(__dirname, '../src/_data/books.json');

function main() {
  console.log('🔍 Verificando duplicatas em books.json...\n');

  // Ler arquivo
  const books = JSON.parse(fs.readFileSync(BOOKS_FILE, 'utf-8'));
  console.log(`📚 Total de livros: ${books.length}`);

  // Encontrar duplicatas
  const seen = new Map();
  const duplicates = [];
  const unique = [];

  books.forEach((book, index) => {
    const key = book.title.toLowerCase().trim();

    if (seen.has(key)) {
      duplicates.push({
        index,
        title: book.title,
        firstIndex: seen.get(key)
      });
    } else {
      seen.set(key, index);
      unique.push(book);
    }
  });

  if (duplicates.length === 0) {
    console.log('✅ Nenhuma duplicata encontrada!');
    return;
  }

  console.log(`\n⚠️  Encontradas ${duplicates.length} duplicatas:\n`);
  duplicates.forEach(dup => {
    console.log(`   - "${dup.title}"`);
    console.log(`     Primeira ocorrência: índice ${dup.firstIndex}`);
    console.log(`     Duplicata: índice ${dup.index}\n`);
  });

  // Fazer backup
  const backupFile = BOOKS_FILE.replace('.json', '.backup.json');
  fs.writeFileSync(backupFile, JSON.stringify(books, null, 2));
  console.log(`💾 Backup criado: ${backupFile}`);

  // Salvar versão sem duplicatas
  fs.writeFileSync(BOOKS_FILE, JSON.stringify(unique, null, 2));
  console.log(`\n✅ Arquivo limpo salvo!`);
  console.log(`   Livros antes: ${books.length}`);
  console.log(`   Livros depois: ${unique.length}`);
  console.log(`   Removidos: ${duplicates.length}`);
}

main();
