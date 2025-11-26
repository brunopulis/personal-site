#!/usr/bin/env node

/**
 * Script para corrigir caminhos de imagens nos posts do blog
 *
 * Este script:
 * - Percorre todos os arquivos .mdx no diretório src/content/blog
 * - Corrige caminhos de imagens no frontmatter (image: '/images/blog/...')
 * - Corrige caminhos de imagens no conteúdo Markdown (![alt](/images/blog/...))
 * - Atualiza para o caminho correto: '@assets/images/blog/...'
 * - Mantém URLs externas (http://, https://) inalteradas
 *
 * Uso: node scripts/fix-image-paths.js [--dry-run]
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
  cyan: '\x1b[36m',
};

/**
 * Encontra todos os arquivos .mdx recursivamente
 */
async function findMdxFiles(dir) {
  const files = [];

  async function walk(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
        files.push(fullPath);
      }
    }
  }

  await walk(dir);
  return files;
}

/**
 * Corrige caminhos de imagens no conteúdo
 */
function fixImagePaths(content) {
  let fixed = content;
  let changes = [];

  // Padrão 1: Frontmatter - image: '/images/blog/...'
  // Substitui por: image: '@assets/images/blog/...'
  const frontmatterImageRegex = /^(\s*image:\s*['"])\/images\/blog\//gm;
  if (frontmatterImageRegex.test(content)) {
    fixed = fixed.replace(frontmatterImageRegex, '$1@assets/images/blog/');
    changes.push('Frontmatter image path');
  }

  // Padrão 2: Markdown images - ![alt](/images/blog/...)
  // Substitui por: ![alt](@assets/images/blog/...)
  const markdownImageRegex = /!\[([^\]]*)\]\(\/images\/blog\/([^)]+)\)/g;
  const markdownMatches = [...content.matchAll(markdownImageRegex)];
  if (markdownMatches.length > 0) {
    fixed = fixed.replace(markdownImageRegex, '![$1](@assets/images/blog/$2)');
    changes.push(`${markdownMatches.length} Markdown image(s) with /images/blog/`);
  }

  // Padrão 3: Frontmatter - featured_image: '/images/blog/...'
  const featuredImageRegex = /^(\s*featured_image:\s*['"])\/images\/blog\//gm;
  if (featuredImageRegex.test(content)) {
    fixed = fixed.replace(featuredImageRegex, '$1@assets/images/blog/');
    changes.push('Featured image path');
  }

  // Padrão 4: Imagens em /public/images/blog/ (caso existam)
  const publicImageRegex = /!\[([^\]]*)\]\(\/public\/images\/blog\/([^)]+)\)/g;
  const publicMatches = [...content.matchAll(publicImageRegex)];
  if (publicMatches.length > 0) {
    fixed = fixed.replace(publicImageRegex, '![$1](@assets/images/blog/$2)');
    changes.push(`${publicMatches.length} public image(s)`);
  }

  // Padrão 5: Markdown images - ![alt](images/...) SEM barra inicial
  // Este é o padrão mais comum que está causando o erro
  // Substitui por: ![alt](@assets/images/...)
  const relativeImageRegex = /!\[([^\]]*)\]\(images\/([^)]+)\)/g;
  const relativeMatches = [...content.matchAll(relativeImageRegex)];
  if (relativeMatches.length > 0) {
    fixed = fixed.replace(relativeImageRegex, '![$1](@assets/images/$2)');
    changes.push(`${relativeMatches.length} relative image(s)`);
  }

  // Padrão 6: Frontmatter - image: 'images/...' SEM barra inicial
  const frontmatterRelativeRegex = /^(\s*image:\s*['"])images\//gm;
  if (frontmatterRelativeRegex.test(content)) {
    fixed = fixed.replace(frontmatterRelativeRegex, '$1@assets/images/');
    changes.push('Frontmatter relative image');
  }

  return {
    content: fixed,
    hasChanges: fixed !== content,
    changes,
  };
}

/**
 * Processa um arquivo .mdx
 */
async function processFile(mdxPath) {
  const relativePath = path.relative(BLOG_DIR, mdxPath);

  try {
    // Lê o conteúdo do arquivo
    const content = await fs.readFile(mdxPath, 'utf-8');

    // Corrige os caminhos das imagens
    const result = fixImagePaths(content);

    if (!result.hasChanges) {
      // Arquivo não precisa de alterações
      return { success: true, skipped: true, changes: 0 };
    }

    if (DRY_RUN) {
      console.log(
        `${colors.yellow}[DRY RUN]${colors.reset} ${relativePath} - ${colors.cyan}${result.changes.join(', ')}${colors.reset}`
      );
      return { success: true, dryRun: true, changes: result.changes.length };
    }

    // Escreve o arquivo atualizado
    await fs.writeFile(mdxPath, result.content, 'utf-8');

    console.log(
      `${colors.green}✓${colors.reset} ${relativePath} - ${colors.cyan}${result.changes.join(', ')}${colors.reset}`
    );
    return { success: true, dryRun: false, changes: result.changes.length };
  } catch (error) {
    console.error(
      `${colors.red}✗${colors.reset} Erro ao processar ${relativePath}:`,
      error.message
    );
    return { success: false, error, changes: 0 };
  }
}

/**
 * Função principal
 */
async function main() {
  console.log(`${colors.bright}${colors.blue}Corretor de Caminhos de Imagens${colors.reset}\n`);

  if (DRY_RUN) {
    console.log(
      `${colors.yellow}Modo DRY RUN ativado - nenhum arquivo será modificado${colors.reset}\n`
    );
  }

  try {
    // Verifica se o diretório existe
    await fs.access(BLOG_DIR);

    // Encontra todos os arquivos .mdx
    console.log(`Procurando arquivos .mdx em: ${BLOG_DIR}\n`);
    const mdxFiles = await findMdxFiles(BLOG_DIR);

    if (mdxFiles.length === 0) {
      console.log(`${colors.yellow}Nenhum arquivo .mdx encontrado!${colors.reset}`);
      return;
    }

    console.log(`Encontrados ${colors.bright}${mdxFiles.length}${colors.reset} arquivos .mdx\n`);

    // Processa cada arquivo
    const results = [];
    for (const mdxFile of mdxFiles) {
      const result = await processFile(mdxFile);
      results.push(result);
    }

    // Resumo
    console.log(`\n${colors.bright}Resumo:${colors.reset}`);
    const successful = results.filter((r) => r.success && !r.skipped).length;
    const skipped = results.filter((r) => r.skipped).length;
    const failed = results.filter((r) => !r.success).length;
    const totalChanges = results.reduce((sum, r) => sum + r.changes, 0);

    if (DRY_RUN) {
      console.log(`${colors.yellow}${successful} arquivos seriam modificados${colors.reset}`);
      console.log(`${colors.cyan}${totalChanges} alterações seriam feitas${colors.reset}`);
    } else {
      console.log(`${colors.green}${successful} arquivos modificados com sucesso${colors.reset}`);
      console.log(`${colors.cyan}${totalChanges} alterações realizadas${colors.reset}`);
    }

    if (skipped > 0) {
      console.log(`${colors.blue}${skipped} arquivos não precisavam de alterações${colors.reset}`);
    }

    if (failed > 0) {
      console.log(`${colors.red}${failed} arquivos falharam${colors.reset}`);
    }
  } catch (error) {
    console.error(`${colors.red}Erro fatal:${colors.reset}`, error.message);
    process.exit(1);
  }
}

// Executa o script
main();
