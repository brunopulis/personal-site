import fs from 'node:fs';
import path from 'node:path';
import { config } from 'dotenv';
import fetch from 'node-fetch';

config();

/**
 * Importa múltiplos jogos de uma lista
 * Uso: node scripts/import-games-batch.js
 */

// 🎮 CONFIGURE AQUI SUA LISTA DE JOGOS FAVORITOS
const FAVORITE_GAMES = [
  'the-witcher-3-wild-hunt',
  'elden-ring',
  'hollow-knight',
  'red-dead-redemption-2',
  'god-of-war',
  'hades',
  'celeste',
  'stardew-valley',
  'portal-2',
  'the-last-of-us',
];

async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchGameData(slug) {
  const API_KEY = process.env.RAWG_API_KEY;

  const response = await fetch(`https://api.rawg.io/api/games/${slug}?key=${API_KEY}`);

  if (!response.ok) {
    throw new Error(`Falha ao buscar ${slug}: ${response.statusText}`);
  }

  return await response.json();
}

function createMarkdownContent(data) {
  const genres = data.genres?.map((g) => `  - ${g.name}`).join('\n') || '  - Action';
  const platforms = data.platforms?.map((p) => `  - ${p.platform.name}`).join('\n') || '';
  const screenshots =
    data.short_screenshots
      ?.slice(0, 5)
      .map((s) => `  - ${s.image}`)
      .join('\n') || '';
  const developers = data.developers?.map((d) => d.name).join(', ') || 'Desconhecido';
  const publishers = data.publishers?.map((p) => p.name).join(', ') || 'Desconhecido';
  const esrbRating = data.esrb_rating?.name || '';

  return `---
title: ${data.name}
slug: ${data.slug}
coverImage: ${data.background_image || ''}
releaseDate: ${data.released ? `${data.released}T00:00:00.000Z` : ''}
rating: ${data.rating || 0}
metacritic: ${data.metacritic || ''}
website: ${data.website || ''}
platforms:
${platforms}
genres:
${genres}
isFavorite: true
status: backlog
developers: ${developers}
publishers: ${publishers}
esrbRating: ${esrbRating}
playtime: ${data.playtime || 0}
screenshots:
${screenshots}
tags: []
---

${data.description_raw || data.description || 'Descrição não disponível.'}

## Informações Adicionais

**Desenvolvedores:** ${developers}
**Publishers:** ${publishers}
${data.esrb_rating ? `**Classificação:** ${data.esrb_rating.name}` : ''}
${data.playtime ? `**Tempo médio de jogo:** ${data.playtime} horas` : ''}

---

*Importado automaticamente da RAWG API*
*Última atualização: ${new Date().toLocaleDateString('pt-BR')}*
`;
}

async function importGames() {
  const API_KEY = process.env.RAWG_API_KEY;

  if (!API_KEY) {
    console.error('❌ RAWG_API_KEY não encontrada no arquivo .env');
    console.log('Obtenha sua chave em: https://rawg.io/apidocs');
    return;
  }

  const contentDir = path.join(process.cwd(), 'src', 'content', 'games');

  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  console.log(`🎮 Iniciando importação de ${FAVORITE_GAMES.length} jogos...\n`);

  let imported = 0;
  let skipped = 0;
  let failed = 0;

  for (const slug of FAVORITE_GAMES) {
    const filePath = path.join(contentDir, `${slug}.md`);

    // Verifica se já existe
    if (fs.existsSync(filePath)) {
      console.log(`⏭️  ${slug} - já existe, pulando...`);
      skipped++;
      continue;
    }

    try {
      console.log(`⬇️  Importando: ${slug}...`);

      const gameData = await fetchGameData(slug);
      const markdown = createMarkdownContent(gameData);

      fs.writeFileSync(filePath, markdown);

      console.log(`✅ ${gameData.name} - importado com sucesso`);
      imported++;

      // Aguarda 1 segundo entre requisições para respeitar rate limit
      await delay(1000);
    } catch (error) {
      console.error(`❌ ${slug} - erro: ${error.message}`);
      failed++;
    }
  }

  console.log(`\n📊 Resumo da Importação:
  ✅ Importados: ${imported}
  ⏭️  Pulados: ${skipped}
  ❌ Falharam: ${failed}
  📁 Total: ${FAVORITE_GAMES.length}
  `);

  if (imported > 0) {
    console.log(`\n🎉 Importação concluída!
    💡 Acesse o TinaCMS para gerenciar seus jogos:
       http://localhost:8080/admin
    `);
  }
}

importGames().catch((error) => {
  console.error('❌ Erro fatal:', error);
  process.exit(1);
});
