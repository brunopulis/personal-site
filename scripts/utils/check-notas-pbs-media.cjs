const fs = require('node:fs');
const path = require('node:path');
const https = require('node:https');

const notasDir = './src/content/notas';
const filesToDelete = [];

// Função para extrair URLs específicas de pbs.twimg.com/media/
function extractPbsMediaUrls(content) {
  const urlRegex = /https:\/\/pbs\.twimg\.com\/tweet_video_thumb\/[^\s)]+/g;
  return content.match(urlRegex) || [];
}

// Função para verificar o status code de uma URL
function checkUrl(url) {
  return new Promise(resolve => {
    const options = {
      method: 'HEAD',
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    };

    const req = https.request(url, options, res => {
      resolve(res.statusCode);
    });

    req.on('error', () => {
      resolve(null);
    });

    req.on('timeout', () => {
      req.destroy();
      resolve(null);
    });

    req.end();
  });
}

// Função para processar um arquivo
async function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const urls = extractPbsMediaUrls(content);

  if (urls.length === 0) {
    return null;
  }

  console.log(`\nVerificando: ${filePath}`);
  console.log(`URLs pbs.twimg.com/media/ encontradas: ${urls.length}`);

  for (const url of urls) {
    console.log(`  Testando: ${url}`);
    const statusCode = await checkUrl(url);

    if (statusCode === 404) {
      console.log(`    ❌ 404 - URL não encontrada!`);
      return { file: filePath, url, statusCode };
    } else if (statusCode) {
      console.log(`    ✓ ${statusCode}`);
    } else {
      console.log(`    ⚠ Erro ao verificar`);
    }

    // Pequeno delay para não sobrecarregar os servidores
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  return null;
}

// Função para percorrer recursivamente o diretório
async function walkDir(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await walkDir(filePath);
    } else if (file.endsWith('.md')) {
      const result = await processFile(filePath);
      if (result) {
        filesToDelete.push(result);
      }
    }
  }
}

// Executar
(async () => {
  console.log('🔍 Verificando URLs pbs.twimg.com/media/ em arquivos notas...\n');

  await walkDir(notasDir);

  console.log('\n\n📊 RESUMO:');
  console.log('='.repeat(60));

  if (filesToDelete.length > 0) {
    console.log(`\n❌ Encontrados ${filesToDelete.length} arquivo(s) com URLs 404:\n`);

    filesToDelete.forEach(({ file, url, statusCode }) => {
      console.log(`  ${file}`);
      console.log(`    URL: ${url}`);
      console.log(`    Status: ${statusCode}\n`);
    });

    // Deletar os arquivos imediatamente
    console.log('\n🗑️  Deletando arquivos...\n');
    filesToDelete.forEach(({ file }) => {
      try {
        fs.unlinkSync(file);
        console.log(`  ✓ Deletado: ${file}`);
      } catch (err) {
        console.log(`  ✗ Erro ao deletar ${file}: ${err.message}`);
      }
    });

    console.log(`\n✅ ${filesToDelete.length} arquivo(s) deletado(s)!`);
  } else {
    console.log('\n✅ Nenhum arquivo com URLs 404 encontrado!');
  }
})();
