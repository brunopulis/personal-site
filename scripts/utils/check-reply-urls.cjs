const fs = require('node:fs');
const path = require('node:path');
const https = require('node:https');
const http = require('node:http');

const replyDir = './src/content/reply';
const filesToDelete = [];

// Função para extrair URLs de um arquivo markdown
function extractUrls(content) {
  const urlRegex = /https?:\/\/[^\s)]+/g;
  return content.match(urlRegex) || [];
}

// Função para verificar o status code de uma URL
function checkUrl(url) {
  return new Promise(resolve => {
    const protocol = url.startsWith('https') ? https : http;

    const options = {
      method: 'HEAD',
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    };

    const req = protocol.request(url, options, res => {
      resolve(res.statusCode);
    });

    req.on('error', () => {
      resolve(null); // Erro de conexão
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
  const urls = extractUrls(content);

  if (urls.length === 0) {
    return null;
  }

  console.log(`\nVerificando: ${filePath}`);
  console.log(`URLs encontradas: ${urls.length}`);

  for (const url of urls) {
    console.log(`  Testando: ${url}`);
    const statusCode = await checkUrl(url);

    if (statusCode === 404 || statusCode === 403) {
      console.log(`    ❌ ${statusCode} - URL inacessível!`);
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
  console.log('🔍 Iniciando verificação de URLs em arquivos reply...\n');

  await walkDir(replyDir);

  console.log('\n\n📊 RESUMO:');
  console.log('='.repeat(60));

  if (filesToDelete.length > 0) {
    console.log(
      `\n❌ Encontrados ${filesToDelete.length} arquivo(s) com URLs inacessíveis (403/404):\n`
    );

    filesToDelete.forEach(({ file, url, statusCode }) => {
      console.log(`  ${file}`);
      console.log(`    URL: ${url}`);
      console.log(`    Status: ${statusCode}\n`);
    });

    // Salvar lista de arquivos para deletar
    const listPath = './files-to-delete-404.txt';
    fs.writeFileSync(listPath, filesToDelete.map(f => f.file).join('\n'));

    console.log(`\n📝 Lista salva em: ${listPath}`);
    console.log('\nPara deletar os arquivos, execute:');
    console.log('  cat files-to-delete-404.txt | xargs rm -v');
  } else {
    console.log('\n✅ Nenhum arquivo com URLs 404 encontrado!');
  }
})();
