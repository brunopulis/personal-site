# Bruno Pulis - Site Pessoal

[![Coverage](https://img.shields.io/badge/coverage-80%25-brightgreen)](https://github.com/brunopulis/personal-website/actions)
[![CodeQL](https://github.com/brunopulis/personal-site/actions/workflows/github-code-scanning/codeql/badge.svg?branch=main)](https://github.com/brunopulis/personal-site/actions/workflows/github-code-scanning/codeql)
[![Codecov](https://img.shields.io/codecov/c/github/brunopulis/personal-website)](https://app.codecov.io/gh/brunopulis/personal-website)

Meu site pessoal construído com Eleventy, TinaCMS e design acessível.

## Tech Stack

- **11ty** - Static Site Generator
- **TinaCMS** - Git-based CMS
- **SCSS** - CSS com PostCSS
- **Jest** - Testes unitários
- **Cypress** - Testes E2E
- **Biome** - Linter e formatter

## Scripts

```bash
# Desenvolvimento
pnpm dev          # Inicia servidor com watch
pnpm dev:full     # Desenvolvimento completo

# Build
pnpm build        # Build de produção
pnpm build:css    # Compila CSS

# Limpeza
pnpm clean        # Remove diretório _site
pnpm clean:all    # Limpa tudo incluindo OG images

# Qualidade de código
pnpm lint         # Executa biome lint
pnpm lint:fix     # Corrige problemas de lint
pnpm format       # Formata código
pnpm check        # Lint + format

# Testes
pnpm test         # Executa testes Jest
```

## Pré-requisitos

- Node.js 18+
- pnpm 10+

## Instalação

```bash
pnpm install
```

## Git hooks

O projeto usa Husky com pre-commit hooks que executam:

- Biome lint/format em arquivos modificados

## Estrutura

```shell
src/
├── _config/          # Configurações do Eleventy
├── assets/           # JS, CSS, Imagens
├── common/           # Templates globais (sitemap, manifest)
├── content/          # Conteúdo do site
│   ├── newsletter/   # Posts da newsletter
│   ├── talks/        # Palestras
│   └── games/        # Reviews de jogos
└── sw.js             # Service Worker
```

## Deploy

Deploy automático via Vercel na branch `main`.

## Licença

ISC
