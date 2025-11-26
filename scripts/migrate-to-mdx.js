#!/usr/bin/env node

/**
 * Script mestre para migração completa de MD para MDX
 *
 * Este script executa em sequência:
 * 1. Conversão de .md para .mdx
 * 2. Correção de caminhos de imagens
 *
 * Uso: node scripts/migrate-to-mdx.js [--dry-run]
 */

import { spawn } from 'child_process';
import process from 'process';

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
 * Executa um comando e retorna uma Promise
 */
function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    console.log(`\n${colors.cyan}Executando: ${command} ${args.join(' ')}${colors.reset}\n`);

    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Comando falhou com código ${code}`));
      }
    });

    child.on('error', (error) => {
      reject(error);
    });
  });
}

/**
 * Função principal
 */
async function main() {
  console.log(
    `${colors.bright}${colors.blue}╔════════════════════════════════════════════╗${colors.reset}`
  );
  console.log(
    `${colors.bright}${colors.blue}║  Migração Completa: Markdown → MDX        ║${colors.reset}`
  );
  console.log(
    `${colors.bright}${colors.blue}╚════════════════════════════════════════════╝${colors.reset}\n`
  );

  if (DRY_RUN) {
    console.log(
      `${colors.yellow}⚠️  Modo DRY RUN ativado - nenhum arquivo será modificado${colors.reset}\n`
    );
  } else {
    console.log(
      `${colors.red}⚠️  ATENÇÃO: Este script irá modificar seus arquivos!${colors.reset}`
    );
    console.log(
      `${colors.yellow}   Certifique-se de ter um backup (commit no Git)${colors.reset}\n`
    );
  }

  try {
    // Passo 1: Converter MD para MDX
    console.log(
      `${colors.bright}${colors.blue}[1/2] Convertendo arquivos .md para .mdx...${colors.reset}`
    );
    const convertArgs = DRY_RUN ? ['run', 'convert:mdx:dry-run'] : ['run', 'convert:mdx'];
    await runCommand('pnpm', convertArgs);
    console.log(`${colors.green}✓ Conversão concluída!${colors.reset}\n`);

    // Passo 2: Corrigir caminhos de imagens
    console.log(
      `${colors.bright}${colors.blue}[2/2] Corrigindo caminhos de imagens...${colors.reset}`
    );
    const fixArgs = DRY_RUN ? ['run', 'fix:images:dry-run'] : ['run', 'fix:images'];
    await runCommand('pnpm', fixArgs);
    console.log(`${colors.green}✓ Correção de imagens concluída!${colors.reset}\n`);

    // Resumo final
    console.log(
      `${colors.bright}${colors.green}╔════════════════════════════════════════════╗${colors.reset}`
    );
    console.log(
      `${colors.bright}${colors.green}║  ✓ Migração concluída com sucesso!        ║${colors.reset}`
    );
    console.log(
      `${colors.bright}${colors.green}╚════════════════════════════════════════════╝${colors.reset}\n`
    );

    if (DRY_RUN) {
      console.log(`${colors.yellow}Modo DRY RUN - Para executar de verdade, rode:${colors.reset}`);
      console.log(`${colors.cyan}pnpm run migrate:mdx${colors.reset}\n`);
    } else {
      console.log(`${colors.bright}Próximos passos:${colors.reset}`);
      console.log(`1. ${colors.cyan}Verifique os arquivos modificados${colors.reset}`);
      console.log(`2. ${colors.cyan}Teste o build: pnpm run build${colors.reset}`);
      console.log(`3. ${colors.cyan}Reinicie o TinaCMS: pnpm run dev${colors.reset}\n`);
    }
  } catch (error) {
    console.error(`\n${colors.red}✗ Erro durante a migração:${colors.reset}`, error.message);
    process.exit(1);
  }
}

// Executa o script
main();
