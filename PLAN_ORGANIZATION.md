# Proposta de Organização de Componentes

Para melhorar a manutenibilidade e escalabilidade do projeto, sugiro a seguinte estrutura de pastas para `src/components`:

## 1. `ui/` (Componentes Base)

Componentes visuais puros, reutilizáveis e agnósticos de lógica de negócio.

- `MediaCard.astro`
- `ServiceCard.astro`
- `GoBack.astro`
- `Pagination.astro`
- `AvailabilityBanner.astro`

## 2. `layout/` (Estrutura)

Componentes que definem o layout e estrutura das páginas.

- `Navigation.astro` (Mover da raiz)
- `Footer.astro` (Mover de `layouts/`)
- `Header.astro` (Mover de `layouts/`)
- `Hero.astro` (Renomear de `layouts/HeroSection.astro`)

## 3. `common/` (Componentes Compartilhados)

Componentes funcionais reutilizáveis em várias partes do site.

- `Newsletter.astro`
- `ShareButton.astro`
- `BuyMeCoffee.astro`
- `CTA.astro`
- `FinalCTA.astro`
- `EmailReplyButton.astro`
- `LanguagePicker.astro`
- `TagFilter.astro`

## 4. `features/` (Funcionalidades)

Agrupamento de componentes específicos por domínio/funcionalidade.

- `blog/` (Já existe, manter)
- `home/` (Já existe, manter)
- `mentoria/` (Já existe, manter)
- `services/` (Já existe, manter)
- `speaking/` (Já existe, manter)
- `stream/` (Já existe, manter)
- `work/` (Já existe, manter)
- `guestbook/` (Já existe, manter)

## 5. `utils/` (Utilitários)

Componentes técnicos, SEO e scripts.

- `SEOHead.astro` (Mover para `utils/head/`)
- `BasicScripts.astro`
- `SiteMapTree.astro`
- `FileTreeItem.astro`
- `utils/` (Pasta existente, manter conteúdo como `BackToTop`, `SkipLink`, etc.)

## Ações Necessárias

1. Criar as novas pastas (`ui`, `common`, `features`).
2. Mover os arquivos para seus respectivos destinos.
3. Atualizar todas as importações nos arquivos `.astro` e `.mdx`.

Você gostaria que eu começasse a executar essa reorganização? Posso fazer por partes (ex: começar por `layout` e `ui`).
