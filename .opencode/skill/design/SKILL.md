---
name: design
description: Use ao criar ou modificar qualquer interface ou visual deste site — tokens, cores, tipografia, layout, homepage (index.njk), blocos _home.scss, tema. Carrega a identidade visual do site e as regras de design antes de mexer em UI.
---

# Design — identidade do site

A fonte de verdade da marca é o **guia de marca** em `docs/design.md`
(essência, pilares, paleta, tipografia, tom de voz). Este site a implementa
com a direção de arte **"a prova tipográfica"**: tinta sobre papel, com o vinho
da marca — o único acento — reservado para marcar estrutura (o traço `——` que
antecede títulos de seção e o sublinhado de hover/foco no índice), em vez de
decorar palavras. Antes de qualquer mudança de UI, leia `docs/design.md` e esta
skill.

## Cores — paleta da marca implementada (light / dark)

| Token | Light | Dark | Papel |
|---|---|---|---|
| paper | `#d9d9d9` (cinza) | `#171e1e` (preto) | fundo/linho |
| paper-raised | `#e3e3e1` | `#222626` | superfícies |
| ink | `#171e1e` (preto) | `#d9d9d9` (cinza) | texto |
| ink-soft | `#565c5c` | `#a9aead` | texto secundário (AA) |
| proof | `#610404` (vinho) | `#ff8f7e` (coral) | o único acento |
| proof-soft | `#e9d8d5` | `#2c0000` (maroon) | tintas de vinho |
| rule | `#b9bcb2` | `#353a3a` | hairlines |

A paleta da marca também define **preto** `#171e1e`, **vinho** `#610404`,
**maroon** `#2c0000`, **cinza** `#d9d9d9`, **periwinkle** `#849cdb` e os
**coral/amarelo** como apoio moderado (o coral vira o acento no dark).
Paletas legadas (blood-red, vista-blue, errie-black, light-silver) **não
remova** — páginas antigas as usam direto. `#849cdb` (periwinkle) fica
disponível como fundo alternativo; ainda não há componente usando.

## Tipografia (sistema de duas famílias)

- **Source Sans 3** (primária) → `--font-base` e `--font-display`: corpo,
  títulos, UI, dados, meta, kbd. Legibilidade digital, traço limpo.
- **Noto Serif** (secundária) → `--font-accent`: **apenas** blockquotes — a voz
  editorial/impressa.
- Pesos 400, 400 itálico, 700; woff2 auto-hospedados em `src/assets/fonts/`.
- **Não existe fonte mono no sistema.** Datas, tags, eyebrow, descrições e setas
  ficam em Source Sans.

## Regras de ouro

- Vinho/coral (`proof`) só nas **duas marcas**: traço `——` de título de seção,
  sublinhado de hover/foco no índice.
- Sem cards, sem números de ordem, sem gradientes.
- CSS é **SCSS** (arquitetura cu.css-style: abstracts/compositions/base/blocks/
  utilities) — **nunca** introduza Tailwind ou utilitários de classe.
- Animações só dentro de `prefers-reduced-motion: no-preference`.
- Preserve microformats: `h-feed`, `h-entry`, `p-name`, `u-url`, `dt-published`,
  `p-category`, `p-summary`. Texto real nunca em `aria-hidden`.
- Contraste mínimo AA em texto; as combinações da tabela acima já passam AAA
  (verifique antes de trocar qualquer hex).

## Arquivos-chave

- `src/pages/index.njk` — homepage
- `src/assets/css/blocks/_home.scss` — bloco da homepage
- `src/assets/css/abstracts/_theme.scss`, `_fonts.scss`, `_type.scss` — tokens
- `src/assets/css/base/_global.scss` — base de texto, blockquote, foco
- `docs/design.md` — guia de marca (essência, paleta, tipografia, tom de voz)
