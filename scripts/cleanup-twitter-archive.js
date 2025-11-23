import fs from 'fs';
import path from 'path';

const TWITTER_ARCHIVE_PATH = './scripts/tweets/data';

// Arquivos ESSENCIAIS que devem ser mantidos
const KEEP_FILES = [
  'tweets.js', // PRINCIPAL - contém todos os tweets
  'tweet-headers.js', // Opcional mas útil
  'README.txt', // Documentação do Twitter
];

// Pastas ESSENCIAIS que devem ser mantidas
const KEEP_FOLDERS = [
  'tweets_media', // Mídias dos tweets
];

function getFilesToDelete(dirPath) {
  const files = fs.readdirSync(dirPath);
  const toDelete = [];

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (!KEEP_FOLDERS.includes(file)) {
        toDelete.push({ path: fullPath, type: 'folder', size: getFolderSize(fullPath) });
      }
    } else {
      if (!KEEP_FILES.includes(file)) {
        toDelete.push({ path: fullPath, type: 'file', size: stat.size });
      }
    }
  }

  return toDelete;
}

function getFolderSize(folderPath) {
  let size = 0;
  try {
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      const fullPath = path.join(folderPath, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        size += getFolderSize(fullPath);
      } else {
        size += stat.size;
      }
    }
  } catch (error) {
    // Ignorar erros de permissão
  }
  return size;
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

function deleteItem(itemPath, type) {
  if (type === 'folder') {
    fs.rmSync(itemPath, { recursive: true, force: true });
  } else {
    fs.unlinkSync(itemPath);
  }
}

async function cleanup(dryRun = false) {
  console.log('🧹 Limpeza do Twitter Archive\n');
  console.log('='.repeat(60));

  if (!fs.existsSync(TWITTER_ARCHIVE_PATH)) {
    console.error(`❌ Pasta não encontrada: ${TWITTER_ARCHIVE_PATH}`);
    return;
  }

  console.log(`\n📁 Analisando: ${TWITTER_ARCHIVE_PATH}\n`);

  const toDelete = getFilesToDelete(TWITTER_ARCHIVE_PATH);

  if (toDelete.length === 0) {
    console.log('✅ Nenhum arquivo para deletar. Tudo limpo!\n');
    return;
  }

  // Calcular espaço total
  const totalSize = toDelete.reduce((sum, item) => sum + item.size, 0);

  // Mostrar o que será mantido
  console.log('✅ ARQUIVOS QUE SERÃO MANTIDOS:\n');
  KEEP_FILES.forEach((file) => {
    const filePath = path.join(TWITTER_ARCHIVE_PATH, file);
    if (fs.existsSync(filePath)) {
      const size = fs.statSync(filePath).size;
      console.log(`   📄 ${file} (${formatBytes(size)})`);
    }
  });

  KEEP_FOLDERS.forEach((folder) => {
    const folderPath = path.join(TWITTER_ARCHIVE_PATH, folder);
    if (fs.existsSync(folderPath)) {
      const size = getFolderSize(folderPath);
      console.log(`   📁 ${folder}/ (${formatBytes(size)})`);
    }
  });

  // Mostrar o que será deletado
  console.log('\n🗑️  ARQUIVOS QUE SERÃO DELETADOS:\n');

  // Agrupar por tipo
  const files = toDelete.filter((item) => item.type === 'file');
  const folders = toDelete.filter((item) => item.type === 'folder');

  if (files.length > 0) {
    console.log('   Arquivos:');
    files.forEach((item) => {
      const fileName = path.basename(item.path);
      console.log(`   📄 ${fileName} (${formatBytes(item.size)})`);
    });
  }

  if (folders.length > 0) {
    console.log('\n   Pastas:');
    folders.forEach((item) => {
      const folderName = path.basename(item.path);
      console.log(`   📁 ${folderName}/ (${formatBytes(item.size)})`);
    });
  }

  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 RESUMO:`);
  console.log(`   • ${files.length} arquivos`);
  console.log(`   • ${folders.length} pastas`);
  console.log(`   • ${formatBytes(totalSize)} serão liberados\n`);

  if (dryRun) {
    console.log('🔍 DRY RUN - Nenhum arquivo foi deletado.');
    console.log('   Execute sem --dry-run para deletar os arquivos.\n');
    return;
  }

  // Executar limpeza
  console.log('🗑️  Deletando arquivos...\n');

  let deleted = 0;
  let errors = 0;

  for (const item of toDelete) {
    try {
      deleteItem(item.path, item.type);
      deleted++;
      const name = path.basename(item.path);
      console.log(`   ✓ Deletado: ${name}`);
    } catch (error) {
      errors++;
      const name = path.basename(item.path);
      console.error(`   ✗ Erro ao deletar ${name}: ${error.message}`);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('✨ Limpeza concluída!\n');
  console.log(`📊 Resultado:`);
  console.log(`   • ${deleted} itens deletados`);
  console.log(`   • ${errors} erros`);
  console.log(`   • ${formatBytes(totalSize)} liberados\n`);
  console.log(`✅ Arquivo essencial mantido: tweets.js`);
  console.log(`   Pronto para importação!\n`);
}

// Verificar argumentos
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');

if (args.includes('--help') || args.includes('-h')) {
  console.log(`
🧹 Script de Limpeza do Twitter Archive

Uso:
  node scripts/cleanup-twitter-archive.js [opções]

Opções:
  --dry-run    Mostra o que seria deletado sem deletar
  --help, -h   Mostra esta mensagem

Arquivos mantidos:
  • tweets.js (essencial para importação)
  • tweet-headers.js (opcional)
  • tweets_media/ (mídias dos tweets)
  • README.txt (documentação)

Tudo mais será deletado para economizar espaço.
  `);
  process.exit(0);
}

// Executar
cleanup(dryRun).catch(console.error);
