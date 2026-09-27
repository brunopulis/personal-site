#!/usr/bin/env node
/**
 * Roda só os testes que os arquivos alterados exigem.
 *
 *   node scripts/test-changed.js            # arquivos em staging (pre-commit): unitários
 *   node scripts/test-changed.js --range    # commits a publicar (pre-push): unitários + Cypress
 *   node scripts/test-changed.js --all      # suíte completa, sem consultar o diff
 *   node scripts/test-changed.js --e2e      # força o Cypress fora do pre-push
 *   node scripts/test-changed.js --dry-run  # imprime o plano sem executar
 *   node scripts/test-changed.js --no-e2e   # pula o Cypress
 *
 * O gate diz *o que* precisa de teste; a política de *quando* é daqui:
 * o Cypress fica no pre-push, porque subir um servidor e rodar o navegador
 * a cada commit não se paga em um site de conteúdo.
 *
 * Escape hatches: SKIP_TESTS=1 pula tudo, SKIP_E2E=1 pula só o Cypress,
 * FORCE_TESTS=1 ignora o diff, HUSKY=0 / git --no-verify pulam o hook.
 */
import {execFileSync} from 'node:child_process';
import {planFor} from './lib/test-gate.js';

const flags = new Set(process.argv.slice(2));
const useRange = flags.has('--range');
const forceAll = flags.has('--all') || process.env.FORCE_TESTS === '1';
const dryRun = flags.has('--dry-run');
const forceE2E = flags.has('--e2e');
const skipE2E = flags.has('--no-e2e') || process.env.SKIP_E2E === '1';
const skipAll = process.env.SKIP_TESTS === '1';

function git(args, {optional = false} = {}) {
  try {
    return execFileSync('git', args, {
      encoding: 'utf8',
      // Em chamadas opcionais o erro é esperado (ex.: sem upstream) — não polui a saída.
      stdio: optional ? ['ignore', 'pipe', 'ignore'] : 'pipe'
    });
  } catch (error) {
    if (optional) return null;
    throw error;
  }
}

const toList = output =>
  output
    .split('\0')
    .map(entry => entry.trim())
    .filter(Boolean);

/** Base da comparação no push: `@{upstream}...HEAD`, ou null se a branch não tem upstream. */
function range() {
  const upstream = git(['rev-parse', '--abbrev-ref', '--symbolic-full-name', '@{upstream}'], {
    optional: true
  });
  return upstream ? `${upstream.trim()}...HEAD` : null;
}

/** null = não deu para saber o diff (ex.: primeiro push, sem upstream). */
function changedFiles() {
  if (useRange) {
    const base = range();
    if (base === null) return null;

    return {
      files: toList(git(['diff', '--name-only', '--diff-filter=ACMR', '-z', base])),
      deleted: toList(git(['diff', '--name-only', '--diff-filter=D', '-z', base]))
    };
  }

  return {
    files: toList(git(['diff', '--cached', '--name-only', '--diff-filter=ACMR', '-z'])),
    deleted: toList(git(['diff', '--cached', '--name-only', '--diff-filter=D', '-z']))
  };
}

function run(label, command, args) {
  console.log(`  ${label}`);
  if (dryRun) {
    console.log(`    [dry-run] pnpm ${[command, ...args].join(' ')}`);
    return;
  }
  execFileSync('pnpm', [command, ...args], {stdio: 'inherit'});
}

function report(files, deleted, plan, {runE2E}) {
  const origin = useRange ? 'commits a publicar' : 'staging';
  console.log(`\n${files.length + deleted.length} arquivo(s) alterado(s) em ${origin}:`);
  for (const file of files) console.log(`  ${file}`);
  for (const file of deleted) console.log(`  ${file} (removido)`);

  if (plan.unit === 'full') console.log('\nunit: suíte completa (fonte sem relação estática com os testes)');
  else if (plan.unit === 'related') console.log('\nunit: testes relacionados aos arquivos alterados');
  else console.log('\nunit: pulado');

  if (skipE2E) console.log('e2e: pulado (SKIP_E2E/--no-e2e)');
  else if (runE2E) console.log('e2e: roda (Cypress)');
  else if (plan.e2e) console.log('e2e: necessário — roda no pre-push');
  else console.log('e2e: pulado');
}

if (skipAll) {
  console.log('SKIP_TESTS=1 — nenhum teste executado.');
  process.exit(0);
}

const changed = changedFiles();

if (changed === null) {
  console.log('Sem upstream para comparar — rodando a suíte completa.');
  if (dryRun) {
    console.log('    [dry-run] pnpm test');
    console.log('    [dry-run] pnpm test:e2e:ci');
    process.exit(0);
  }
  execFileSync('pnpm', ['test'], {stdio: 'inherit'});
  if (!skipE2E) execFileSync('pnpm', ['test:e2e:ci'], {stdio: 'inherit'});
  process.exit(0);
}

const {files, deleted} = changed;
const plan = forceAll ? {unit: 'full', e2e: true, sources: [], specs: []} : planFor(files, {deleted});

// O Cypress é caro: só no pre-push, ou quando pedido explicitamente.
const runE2E = plan.e2e && !skipE2E && (useRange || forceE2E);

if (forceAll) console.log('\nSuíte completa (--all): ignorando o diff.');
else report(files, deleted, plan, {runE2E});

if (plan.unit === 'full') {
  run('unit: vitest run', 'test', []);
} else if (plan.unit === 'related') {
  const targets = [...plan.sources, ...plan.specs];
  run(`unit: vitest related (${targets.length} alvo(s))`, 'exec', ['vitest', 'related', '--run', ...targets]);
}

if (runE2E) run('e2e: cypress', 'test:e2e:ci', []);

if (plan.unit === 'skip' && !runE2E) console.log('\nNada a executar.');
