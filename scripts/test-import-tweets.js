import fs from 'fs';
import path from 'path';

const CONFIG = {
  twitterDataPath: './data/twitter-example.json',
  tweetsOutputPath: './src/content/notes-test',
  twitterHandle: 'obrunopulis',
  filters: {
    startDate: null,
    endDate: null,
    excludeReplies: false,
    excludeRetweets: true,
    excludeThreads: true, // Excluir threads (respostas aos próprios tweets)
    minFavorites: 0,
  },
};

/**
 *
 * @param {string} filePath
 * @returns
 */
function readTwitterData(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  content = content.replace(/^window\.YTD\.tweets\.part\d+\s*=\s*/, '');

  return JSON.parse(content);
}

function processEntities(text, entities) {
  if (!entities) return text;

  let processed = text;

  // Processar URLs
  if (entities.urls && entities.urls.length > 0) {
    entities.urls.forEach((url) => {
      const linkText = url.display_url || url.expanded_url;
      processed = processed.replace(url.url, `[${linkText}](${url.expanded_url})`);
    });
  }

  // Remover t.co de imagens (já vamos adicionar as imagens separadamente)
  if (entities.media && entities.media.length > 0) {
    entities.media.forEach((media) => {
      processed = processed.replace(media.url, '').trim();
    });
  }

  return processed;
}

