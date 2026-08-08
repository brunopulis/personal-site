---
layout: page
permalink: '/colophon/'
title: Colophon
---

Uma breve página sobre a criação deste site.

## Como este site é construído

Este site é construído com [Eleventy](https://www.11ty.dev/), um excelente gerador de sites estáticos que prioriza velocidade e simplicidade.

O domínio brunopulis.com está registrado na Godaddy e hospedado na Vercel, com HTTPS automático via _Let’s Encrypt_.

O CSS foi desenvolvido sob medida, sem frameworks, priorizando desempenho e facilidade de manutenção. A identidade visual é a *prova tipográfica*: tinta sobre papel, com o vinho da marca — o único acento — reservado para marcar estrutura (os traços que antecedem títulos de seção e o sublinhado de foco no índice), em vez de decorar palavras. A paleta segue o guia de marca: cinza-claro `#d9d9d9`, preto `#171e1e` e vinho `#610404` (coral no modo escuro).

A fonte primária é a *Source Sans 3*, escolhida pela alta legibilidade em ambientes digitais e pelo traço limpo e moderno, usada em títulos, textos e interfaces. A secundária é a *Noto Serif*, que empresta um toque editorial de formalidade e acolhimento às citações. Ambas são auto-hospedadas em WOFF2 (subset latin), eliminando dependências externas e melhorando o desempenho de carregamento.

O site utiliza o conjunto de cursores "Tomatic", criado por JefTriforce e disponível no RW-Designer. Esses cursores, com visual arredondado e traços mais grossos, estão licenciados sob a licença Creative Commons - Atribuição + Não Comercial.

Os rascunhos são geralmente escritos primeiro como arquivos Markdown no 750 Words, uma prática que mantenho desde setembro de 2011. Em outras ocasiões, escrevo no Bear para fazer anotações e registrar ideias.

O conteúdo é então transferido para o repositório Git local no GitHub, com as alterações salvas utilizando o Git. Desenvolvimento e formatação realizados no Sublime Text 4.

## Stack tecnológica do brunopulis.com

- Gerador de sites estáticos: Eleventy (11ty) v3.1.5
- Motor de templates: Nunjucks para layouts e parciais
- Markdown: Conteúdo escrito em Markdown com _front matter_ em YAML
- Estilização: CSS personalizado (identidade *prova tipográfica* — paleta da marca: cinza-claro, preto e vinho) sem dependências de frameworks
- Busca: Pagefind para busca estática no lado do cliente (_client-side_)
- Realce de sintaxe: @11ty/eleventy-plugin-syntaxhighlight
- Feeds RSS/JSON: @11ty/eleventy-plugin-rss para feeds RSS/Atom/JSON
- Renderização matemática: @vscode/markdown-it-katex para equações LaTeX
- Suporte a emojis: markdown-it-emoji para _shortcodes_ de emojis
- Notas de rodapé: markdown-it-footnote para notas de rodapé padrão Markdown
- Diagramas: Mermaid.js para fluxogramas e diagramas
- Botão de curtida: iine para rastreamento de engajamento nas postagens
- Hospedagem: Vercel com implantação contínua (_continuous deployment_)
- Segurança de DNS: Servidores de nomes (nameservers) da Deflect.ca para proteção contra DDoS
- Controle de versão: Git + GitHub

## Segurança Digital e Resiliência

Este site utiliza a Deflect.ca para gerenciamento de DNS e proteção contra DDoS. A Deflect é uma empresa social canadense da eQualitie que fornece serviços gratuitos de mitigação de DDoS e segurança de sites para organizações da sociedade civil, mídia independente e grupos de direitos humanos em todo o mundo. Fundada em 2011, a Deflect protege organizações que enfrentam ameaças digitais e censura, apoiando aproximadamente 2% da população global da internet anualmente. Seu trabalho já defendeu sites como o Black Lives Matter, veículos de mídia independentes da Ucrânia e inúmeras organizações de direitos humanos contra ataques cibernéticos.
Recursos Avançados de Markdown

O site suporta recursos estendidos de Markdown para a criação de conteúdo rico:

Expressões matemáticas via KaTeX (delimitadores `$` em linha e `$$` em bloco)
_Shortcodes_ de emojis que são convertidos automaticamente em caracteres de emoji
Notas de rodapé padrão Markdown com estilização adequada e _backlinks_
Diagramas Mermaid para representações visuais de processos e relacionamentos
Classes CSS personalizadas para componentes estilizados (alertas, botões, utilitários de cores)

Esses recursos possibilitam a escrita técnica, a produção de conteúdo acadêmico e uma formatação expressiva, mantendo a simplicidade da criação de conteúdo em texto simples. Consulte o guia de estilo para uma demonstração completa de todos os recursos de Markdown. Recursos IndieWeb

Este site segue os princípios da IndieWeb:

Microformats2: Marcação adequada de h-card, h-entry e h-feed para conteúdo legível por máquinas
Webmentions: Configurado com webmention.io para receber interações
POSSE: Publicar (Site Próprio, Distribuir em Outros Lugares) – o conteúdo canônico reside aqui primeiro
IndieAuth: Mais de 20 links de verificação `rel-me` estabelecendo identidade em toda a web
WebSub: Links de hub e _self_ configurados para notificações _push_ instantâneas de feed aos assinantes
Feeds RSS/Atom/JSON: Múltiplos formatos de feed em `/feed.xml` e `/feed.json`
HTML Semântico: Marcos (_landmarks_), rótulos ARIA e recursos de acessibilidade adequados

Todos os 9 componentes fundamentais da IndieWeb foram implementados, conforme verificado por uma ferramenta de validação IndieWeb.
Princípios

Texto simples perdura. Markdown + git mantêm o trabalho portátil e preparado para o futuro.
Desempenho importa. Enviar menos dados é uma forma de respeito. Meta: pontuação acima de 95 no Lighthouse.
Acessibilidade é inegociável. Sites feitos para pessoas, não para telas. Conformidade com WCAG 2.1 AA.
Aprimoramento progressivo. Comece com o que funciona em toda parte e aprimore a partir daí.
Seja dono dos seus dados. Conteúdo canônico no meu domínio, distribuído em outros lugares conforme desejado.
Construa de forma aberta. Código-fonte disponível no GitHub e documentado para que outros possam aprender.

## Estatísticas Atuais do Site

- Tempo de construção: ~4,6 segundos (incluindo indexação de busca)
- Páginas geradas: 425
- Posts no blog: Mais de 185 e aumentando
- Páginas estáticas: Mais de 45
- Páginas de tags: Mais de 80 com h-feed
