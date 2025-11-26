#!/usr/bin/env node

/**
 * Script para verificar imagens ausentes nos posts
 *
 * Este script:
 * - Percorre todos os arquivos .mdx no diretório src/content/blog
 * - Extrai referências a imagens @assets/images/
 * - Verifica se cada imagem existe
 * - Reporta imagens ausentes
 *
 * Uso: node scripts/check-missing-images.js
 */

import fs from 'fs/promises';
import path from 'path';
import process from 'process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurações
const BLOG_DIR = path.join(__dirname, '..', 'src', 'content', 'blog');
const ASSETS_DIR = path.join(__dirname, '..', 'src', 'assets');

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
 * Extrai referências de imagens de um arquivo
 */
function extractImageReferences(content) {
  const images = [];

  // Padrão 1: Markdown images - ![alt](@assets/...)
  const markdownRegex = /!\[([^\]]*)\]\(@assets\/([^)]+)\)/g;
  let match;
  while ((match = markdownRegex.exec(content)) !== null) {
    images.push({
      type: 'markdown',
      path: match[2],
      alt: match[1],
      fullMatch: match[0],
    });
  }

  // Padrão 2: Frontmatter - image: '@assets/...'
  const frontmatterRegex = /^\s*(?:image|featured_image):\s*['"]@assets\/([^'"]+)['"]/gm;
  while ((match = frontmatterRegex.exec(content)) !== null) {
    images.push({
      type: 'frontmatter',
      path: match[1],
      alt: '',
      fullMatch: match[0],
    });
  }

  return images;
}

/**
 * Verifica se um arquivo existe
 */
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Processa um arquivo .mdx
 */
async function processFile(mdxPath) {
  const relativePath = path.relative(BLOG_DIR, mdxPath);

  try {
    const content = await fs.readFile(mdxPath, 'utf-8');
    const images = extractImageReferences(content);

    if (images.length === 0) {
      return { success: true, missing: [] };
    }

    const missing = [];

    for (const image of images) {
      const imagePath = path.join(ASSETS_DIR, image.path);
      const exists = await fileExists(imagePath);

      if (!exists) {
        missing.push({
          file: relativePath,
          imagePath: image.path,
          type: image.type,
          alt: image.alt,
        });
      }
    }

    return { success: true, missing };
  } catch (error) {
    console.error(
      `${colors.red}✗${colors.reset} Erro ao processar ${relativePath}:`,
      error.message
    );
    return { success: false, missing: [] };
  }
}

/**
 * Função principal
 */
async function main() {
  console.log(`${colors.bright}${colors.blue}Verificador de Imagens Ausentes${colors.reset}\n`);

  try {
    // Encontra todos os arquivos .mdx
    console.log(`Procurando arquivos .mdx em: ${BLOG_DIR}\n`);
    const mdxFiles = await findMdxFiles(BLOG_DIR);

    if (mdxFiles.length === 0) {
      console.log(`${colors.yellow}Nenhum arquivo .mdx encontrado!${colors.reset}`);
      return;
    }

    console.log(`Encontrados ${colors.bright}${mdxFiles.length}${colors.reset} arquivos .mdx\n`);
    console.log(`${colors.cyan}Verificando imagens...${colors.reset}\n`);

    // Processa cada arquivo
    const allMissing = [];
    for (const mdxFile of mdxFiles) {
      const result = await processFile(mdxFile);
      if (result.missing.length > 0) {
        allMissing.push(...result.missing);
      }
    }

    // Resumo
    console.log(`${colors.bright}Resumo:${colors.reset}\n`);

    if (allMissing.length === 0) {
      console.log(`${colors.green}✓ Todas as imagens foram encontradas!${colors.reset}`);
    } else {
      console.log(
        `${colors.red}✗ Encontradas ${allMissing.length} imagens ausentes:${colors.reset}\n`
      );

      // Agrupa por arquivo
      const byFile = {};
      for (const item of allMissing) {
        if (!byFile[item.file]) {
          byFile[item.file] = [];
        }
        byFile[item.file].push(item);
      }

      // Exibe resultados
      for (const [file, images] of Object.entries(byFile)) {
        console.log(`${colors.yellow}${file}${colors.reset}`);
        for (const img of images) {
          console.log(`  ${colors.red}✗${colors.reset} ${img.imagePath}`);
          if (img.alt) {
            console.log(`    Alt: "${img.alt}"`);
          }
        }
        console.log('');
      }

      console.log(
        `${colors.cyan}Dica: Verifique se as imagens existem em src/assets/ com nomes diferentes${colors.reset}`
      );
    }
  } catch (error) {
    console.error(`${colors.red}Erro fatal:${colors.reset}`, error.message);
    process.exit(1);
  }
}

// Executa o script
main();
