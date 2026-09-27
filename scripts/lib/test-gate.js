/**
 * Decide quais suítes de teste rodar a partir dos arquivos alterados.
 *
 * Módulo puro: recebe a lista de arquivos e devolve o plano. Sem I/O, sem git,
 * sem spawn — assim dá para testar as regras de forma barata (tests/unit/test-gate.test.js).
 *
 * Cada arquivo cai em uma categoria:
 * - content: conteúdo editorial e assets estáticos, não exercitam nenhum teste
 * - neutral: documentação e config de editor, idem
 * - spec:    arquivo de teste alterado, roda ele mesmo
 * - related: fonte coberta pelo vitest, roda os testes que a importam
 * - full:    fonte sem relação estática com os testes, roda a suíte inteira
 * - e2e:     o que o Cypress verifica (templates, páginas, estilos)
 *
 * Categoria desconhecida cai em full + e2e: preferimos um commit lento a um falso verde.
 */

const CONTENT_DIRS = [
  'src/content/',
  'src/drafts/',
  'src/assets/files/',
  'src/assets/fonts/',
  'src/assets/images/',
  'src/assets/og-images/',
  'src/assets/svg/'
];

const NEUTRAL_FILES = [
  'ACCESSIBILITY.md',
  'AGENTS.md',
  'GUIDE.md',
  'LICENSE',
  'README.md',
  'SECURITY.md',
  'sequoia.json',
  '.editorconfig',
  '.eleventyignore',
  '.env.example',
  '.gitignore',
  '.prettierignore',
  '.prettierrc',
  '.sequoia-state.json'
];

const NEUTRAL_DIRS = ['docs/', 'public/'];

// Fontes que os testes unitários importam (vitest.config.js: coverage de src/_config, src/_data, scripts)
const RELATED_DIRS = ['src/_config/', 'scripts/'];

// Sem relação estática com os testes, mas consumidas em runtime pelo build
const FULL_FILES = [
  '.eleventy.js',
  'cypress.config.js',
  'package.json',
  'pnpm-lock.yaml',
  'vitest.config.js'
];
const FULL_DIRS = ['src/_data/', '.husky/'];

// O que o Cypress observa no navegador
const E2E_DIRS = [
  'src/_includes/',
  'src/_layouts/',
  'src/pages/',
  'src/assets/css/',
  'src/assets/js/',
  'src/common/',
  'src/feeds/'
];

const SKIP = {unit: 'skip', e2e: false, spec: false};
const FULL_AND_E2E = {unit: 'full', e2e: true, spec: false};
const E2E_ONLY = {unit: 'skip', e2e: true, spec: false};
const RELATED_AND_E2E = {unit: 'related', e2e: true, spec: false};
const RELATED_SPEC = {unit: 'related', e2e: false, spec: true};

const under = (file, dir) => file.startsWith(dir);
const anyUnder = (file, dirs) => dirs.some(dir => under(file, dir));

export function classify(file) {
  const path = String(file).replace(/\\/g, '/');

  if (anyUnder(path, CONTENT_DIRS)) return SKIP;
  if (NEUTRAL_FILES.includes(path) || anyUnder(path, NEUTRAL_DIRS)) return SKIP;
  if (under(path, 'tests/unit/')) return RELATED_SPEC;
  if (under(path, 'tests/e2e/')) return E2E_ONLY;
  if (anyUnder(path, RELATED_DIRS)) return RELATED_AND_E2E;
  if (FULL_FILES.includes(path) || anyUnder(path, FULL_DIRS)) return FULL_AND_E2E;
  if (anyUnder(path, E2E_DIRS)) return E2E_ONLY;

  return FULL_AND_E2E;
}

/**
 * Une as decisões de cada arquivo em um único plano.
 * `full` sempre vence `related`, independente da ordem em que os arquivos aparecem.
 * `sources` e `specs` são apenas os alvos do `vitest related` — quem pede a suíte
 * inteira não precisa deles.
 *
 * `deleted` cobre um caso que o grafo de imports não alcança: arquivo removido não
 * tem relação estática com ninguém, e o teste que o importava vai falhar. Por isso
 * deletar fonte sobe para a suíte inteira em vez de passar batido.
 */
export function planFor(files = [], {deleted = []} = {}) {
  const removed = new Set(deleted);
  const plan = {unit: 'skip', e2e: false, sources: [], specs: []};

  for (const file of files) {
    const kind = classify(file);
    const isDeleted = removed.has(file);
    const unit = isDeleted && kind.unit === 'related' ? 'full' : kind.unit;

    if (unit === 'full') plan.unit = 'full';
    else if (unit === 'related' && plan.unit === 'skip') plan.unit = 'related';

    if (!isDeleted) {
      if (kind.spec) plan.specs.push(file);
      else if (unit === 'related') plan.sources.push(file);
    }

    if (kind.e2e) plan.e2e = true;
  }

  return plan;
}
