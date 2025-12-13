#!/usr/bin/env node

/**
 * Script para corrigir links malformados em arquivos markdown
 */

import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
import fg from 'fast-glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, '../src/content');

async function fixMalformedLinks() {
  console.log('🔧 Corrigindo links malformados...\n');

  const files = await fg('**/*.md', {
    cwd: CONTENT_DIR,
    absolute: true
  });

  let totalFixed = 0;

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    let originalContent = content;

    // 1. Corrigir links com espaços no início da URL: [text](  /url) -> [text](/url)
    content = content.replace(/\]\(\s+(\/[^)]+)\)/g, ']($1)');

    // 2. Corrigir links vazios ou com apenas espaços: [text](  ) -> text
    // Remove o link mas mantém o texto
    content = content.replace(/\[([^\]]+)\]\(\s*\)/g, '$1');

    // 3. Corrigir links malformados com <https://...
    content = content.replace(/\]\(<https:\/\/([^>]+)\)/g, '](https://$1)');

    if (content !== originalContent) {
      fs.writeFileSync(file, content, 'utf-8');
      console.log(`✅ Corrigido: ${path.relative(CONTENT_DIR, file)}`);
      totalFixed++;
    }
  }

  console.log(`\n✨ Total de arquivos corrigidos: ${totalFixed}`);
}

fixMalformedLinks().catch(console.error);
