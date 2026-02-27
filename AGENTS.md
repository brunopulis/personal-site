# AGENTS.md - Projeto Bruno Pulis

## Visão Geral

Site pessoal/blog estático construído com Eleventy, TinaCMS e design acessível. Projeto em TypeScript/JavaScript com testes Jest e Cypress.

## Comandos de Build, Lint e Test

### Instalação

```bash
pnpm install
```

### Desenvolvimento

```bash
pnpm dev          # Inicia servidor com watch
pnpm dev:full    # Desenvolvimento completo
```

### Build

```bash
pnpm build        # Build de produção
pnpm build:css    # Compila CSS apenas
pnpm clean        # Remove diretório _site
pnpm clean:all    # Limpa tudo
```

### Qualidade de Código

```bash
pnpm lint         # Executa biome lint
pnpm lint:fix     # Corrige problemas de lint
pnpm format       # Formata código
pnpm check        # Lint + format (corrige tudo)
```

### Testes

```bash
pnpm test                  # Executa todos os testes
pnpm test -- tests/unit   # Apenas testes unitários
pnpm test -- tests/integration  # Apenas testes de integração
pnpm test -- --testNamePattern="slugify"  # Teste específico por nome
pnpm test -- filename.test.js  # Executa arquivo específico
```

## Estrutura de Testes

```shell
tests/
├── unit/           # Testes unitários (54 testes)
│   ├── simple.test.js
│   ├── dates.test.js
│   ├── slugify.test.js
│   ├── limit.test.js
│   ├── shuffle.test.js
│   ├── striptags.test.js
│   ├── markdown-format.test.js
│   └── groupBy.test.js
└── integration/    # Testes de integração
    ├── markdown-pipeline.test.js
    ├── chained-filters.test.js
    └── collections.test.js
```

## Convenções de Código

### Imports

- Use imports ESM (`import { x } from './path.js'`)
- Ordene imports: externos > internos > relativos
- Use paths relativos curtos quando possível

### Nomenclatura

- **Arquivos**: kebab-case (`slugify.test.js`)
- **Componentes**: PascalCase
- **Funções**: camelCase
- **Constantes**: SCREAMING_SNAKE_CASE

### Tipos

- Use TypeScript para novos arquivos
- Para JS, use JSDoc para documentar tipos
- Prefira tipos explícitos em parâmetros de funções

### Tratamento de Erros

- Use try/catch para operações assíncronas
- Logue erros com contexto adequado
- Retorne valores padrão seguros em filtros

### Estilo de Código (Biome)

O projeto usa Biome para lint e formatação. Configuração em `biome.json`.

```json
{
  "editor.defaultFormatter": "biome",
  "editor.formatOnSave": true,
  "javascript.formate.semicolon": "always",
  "javascript.formate.quoteStyle": "single"
}
```

## Estrutura do Projeto

```shell
src/
├── _config/              # Configurações Eleventy
│   ├── filters/          # Filtros Nunjucks
│   ├── plugins/          # Plugins (markdown, etc)
│   ├── shortcodes/       # Shortcodes
│   └── events/           # Eventos de build
├── assets/               # JS, SCSS, Imagens
├── common/               # Templates globais
├── content/              # Conteúdo do site
│   ├── newsletter/
│   ├── talks/
│   └── games/
└── sw.js                 # Service Worker
```

## Git Hooks (Husky)

O projeto usa Husky com pre-commit hooks que executam:

- `lint-staged` com Biome em arquivos modificados

Para ativar: `pnpm husky install`

## Dependências Principais

- **@11ty/eleventy** - Static Site Generator
- **tinacms** - CMS Git-based
- **jest** - Testes unitários
- **cypress** - Testes E2E
- **@biomejs/biome** - Linter/Formatter
- **sass** / **postcss** - CSS
- **markdown-it** - Processamento Markdown

## Notas Importantes

1. O `.env` contém variáveis sensíveis e NÃO deve ser commitado
2. Arquivos de SEO já existem em `src/common/` (robots, sitemap, manifest)
3. Configurações de CI/CD em `.github/workflows/`
4. Testes rodam com flag `--no-webstorage` por conta do Jest 30

## Troubleshooting

### Testes falhando com "Cannot initialize local storage"

Use: `cross-env NODE_OPTIONS='--no-webstorage --experimental-vm-modules' jest`

### Problemas com pnpm

O projeto usa pnpm 10+. Use `corepack enable` para ativar.
