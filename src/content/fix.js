import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, extname } from 'path';

// Função para processar um arquivo
function processFile(filePath) {
  try {
    // Lê o conteúdo do arquivo
    let content = readFileSync(filePath, 'utf8');

    // Verifica se o arquivo contém 'date'
    if (content.includes('date:')) {
      console.log(`Processando: ${filePath}`);

      // Substitui 'date:' por 'publishDate:' no frontmatter
      // Esta regex captura 'date:' no início de uma linha (com espaços opcionais)
      content = content.replace(/^(\s*)date:(\s*)/gm, '$1publishDate:$2');

      // Para ser mais específico, você pode usar esta regex que só substitui no frontmatter:
      // content = content.replace(/(---[\s\S]*?)(\s+)date:(\s+)([\s\S]*?---)/g, '$1$2publishDate:$3$4');

      // Escreve o arquivo modificado
      writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Atualizado: ${filePath}`);

      return true; // Indica que o arquivo foi modificado
    } else {
      console.log(`⏭️  Pulado (sem 'date:'): ${filePath}`);
      return false;
    }

  } catch (error) {
    console.error(`❌ Erro ao processar ${filePath}:`, error.message);
    return false;
  }
}

// Função para percorrer o diretório recursivamente
function processDirectory(dirPath) {
  const results = {
    processed: 0,
    modified: 0,
    errors: 0
  };

  try {
    const items = readdirSync(dirPath);

    for (const item of items) {
      const itemPath = join(dirPath, item);
      const stats = statSync(itemPath);

      if (stats.isDirectory()) {
        // Recursivamente processa subdiretórios
        const subResults = processDirectory(itemPath);
        results.processed += subResults.processed;
        results.modified += subResults.modified;
        results.errors += subResults.errors;
      } else if (stats.isFile()) {
        // Verifica se é um arquivo .md ou .mdx
        const ext = extname(item).toLowerCase();
        if (ext === '.md' || ext === '.mdx') {
          results.processed++;

          const wasModified = processFile(itemPath);
          if (wasModified) {
            results.modified++;
          }
        }
      }
    }

  } catch (error) {
    console.error(`❌ Erro ao ler diretório ${dirPath}:`, error.message);
    results.errors++;
  }

  return results;
}

// Função principal
function main() {
  const blogDir = './blog'; // ou 'src/content/blog' dependendo da sua estrutura

  // Verifica se o diretório existe
  if (!existsSync(blogDir)) {
    console.error(`❌ Diretório '${blogDir}' não encontrado!`);
    console.log('💡 Certifique-se de executar o script no diretório correto ou ajuste o caminho.');
    process.exit(1);
  }

  console.log(`🔍 Iniciando busca no diretório: ${blogDir}`);
  console.log('📝 Procurando por arquivos .md e .mdx...\n');

  const results = processDirectory(blogDir);

  console.log('\n📊 Resumo:');
  console.log(`   Arquivos processados: ${results.processed}`);
  console.log(`   Arquivos modificados: ${results.modified}`);
  console.log(`   Erros: ${results.errors}`);

  if (results.modified > 0) {
    console.log(`\n✅ Concluído! ${results.modified} arquivo(s) foram atualizados.`);
  } else {
    console.log('\n⏭️  Nenhum arquivo precisou ser modificado.');
  }
}

// Executa o script
main();