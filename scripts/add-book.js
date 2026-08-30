#!/usr/bin/env node

import fs from 'fs';
import {resolve as resolvePath} from 'node:path';
import {buildFrontmatter, buildFilePath, buildReviewBody, collectBookInput} from './lib/add-book.js';
import {createPrompter} from './lib/prompter.js';
import {resolveInside} from './lib/path-safety.js';

function writeBookFile(book) {
  const content = buildFrontmatter(book);
  const {contentDir, fileName} = buildFilePath(book);
  const yearDir = resolveInside('src/content/books', contentDir);
  fs.mkdirSync(yearDir, {recursive: true});
  const filePath = resolveInside(yearDir, fileName);
  fs.writeFileSync(filePath, content + buildReviewBody());
  return filePath;
}

async function main(argv) {
  const suggestedTitle = argv.join(' ');

  console.log('📚 Adicionar livro manualmente\n');
  console.log('--- Preencha os campos (Enter para aceitar o valor sugerido) ---\n');

  const prompter = createPrompter(process.stdin);
  const ask = question => prompter.ask(question);

  const book = await collectBookInput(ask, suggestedTitle);
  const filePath = writeBookFile(book);
  console.log(`\n✓ Arquivo criado: ${filePath}`);

  prompter.close();
}

const isMain = process.argv[1] && resolvePath(import.meta.dirname, process.argv[1]) === import.meta.filename;
if (isMain) {
  main(process.argv.slice(2)).catch(console.error);
}
