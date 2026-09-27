import {describe, it, expect} from 'vitest';
import {classify, planFor} from '../../scripts/lib/test-gate.js';

describe('classify', () => {
  it('pula conteúdo editorial e assets estáticos', () => {
    const contentOnly = [
      'src/content/posts/2026/2026-09-24.md',
      'src/content/notes/2026-09-20.md',
      'src/content/watching/movies/algum-filme.md',
      'src/drafts/2026-08-31.md',
      'src/assets/og-images/preview.jpeg',
      'src/assets/images/foto.avif',
      'src/assets/fonts/source-sans.woff2',
      'src/assets/svg/logo.svg'
    ];

    for (const file of contentOnly) {
      expect(classify(file), file).toEqual({unit: 'skip', e2e: false, spec: false});
    }
  });

  it('pula documentação e config de editor', () => {
    for (const file of ['README.md', 'AGENTS.md', 'docs/design.md', 'public/robots.txt', '.prettierrc']) {
      expect(classify(file), file).toEqual({unit: 'skip', e2e: false, spec: false});
    }
  });

  it('roda os testes relacionados para fontes cobertas pelo vitest', () => {
    expect(classify('src/_config/filters/featured.js')).toEqual({
      unit: 'related',
      e2e: true,
      spec: false
    });
    expect(classify('scripts/lib/path-safety.js')).toEqual({unit: 'related', e2e: true, spec: false});
  });

  it('roda a suíte completa para fontes sem relação estática com os testes', () => {
    const full = [
      'src/_data/site.json',
      '.eleventy.js',
      'package.json',
      'vitest.config.js',
      '.husky/pre-push'
    ];

    for (const file of full) {
      expect(classify(file), file).toEqual({unit: 'full', e2e: true, spec: false});
    }
  });

  it('dispara o e2e para o que o Cypress observa', () => {
    const e2eOnly = [
      'src/pages/index.njk',
      'src/_includes/partials/footer.njk',
      'src/_layouts/base.njk',
      'src/assets/css/blocks/_home.scss',
      'src/feeds/blog/rss.xml',
      'src/common/helpers.js'
    ];

    for (const file of e2eOnly) {
      expect(classify(file), file).toEqual({unit: 'skip', e2e: true, spec: false});
    }
  });

  it('trata arquivo de teste como alvo do próprio runner', () => {
    expect(classify('tests/unit/filters/featured.test.js')).toEqual({
      unit: 'related',
      e2e: false,
      spec: true
    });
    expect(classify('tests/e2e/home.cy.js')).toEqual({unit: 'skip', e2e: true, spec: false});
  });

  it('normaliza separadores de caminho do Windows', () => {
    expect(classify('src\\_config\\filters\\featured.js')).toEqual({
      unit: 'related',
      e2e: true,
      spec: false
    });
  });

  it('é conservador com caminhos desconhecidos', () => {
    expect(classify('src/novo/diretorio/qualquer.js')).toEqual({unit: 'full', e2e: true, spec: false});
  });
});

describe('planFor', () => {
  it('não roda nada quando não há arquivos', () => {
    expect(planFor()).toEqual({unit: 'skip', e2e: false, sources: [], specs: []});
  });

  it('ignora commit só de conteúdo', () => {
    const plan = planFor(['src/content/posts/2026/2026-09-24.md', 'src/assets/og-images/p.jpeg']);

    expect(plan).toEqual({unit: 'skip', e2e: false, sources: [], specs: []});
  });

  it('separa fontes de specs no mesmo commit', () => {
    const plan = planFor(['src/_config/filters/featured.js', 'tests/unit/filters/featured.test.js']);

    expect(plan.unit).toBe('related');
    expect(plan.sources).toEqual(['src/_config/filters/featured.js']);
    expect(plan.specs).toEqual(['tests/unit/filters/featured.test.js']);
  });

  it('promove related para full quando qualquer arquivo exige a suíte inteira', () => {
    const comDataDepois = planFor(['src/_config/filters/featured.js', 'src/_data/site.json']);
    const comDataAntes = planFor(['src/_data/site.json', 'src/_config/filters/featured.js']);

    expect(comDataDepois.unit).toBe('full');
    expect(comDataAntes.unit).toBe('full');
  });

  it('acumula e2e entre vários arquivos', () => {
    const plan = planFor(['src/content/notes/x.md', 'src/pages/about.md', 'src/_layouts/base.njk']);

    expect(plan.e2e).toBe(true);
    expect(plan.unit).toBe('skip');
  });

  it('marca necessidade de e2e mesmo quando a fonte também exige unit', () => {
    // O gate responde "isto afeta o que o Cypress observa"; quem decide quando rodar
    // é o runner (o Cypress só sai no pre-push).
    expect(planFor(['src/_config/filters/featured.js']).e2e).toBe(true);
  });

  it('não marca fonte de full como alvo do vitest related', () => {
    expect(planFor(['.eleventy.js']).sources).toEqual([]);
  });

  it('sobe para a suíte inteira quando a fonte é removida', () => {
    // Arquivo deletado não tem grafo de imports: o teste que o importava quebra.
    const plan = planFor(['src/_config/filters/where.js'], {
      deleted: ['src/_config/filters/where.js']
    });

    expect(plan.unit).toBe('full');
    expect(plan.sources).toEqual([]);
    expect(plan.e2e).toBe(true);
  });

  it('não envia arquivo deletado como alvo do vitest related', () => {
    const plan = planFor(['tests/unit/filters/where.test.js'], {
      deleted: ['tests/unit/filters/where.test.js']
    });

    expect(plan.specs).toEqual([]);
  });

  it('mantém rápido o commit que só remove conteúdo', () => {
    const plan = planFor(['src/content/posts/2026/2020-01-01-antigo.md'], {
      deleted: ['src/content/posts/2026/2020-01-01-antigo.md']
    });

    expect(plan).toEqual({unit: 'skip', e2e: false, sources: [], specs: []});
  });

  it('não sobe para a suíte inteira quando some um template', () => {
    const plan = planFor(['src/pages/saindo.md'], {deleted: ['src/pages/saindo.md']});

    expect(plan).toEqual({unit: 'skip', e2e: true, sources: [], specs: []});
  });
});
