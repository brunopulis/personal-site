# AGENTS.md - Projeto Bruno Pulis

## Visão Geral

Site pessoal/blog estático construído com Eleventy, TinaCMS e design acessível. Projeto em JavaScript/TypeScript com testes Jest e Cypress.

## Comandos de Build, Lint e Test

### Instalação

```bash
pnpm install
```

### Desenvolvimento

```bash
pnpm dev          # Servidor com watch + TinaCMS
pnpm dev:full    # Desenvolvimento completo
```

### Build

```bash
pnpm build        # Build de produção
pnpm build:css   # Compila CSS apenas
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
pnpm test                           # Executa todos os testes
pnpm test -- --testPathPattern=unit           # Apenas unitários
pnpm test -- --testPathPattern=integration    # Apenas integração
pnpm test -- --testNamePattern=slugify         # Teste por nome
pnpm test -- slugify.test.js                   # Arquivo específico
pnpm test -- --watch                           # Modo watch
pnpm test -- --coverage                        # Com coverage
```

**Nota**: Jest 30+ requer `NODE_OPTIONS='--experimental-vm-modules'`

## Estrutura de Testes

```
tests/
├── unit/           # Testes unitários
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

- Use ESM (`import { x } from './path.js'`)
- Ordene: externos > internos > relativos
- Use paths relativos curtos

### Nomenclatura

- **Arquivos**: kebab-case (`slugify.test.js`)
- **Componentes**: PascalCase
- **Funções**: camelCase
- **Constantes**: SCREAMING_SNAKE_CASE

### Tipos

- Use TypeScript para novos arquivos
- Para JS, use JSDoc
- Prefira tipos explícitos em parâmetros

### Tratamento de Erros

- Use try/catch para operações assíncronas
- Logue erros com contexto adequado
- Retorne valores padrão seguros em filtros

### Biome Config (biome.json)

```json
{
  "formatter": { "indentWidth": 2, "lineWidth": 100 },
  "javascript": {
    "formatter": { "quoteStyle": "single", "semicolons": "always" }
  },
  "linter": {
    "rules": { "recommended": true, "style": { "useConst": "error" } }
  }
}
```

## Estrutura do Projeto

```
src/
├── _config/           # Configurações Eleventy
│   ├── filters/        # Filtros Nunjucks
│   ├── plugins/        # Plugins (markdown, etc)
│   ├── shortcodes/     # Shortcodes
│   └── events/        # Eventos de build
├── assets/            # JS, SCSS, Imagens
├── common/            # Templates globais
├── content/           # Conteúdo do site
│   ├── newsletter/
│   ├── talks/
│   └── games/
└── sw.js              # Service Worker
```

## Git Hooks (Husky)

Husky com pre-commit executa `lint-staged` com Biome.

Para ativar: `pnpm husky install`

## Dependências Principais

- **@11ty/eleventy** - Static Site Generator
- **tinacms** - CMS Git-based
- **jest** - Testes unitários
- **cypress** - Testes E2E
- **@biomejs/biome** - Linter/Formatter
- **sass** / **postcss** - CSS

## Notas Importantes

1. O `.env` contém variáveis sensíveis e NÃO deve ser commitado
2. Arquivos de SEO em `src/common/` (robots, sitemap, manifest)
3. CI/CD em `.github/workflows/`
4. Testes usam flag `--no-webstorage` com Jest 30

## Troubleshooting

### Testes falhando com "Cannot initialize local storage"

```bash
cross-env NODE_OPTIONS='--no-webstorage --experimental-vm-modules' jest
```

### Problemas com pnpm

Use pnpm 10+: `corepack enable`
