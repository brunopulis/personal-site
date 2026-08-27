---
name: dead-code
description: Varrer o projeto globalmente em busca de arquivos mortos, exports não usados, registros Eleventy sem consumo, dependências órfãs e referências quebradas. Use antes de refatorações, depois de remover features, ou quando o usuário pedir auditoria de código morto. Produz relatório com evidências — nunca deleta por conta própria.
---

# Dead code — varredura global

Relatório **somente leitura**. A remoção é sempre uma decisão humana aprovada
depois do relatório. O estado do working tree muda (refactors concorrentes
acontecem) — **toda conclusão deve ser re-verificada contra o estado fresco**
antes de virar recomendação.

## Princípios

1. **Bidirecional**: procure (a) definidos mas nunca referenciados *e*
   (b) referenciados mas inexistentes (includes com path errado, deps ausentes,
   assets/sw.js apontando para nada). O tipo (b) é bug em produção, não só sujeira.
2. **Evidência ou silêncio**: um item só entra no relatório com 0 ocorrências
   verificadas em TODOS os pontos de entrada listados abaixo.
3. **Busca literal**: prefira `rg -F "termo"`. Regex mal escapada gerou falso
   negativo real nesta codebase (luxon/dayjs apareceram "mortos" e estavam vivos).
4. **Nunca delete** nesta skill. Sugira ação e risco; valide com build/testes
   somente após aprovação explícita.

## Pontos de entrada (checar todos antes de declarar algo morto)

- `package.json` → bloco `scripts` (comandos npm executam arquivos diretamente)
- `.eleventy.js` → imports, aliases de layout, `addCollection`, `addFilter`,
  `addShortcode`, `addPlugin`, `addPassthroughCopy` (globs!), watch targets
- `src/_config/*.js` (agregadores: filters.js, shortcodes.js, plugins.js,
  events.js, collections.js)
- `tests/unit/**/*.test.js`, `tests/e2e/**`, `vitest.config.js`, `cypress.config.js`
- Directory data files (`**/*.json` com `"layout"`/front matter de diretórios)
- `.husky/*`, README/docs (`*.md`) — scripts manuais podem ser documentados

## Os 7 eixos (+ 1)

### 1. Templates (.njk/.webc)
Órfãos: arquivos em `src/_includes/` e `src/_layouts/` sem nenhuma ocorrência
do basename em `{% include %}`, `{% import %}`, `{% from %}`, aliases de layout
ou front matter `layout:`.

```bash
rg -F 'include "' src --glob '*.njk'        # lista todos os includes ativos
rg -n 'layout:' src --glob '*.{njk,md,json}'
```

Cuidados:
- Layouts são consumidos por **aliases** (.eleventy.js) OU por nome de arquivo
  direto no front matter (`layout: base.njk`) OU por directory data JSON
  (`src/content/*/posts.json`).
- Um include pode apontar para caminho inexistente (ex.: `"partials/x.njk"`
  quando o arquivo está em `head/`) — cruze a lista de includes com a árvore
  real: isso é referência quebrada, não template vivo.

### 2. Filtros e shortcodes
Três níveis: módulo nunca importado pelo agregador → export importado mas não
registrado → registrado mas sem uso em templates.

```bash
# uso como filtro/shortcode nos templates:
rg -F "| nomeDoFiltro" src --glob '*.{njk,md,webc}'
rg -F "{% nomeShortcode" src --glob '*.{njk,md}'
```

Cuidado clássico: `{{ year }}` NÃO chama o shortcode `year` — é variável de
contexto (ex.: `alias: year` de pagination em `watching/year.njk`). Shortcode
só é chamado com `{% year %}`.

### 3. Coleções
`addCollection` no .eleventy.js sem nenhum `collections.nome` em templates:

```bash
rg -F "collections.nomeDaColecao" src --glob '*.{njk,md,js,webc}'
```

### 4. Scripts (`scripts/`)
Órfão = ausente do package.json E sem import de outros módulos vivos E sem
teste. Distinga de **ferramenta de manutenção** documentada (ex.: gerador de
data file usado por página viva — se o produto dele é consumido, ele não está
morto; sinalize apenas que falta wiring no package.json).

### 5. Data files (`src/_data/`)
O Eleventy injeta pelo nome do arquivo (sem extensão). Grep pelo nome em
templates/js/tests. Arquivo com só teste unitário e zero uso runtime = morto
em produção (remover junto com o teste).

### 6. Assets
Arquivo em `src/assets` coberto por algum glob de `addPassthroughCopy` OU
referenciado por SCSS (`url()`), njk, JS ou `src/pages/sw.js`. Verifique
também o inverso: paths citados no sw.js/preloads existem no output?

### 7. Dependências npm
Para cada dep/devDep, busca literal em `src/ scripts/ tests/ *.config.js`:

```bash
rg -lF "nome-do-pacote" src scripts tests .eleventy.js
```

### 8. Referências quebradas (eixo bidirecional)
Includes/templates citados que não existem; exports importados que o módulo
não exporta (ex.: script importando símbolo removido de `src/_data/meta.js`);
paths de sw.js/passthrough sem origem; deps importadas fora do package.json.

## Formato do relatório

Tabela única, ordenada por risco:

| Item | Eixo | Tipo (órfão/quebrado) | Evidência | Risco | Ação sugerida |
|---|---|---|---|---|---|

Colunas mínimas: caminho completo, comando/grep que provou o 0-refs (ou a
referência quebrada), e risco (`baixo`=delete seguro, `médio`=validar com
build, `alto`=tocar lógica de build/dados). Feche com proposta de ordem de
execução e o comando de validação (`npm run build && npm test`).

## Aprendizados desta codebase (não repetir o erro)

- Refactor concorrente mudou o status de 3 templates entre duas varreduras no
  mesmo dia. Sempre declare o timestamp do scan no relatório.
- `sanitize-html` já passou por falso negativo por regex quebrada; use `-F`.
- `{{ var }}` ≠ shortcodes; `alias:` de pagination cria variáveis.
- Layouts raramente usam alias: confira os JSONs de diretório em `src/content/*/`.
