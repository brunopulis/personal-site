import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Converte componentes MDX para markdown simples
 * Remove imports, exports e componentes React
 */
function convertMDXtoMD(content) {
  let markdown = content;

  // Remove imports de componentes
  markdown = markdown.replace(/^import\s+.*?from\s+['"`].*?['"`];?\n/gm, '');

  // Remove exports default
  markdown = markdown.replace(/^export\s+default\s+.*?;?\n/gm, '');

  // Remove export const metadata
  markdown = markdown.replace(/^export\s+const\s+metadata.*?\n\}\n/gms, '');

  // Converte componentes customizados em markdown
  // Ex: <Image /> -> ![image](image.jpg)
  markdown = markdown.replace(/<Image\s+src=["']([^"']+)["']\s+alt=["']([^"']+)["']\s*\/>/g, '![$2]($1)');

  // Converte outros componentes vazios em nada
  markdown = markdown.replace(/<[A-Z][^/>]*\/>/g, '');

  // Converte componentes com conteúdo em texto simples
  markdown = markdown.replace(/<[A-Z][^>]*>(.*?)<\/[A-Z][^>]*>/gs, '$1');

  // Remove propriedades MDX/JSX não padrão de tags HTML
  markdown = markdown.replace(/\s+className=["']([^"']+)["']/g, '');
  markdown = markdown.replace(/\s+style=\{[^}]*\}/g, '');

  // Remove comentários JSX
  markdown = markdown.replace(/\{\/\*.*?\*\/\}/gs, '');

  // Remove linhas vazias múltiplas
  markdown = markdown.replace(/\n\n\n+/g, '\n\n');

  return markdown.trim();
}

/**
 * Processa um arquivo MDX
 */
function processMDXFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const converted = convertMDXtoMD(content);

    // Muda extensão de .mdx para .md
    const newFilePath = filePath.replace(/\.mdx$/, '.md');

    // Se o arquivo .md já existe, não sobrescreve
    if (fs.existsSync(newFilePath)) {
      console.log(`⚠️  ${path.basename(newFilePath)} já existe. Pulando...`);
      return false;
    }

    fs.writeFileSync(newFilePath, converted, 'utf-8');
    console.log(`✅ Convertido: ${path.basename(filePath)} → ${path.basename(newFilePath)}`);

    return true;
  } catch (error) {
    console.error(`❌ Erro ao processar ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Encontra e converte todos os arquivos .mdx em um diretório
 */
function convertMDXDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.error(`Diretório não encontrado: ${dirPath}`);
    process.exit(1);
  }

  const files = fs.readdirSync(dirPath, { recursive: true });
  const mdxFiles = files.filter(file => file.endsWith('.mdx'));

  if (mdxFiles.length === 0) {
    console.log('Nenhum arquivo .mdx encontrado.');
    return;
  }

  console.log(`\n📝 Encontrados ${mdxFiles.length} arquivo(s) .mdx\n`);

  let converted = 0;
  let skipped = 0;

  mdxFiles.forEach(file => {
    const filePath = path.join(dirPath, file);
    if (processMDXFile(filePath)) {
      converted++;
    } else {
      skipped++;
    }
  });

  console.log(`\n✨ Conversão concluída!`);
  console.log(`   Convertidos: ${converted}`);
  console.log(`   Pulados: ${skipped}\n`);
}

/**
 * Remove arquivos .mdx após conversão
 */
function removeMDXFiles(dirPath, confirm = false) {
  if (!confirm) {
    console.log('Adicione --remove flag para deletar arquivos .mdx originais');
    return;
  }

  const files = fs.readdirSync(dirPath, { recursive: true });
  const mdxFiles = files.filter(file => file.endsWith('.mdx'));

  mdxFiles.forEach(file => {
    const filePath = path.join(dirPath, file);
    try {
      fs.unlinkSync(filePath);
      console.log(`🗑️  Deletado: ${path.basename(filePath)}`);
    } catch (error) {
      console.error(`❌ Erro ao deletar ${filePath}:`, error.message);
    }
  });

  console.log(`\n✨ ${mdxFiles.length} arquivo(s) .mdx removido(s)\n`);
}

// Processa argumentos da linha de comando
const args = process.argv.slice(2);
const removeFlag = args.includes('--remove');
const dirArg = args.find(arg => !arg.startsWith('--')) || 'src/content/posts';

console.log(`\n🚀 Iniciando conversão de MDX para MD\n`);
console.log(`📂 Diretório: ${path.resolve(dirArg)}\n`);

convertMDXDirectory(dirArg);

if (removeFlag) {
  removeMDXFiles(dirArg, true);
}