function tweetToAstroNote(tweet) {
  const data = tweet.tweet;
  const date = new Date(data.created_at);

  // Criar nome do arquivo baseado na data: YYYY-MM-DD.md
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Nome do arquivo: YYYY-MM-DD-HHMMSS.md para evitar conflitos no mesmo dia
  const filename = `${year}-${month}-${day}-${hours}${minutes}${seconds}`;

  // Processar texto
  let text = processEntities(data.full_text, data.entities);

  // Extrair hashtags
  const tags = data.entities?.hashtags?.map((h) => h.text.toLowerCase()) || [];

  // Determinar o tipo do tweet
  let type = 'note';
  if (data.in_reply_to_status_id) {
    type = 'reply';
  }

  // Criar frontmatter para Astro seguindo o schema
  const frontmatter = {
    pubDate: date.toISOString(),
    published: true,
    type: type,
    syndication: [`https://twitter.com/${CONFIG.twitterHandle}/status/${data.id_str}`],
    tags: tags.length > 0 ? tags : undefined,
  };

  // Adicionar título opcional (apenas se o texto for curto e significativo)
  const firstLine = text.split('\n')[0].trim();
  if (firstLine.length > 10 && firstLine.length < 100) {
    frontmatter.title = firstLine;
  }

  // Adicionar métricas se houver engajamento
  if (data.retweet_count > 0 || data.favorite_count > 0) {
    frontmatter.metrics = {
      retweets: data.retweet_count || 0,
      favorites: data.favorite_count || 0,
    };
  }

  // Se for reply, adicionar contexto
  if (data.in_reply_to_status_id) {
    frontmatter.in_reply_to = `https://twitter.com/${data.in_reply_to_screen_name}/status/${data.in_reply_to_status_id}`;
  }

  // Montar conteúdo markdown
  let markdown = '---\n';

  if (frontmatter.title) {
    // Escapar aspas duplas e barras invertidas para YAML
    const escapedTitle = frontmatter.title
      .replace(/\\/g, '\\\\') // Escapar \ primeiro
      .replace(/"/g, '\\"'); // Depois escapar "
    markdown += `title: "${escapedTitle}"\n`;
  }

  markdown += `pubDate: ${frontmatter.pubDate}\n`;
  markdown += `published: ${frontmatter.published}\n`;
  markdown += `type: ${frontmatter.type}\n`;
  markdown += `syndication:\n  - "${frontmatter.syndication[0]}"\n`;

  if (frontmatter.tags && frontmatter.tags.length > 0) {
    markdown += `tags: [${frontmatter.tags.map((t) => `"${t}"`).join(', ')}]\n`;
  }

  if (frontmatter.in_reply_to) {
    markdown += `in_reply_to: "${frontmatter.in_reply_to}"\n`;
  }

  if (frontmatter.metrics) {
    markdown += `metrics:\n`;
    markdown += `  retweets: ${frontmatter.metrics.retweets}\n`;
    markdown += `  favorites: ${frontmatter.metrics.favorites}\n`;
  }

  markdown += '---\n\n';
  markdown += text;

  // Adicionar imagens se houver
  if (data.entities?.media && data.entities.media.length > 0) {
    markdown += '\n\n';
    data.entities.media.forEach((media) => {
      if (media.type === 'photo') {
        markdown += `![](${media.media_url_https})\n\n`;
      }
    });
  }

  return {
    filename,
    content: markdown,
    data: frontmatter,
    rawData: data,
  };
}

// Verificar se tweet passa nos filtros
function shouldImportTweet(tweet) {
  const data = tweet.tweet;
  const date = new Date(data.created_at);

  // Filtro de data
  if (CONFIG.filters.startDate && date < new Date(CONFIG.filters.startDate)) {
    return false;
  }
  if (CONFIG.filters.endDate && date > new Date(CONFIG.filters.endDate)) {
    return false;
  }

  // Filtro de replies
  if (CONFIG.filters.excludeReplies && data.in_reply_to_status_id) {
    return false;
  }

  // Filtro de retweets
  if (CONFIG.filters.excludeRetweets && data.full_text.startsWith('RT @')) {
    return false;
  }

  // Filtro de threads (respostas aos próprios tweets)
  if (CONFIG.filters.excludeThreads && data.in_reply_to_status_id) {
    // Verificar se é uma resposta ao próprio usuário
    const replyToUser = data.in_reply_to_screen_name?.toLowerCase();
    const ownUser = CONFIG.twitterHandle.toLowerCase();

    if (replyToUser === ownUser) {
      return false; // É uma thread (resposta a si mesmo)
    }
  }

  // Filtro de favoritos mínimos
  if (CONFIG.filters.minFavorites > 0 && (data.favorite_count || 0) < CONFIG.filters.minFavorites) {
    return false;
  }

  return true;
}

// Importação principal
async function importTweets() {
  console.log('🐦 Importador de Tweets para Astro (TESTE)\n');
  console.log('='.repeat(50));

  // Verificar se o arquivo existe
  if (!fs.existsSync(CONFIG.twitterDataPath)) {
    console.error(`❌ Arquivo não encontrado: ${CONFIG.twitterDataPath}`);
    console.log(
      '\n💡 Dica: Extraia o arquivo ZIP do Twitter e ajuste o caminho em CONFIG.twitterDataPath'
    );
    return;
  }

  // Criar pasta de output se não existir
  if (!fs.existsSync(CONFIG.tweetsOutputPath)) {
    fs.mkdirSync(CONFIG.tweetsOutputPath, { recursive: true });
    console.log(`📁 Pasta criada: ${CONFIG.tweetsOutputPath}\n`);
  }

  // Ler dados
  console.log('📖 Lendo dados do Twitter...');
  const tweets = readTwitterData(CONFIG.twitterDataPath);
  console.log(`✅ ${tweets.length} tweets encontrados\n`);

  // Aplicar filtros
  console.log('🔍 Aplicando filtros...');
  const filteredTweets = tweets.filter(shouldImportTweet);
  console.log(`✅ ${filteredTweets.length} tweets após filtros\n`);

  // Processar tweets
  console.log('⚙️  Processando tweets...\n');
  let imported = 0;
  let skipped = 0;
  let errors = 0;

  for (const tweet of filteredTweets) {
    try {
      const note = tweetToAstroNote(tweet);
      const filename = `${note.filename}.md`;
      const filepath = path.join(CONFIG.tweetsOutputPath, filename);

      // Verificar se já existe
      if (fs.existsSync(filepath)) {
        skipped++;
        continue;
      }

      // Salvar arquivo
      fs.writeFileSync(filepath, note.content, 'utf8');
      imported++;

      console.log(`  ✓ Importado: ${filename}`);
    } catch (error) {
      errors++;
      console.error(`  ❌ Erro no tweet ${tweet.tweet.id_str}: ${error.message}`);
    }
  }

  // Resumo
  console.log('\n' + '='.repeat(50));
  console.log('✨ Importação de teste concluída!\n');
  console.log(`📊 Estatísticas:`);
  console.log(`   • ${imported} tweets importados`);
  console.log(`   • ${skipped} tweets já existentes`);
  console.log(`   • ${errors} erros`);
  console.log(`\n📂 Arquivos salvos em: ${CONFIG.tweetsOutputPath}`);
  console.log(`\n💡 Próximos passos:`);
  console.log(`   1. Verifique os arquivos gerados em ${CONFIG.tweetsOutputPath}`);
  console.log(`   2. Se estiver tudo OK, use o script principal com seus dados reais`);
  console.log(`   3. Execute 'npm run dev' para testar`);
}

// Executar
importTweets().catch(console.error);
