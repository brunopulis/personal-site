#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import {buildFrontmatter, buildFilePath, createPrompter, parseChoice, parseRating} from './lib/add-book.js';

const prompter = createPrompter(process.stdin);
const ask = question => prompter.ask(question);

async function main() {
  const args = process.argv.slice(2);
  const suggestedTitle = args.join(' ');

  console.log('📚 Adicionar livro manualmente\n');
  console.log('--- Preencha os campos (Enter para aceitar o valor sugerido) ---\n');

  let title = '';
  while (!title) {
    title = (await ask(`Título${suggestedTitle ? ` (${suggestedTitle})` : ''}: `)) || suggestedTitle;
    if (!title) console.log('  ⚠️ O título é obrigatório.');
  }

  const subtitle = await ask('Subtítulo (—): ');
  const author = (await ask('Autor(a) (—): ')) || '';
  const category = await ask('Categoria (—): ');

  console.log('\nStatus:');
  const statusOptions = ['lido', 'lendo'];
  statusOptions.forEach((s, i) => console.log(`  ${i + 1}. ${s}`));
  const statusAnswer = (await ask('Escolha (1): ')) || '1';
  const status = parseChoice(statusAnswer, statusOptions);

  const ratingRaw = await ask('Nota (1-5, Enter para pular): ');
  const rating = parseRating(ratingRaw);

  const currentYear = String(new Date().getFullYear());
  const attendedYear = (await ask(`Ano de leitura (${currentYear}): `)) || currentYear;
  const poster = await ask('Poster URL (—): ');
  const description = await ask('Descrição (—): ');
  const thoughts = await ask('Pensamentos (—): ');
  const quotes = await ask('Citação (—): ');
  const recommendBy = await ask('Recomendado por (—): ');
  const tagsRaw = await ask('Tags separadas por vírgula (—): ');
  const url = await ask('URL (—): ');

  const today = new Date().toISOString().slice(0, 10);
  const pubDate = (await ask(`Data de leitura YYYY-MM-DD (${today}): `)) || today;

  const frontmatter = buildFrontmatter({
    title,
    subtitle,
    author,
    category,
    status,
    rating,
    poster,
    description,
    thoughts,
    quotes,
    attendedYear,
    recommendBy,
    tags: tagsRaw,
    url,
    pubDate
  });

  const {contentDir, fileName} = buildFilePath({title, attendedYear, pubDate});
  const yearDir = path.resolve(`src/content/books/${contentDir}`);

  if (!fs.existsSync(yearDir)) {
    fs.mkdirSync(yearDir, {recursive: true});
  }

  const filePath = path.join(yearDir, fileName);
  fs.writeFileSync(filePath, frontmatter);
  console.log(`\n✓ Arquivo criado: ${filePath}`);
  prompter.close();
}

main().catch(console.error);
