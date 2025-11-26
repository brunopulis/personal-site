#!/usr/bin/env node

/**
 * Script para converter arquivos Markdown (.md) para MDX (.mdx)
 *
 * Este script:
 * - Percorre todos os arquivos .md no diretório src/content/blog
 * - Converte cada arquivo para .mdx
 * - Preserva o frontmatter e conteúdo
 * - Adiciona imports necessários para componentes MDX (se necessário)
 * - Remove o arquivo .md original após conversão bem-sucedida
 *
 * Uso: node scripts/convert-md-to-mdx.js [--dry-run]
 */

import fs from 'fs/promises';
import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurações
const BLOG_DIR = path.join(__dirname, '..', 'src', 'content', 'blog');
const DRY_RUN = process.argv.includes('--dry-run');

// Cores para output no terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

/**
 * Encontra todos os arquivos .md recursivamente
 */
async function findMarkdownFiles(dir) {
  const files = [];

  async function walk(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }

  await walk(dir);
  return files;
}

/**
 * Converte o conteúdo Markdown para MDX
 * Adiciona imports necessários e ajusta sintaxe se necessário
 */
function convertToMdx(content) {
  let mdxContent = content;
  const imports = [];

  // Detecta se há componentes que precisam ser importados
  // Exemplo: se encontrar <CustomComponent>, adiciona import

  // Aqui você pode adicionar lógica personalizada para:
  // 1. Detectar componentes customizados no conteúdo
  // 2. Adicionar imports automáticos
  // 3. Converter sintaxe específica

  // Exemplo de detecção de imagens que podem virar componentes
  // const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  // Se quiser converter imagens para um componente Image customizado

  // Por enquanto, apenas retorna o conteúdo original
  // pois MDX é compatível com Markdown padrão

  if (imports.length > 0) {
    // Separa frontmatter do conteúdo
    const frontmatterMatch = mdxContent.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      const body = frontmatterMatch[2];

      mdxContent = `---\n${frontmatter}\n---\n\n${imports.join('\n')}\n\n${body}`;
    } else {
      mdxContent = `${imports.join('\n')}\n\n${mdxContent}`;
    }
  }

  return mdxContent;
}

/**
 * Converte um arquivo .md para .mdx
 */
async function convertFile(mdPath) {
  const mdxPath = mdPath.replace(/\.md$/, '.mdx');
  const relativePath = path.relative(BLOG_DIR, mdPath);

  try {
    // Lê o conteúdo do arquivo
    const content = await fs.readFile(mdPath, 'utf-8');

    // Converte para MDX
    const mdxContent = convertToMdx(content);

    if (DRY_RUN) {
      console.log(
        `${colors.yellow}[DRY RUN]${colors.reset} ${relativePath} → ${path.basename(mdxPath)}`
      );
      return { success: true, dryRun: true };
    }

    // Escreve o novo arquivo .mdx
    await fs.writeFile(mdxPath, mdxContent, 'utf-8');

    // Remove o arquivo .md original
    await fs.unlink(mdPath);

    console.log(`${colors.green}✓${colors.reset} ${relativePath} → ${path.basename(mdxPath)}`);
    return { success: true, dryRun: false };
  } catch (error) {
    console.error(
      `${colors.red}✗${colors.reset} Erro ao converter ${relativePath}:`,
      error.message
    );
    return { success: false, error, dryRun: false };
  }
}

/**
 * Função principal
 */
async function main() {
  console.log(`${colors.bright}${colors.blue}Conversor de Markdown para MDX${colors.reset}\n`);

  if (DRY_RUN) {
    console.log(
      `${colors.yellow}Modo DRY RUN ativado - nenhum arquivo será modificado${colors.reset}\n`
    );
  }

  try {
    // Verifica se o diretório existe
    await fs.access(BLOG_DIR);

    // Encontra todos os arquivos .md
    console.log(`Procurando arquivos .md em: ${BLOG_DIR}\n`);
    const mdFiles = await findMarkdownFiles(BLOG_DIR);

    if (mdFiles.length === 0) {
      console.log(`${colors.yellow}Nenhum arquivo .md encontrado!${colors.reset}`);
      return;
    }

    console.log(`Encontrados ${colors.bright}${mdFiles.length}${colors.reset} arquivos .md\n`);

    // Converte cada arquivo
    const results = [];
    for (const mdFile of mdFiles) {
      const result = await convertFile(mdFile);
      results.push(result);
    }

    // Resumo
    console.log(`\n${colors.bright}Resumo:${colors.reset}`);
    const successful = results.filter((r) => r.success).length;
    const failed = results.filter((r) => !r.success).length;

    if (DRY_RUN) {
      console.log(`${colors.yellow}${successful} arquivos seriam convertidos${colors.reset}`);
    } else {
      console.log(`${colors.green}${successful} arquivos convertidos com sucesso${colors.reset}`);
      if (failed > 0) {
        console.log(`${colors.red}${failed} arquivos falharam${colors.reset}`);
      }
    }
  } catch (error) {
    console.error(`${colors.red}Erro fatal:${colors.reset}`, error.message);
    process.exit(1);
  }
}

// Executa o script
main();
