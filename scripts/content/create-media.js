import { input, select, number } from '@inquirer/prompts';
import fs from 'fs';
import path from 'path';
import slugify from 'slugify';
import dayjs from 'dayjs';

/**
 * Script para cadastrar novas mídias interativamente.
 * Salva o arquivo em src/content/medias/{ano}/{slug}.md
 * 
 * Uso: node scripts/content/create-media.js
 */

async function createMedia() {
  console.log('🎬 Cadastro de Nova Mídia\n');

  const title = await input({
    message: 'Título da mídia:',
    validate: (value) => value.trim() !== '' || 'O título é obrigatório.',
  });

  const watchedDate = await input({
    message: 'Data em que assistiu (AAAA-MM-DD):',
    default: dayjs().format('YYYY-MM-DD'),
    validate: (value) => /^\d{4}-\d{2}-\d{2}$/.test(value) || 'Formato inválido. Use AAAA-MM-DD.',
  });

  const watchedYear = dayjs(watchedDate).year();

  const director = await input({ message: 'Diretor:' });
  
  const category = await input({ message: 'Categoria (Ex: Filme, Série, Anime):', default: 'Filme' });

  const status = await select({
    message: 'Status:',
    choices: [
      { name: 'Assistido', value: 'assistido' },
      { name: 'Para assistir', value: 'para assistir' },
      { name: 'Abandonado', value: 'abandonado' },
    ],
    default: 'assistido',
  });

  const rating = await number({
    message: 'Nota (1-5):',
    min: 1,
    max: 5,
    default: 5,
  });

  const poster = await input({ message: 'URL do Poster:' });
  
  const description = await input({ message: 'Descrição/Sinopse:' });
  
  const thoughts = await input({ message: 'Seus pensamentos:' });
  
  const recommendBy = await input({ message: 'Recomendado por:' });
  
  const tagsInput = await input({ message: 'Tags (separadas por vírgula):' });
  const tags = tagsInput ? tagsInput.split(',').map(tag => tag.trim()) : [];

  const url = await input({ message: 'URL (TMDB, IMDb, etc):' });

  const slug = slugify(title, {
    lower: true,
    strict: true,
    locale: 'pt'
  });

  const frontmatter = `---
title: "${title}"
watchedDate: ${watchedDate}
watchedYear: ${watchedYear}
director: "${director}"
category: "${category}"
status: "${status}"
rating: ${rating}
poster: "${poster}"
description: "${description}"
thoughts: "${thoughts}"
recommendBy: "${recommendBy}"
tags: ${JSON.stringify(tags)}
url: "${url}"
---
`;

  const baseDir = path.join(process.cwd(), 'src', 'content', 'medias', watchedYear.toString());
  
  if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
  }

  const filePath = path.join(baseDir, `${slug}.md`);

  if (fs.existsSync(filePath)) {
    console.error(`\n❌ Erro: O arquivo ${filePath} já existe.`);
    return;
  }

  fs.writeFileSync(filePath, frontmatter);

  console.log(`\n✅ Mídia cadastrada com sucesso!`);
  console.log(`📂 Arquivo criado em: ${filePath}`);
}

createMedia().catch(console.error);
