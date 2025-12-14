const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const replyDir = './src/content/reply';
let deletedCount = 0;

// Função para extrair URLs de um arquivo markdown
function extractUrls(content) {
  const urlRegex = /https?:\/\/[^\s\)]+/g;
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
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };

    const req = protocol.request(url, options, res => {
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
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const urls = extractUrls(content);

    if (urls.length === 0) {
      return false;
    }

    console.log(`\nVerificando: ${filePath}`);
    console.log(`URLs encontradas: ${urls.length}`);

    for (const url of urls) {
      console.log(`  Testando: ${url}`);
      const statusCode = await checkUrl(url);

      if (statusCode === 404 || statusCode === 403) {
        console.log(`    ❌ ${statusCode} - Deletando arquivo...`);
        try {
          fs.unlinkSync(filePath);
          deletedCount++;
          console.log(`    ✓ Arquivo deletado!`);
          return true;
        } catch (err) {
          console.log(`    ✗ Erro ao deletar: ${err.message}`);
          return false;
        }
      } else if (statusCode) {
        console.log(`    ✓ ${statusCode}`);
      } else {
        console.log(`    ⚠ Erro ao verificar`);
      }

      // Pequeno delay
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    return false;
  } catch (err) {
    console.log(`  ⚠ Erro ao processar arquivo: ${err.message}`);
    return false;
  }
}

// Função para coletar todos os arquivos primeiro
function collectFiles(dir, fileList = []) {
  try {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      try {
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          collectFiles(filePath, fileList);
        } else if (file.endsWith('.md')) {
          fileList.push(filePath);
        }
      } catch (err) {
        // Arquivo pode ter sido deletado, ignorar
      }
    }
  } catch (err) {
    console.log(`Erro ao ler diretório ${dir}: ${err.message}`);
  }

  return fileList;
}

// Executar
(async () => {
  console.log('🔍 Verificando URLs em arquivos reply (403/404)...\n');

  // Coletar todos os arquivos primeiro
  const allFiles = collectFiles(replyDir);
  console.log(`Total de arquivos para verificar: ${allFiles.length}\n`);

  // Processar cada arquivo
  for (const file of allFiles) {
    // Verificar se o arquivo ainda existe antes de processar
    if (fs.existsSync(file)) {
      await processFile(file);
    }
  }

  console.log('\n\n📊 RESUMO:');
  console.log('='.repeat(60));
  console.log(`\n✅ Total de arquivos deletados: ${deletedCount}`);
})();
