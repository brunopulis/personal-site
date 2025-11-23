import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const NOTES_DIR = path.join(__dirname, '../src/content/notes');

function fixYamlEscaping(content) {
  const lines = content.split('\n');
  let inFrontmatter = false;
  let frontmatterStart = -1;
  let frontmatterEnd = -1;

  // Encontrar o frontmatter
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      if (frontmatterStart === -1) {
        frontmatterStart = i;
        inFrontmatter = true;
      } else {
        frontmatterEnd = i;
        break;
      }
    }
  }

  if (frontmatterEnd === -1) {
    return content; // Sem frontmatter válido
  }

  // Processar linhas do frontmatter
  for (let i = frontmatterStart + 1; i < frontmatterEnd; i++) {
    const line = lines[i];

    // Verificar se é uma linha com valor entre aspas duplas
    const doubleQuoteMatch = line.match(/^(\s*\w+:\s*)"(.*)"\s*$/);
    if (doubleQuoteMatch) {
      const [, prefix, value] = doubleQuoteMatch;

      // Decodificar todos os escapes para obter o valor original
      let originalValue = value;
      try {
        // Tentar decodificar múltiplas vezes até estabilizar
        let prev = '';
        while (prev !== originalValue) {
          prev = originalValue;
          originalValue = originalValue.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }
      } catch (e) {
        // Se falhar, usar o valor como está
      }

      // Decidir se usar aspas simples ou duplas
      const hasSingleQuote = originalValue.includes("'");
      const hasDoubleQuote = originalValue.includes('"');
      const hasBackslash = originalValue.includes('\\');

      if (hasSingleQuote && !hasDoubleQuote && !hasBackslash) {
        // Usar aspas duplas sem escape
        lines[i] = `${prefix}"${originalValue}"`;
      } else if (!hasSingleQuote) {
        // Usar aspas simples (não precisa escapar nada)
        lines[i] = `${prefix}'${originalValue}'`;
      } else {
        // Tem ambos os tipos de aspas ou barras, usar aspas duplas com escape
        const escaped = originalValue.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
        lines[i] = `${prefix}"${escaped}"`;
      }
    }
  }

  return lines.join('\n');
}

async function fixAllNotes() {
  console.log('🔧 Corrigindo escape de YAML em notes (v2)...\n');
  console.log('='.repeat(60));

  if (!fs.existsSync(NOTES_DIR)) {
    console.error(`❌ Pasta não encontrada: ${NOTES_DIR}`);
    return;
  }

  const files = fs.readdirSync(NOTES_DIR).filter((f) => f.endsWith('.md'));

  console.log(`\n📁 Encontrados ${files.length} arquivos markdown\n`);

  let fixed = 0;
  let errors = 0;
  let skipped = 0;

  for (const file of files) {
    const filePath = path.join(NOTES_DIR, file);

    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const fixedContent = fixYamlEscaping(content);

      if (content !== fixedContent) {
        fs.writeFileSync(filePath, fixedContent, 'utf-8');
        fixed++;
        if (fixed <= 20) {
          console.log(`  ✓ Corrigido: ${file}`);
        } else if (fixed % 100 === 0) {
          console.log(`  ✓ ${fixed} arquivos corrigidos...`);
        }
      } else {
        skipped++;
      }
    } catch (error) {
      errors++;
      console.error(`  ✗ Erro em ${file}: ${error.message}`);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('✨ Correção concluída!\n');
  console.log(`📊 Estatísticas:`);
  console.log(`   • ${fixed} arquivos corrigidos`);
  console.log(`   • ${skipped} arquivos OK`);
  console.log(`   • ${errors} erros\n`);
}

fixAllNotes().catch(console.error);
