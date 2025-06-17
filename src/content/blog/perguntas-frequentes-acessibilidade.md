---
title: 11 Perguntas frequentes sobre acessibilidade
publishDate: 2023-11-22
metadata:
  categories:
    - Acessibilidade
  url: https://brunopulis.com/perguntas-frequentes-acessibilidade/
tags:
  - acessibilidade
---
Acessibilidade é um tema em alta, por isso, traduzi as perguntas frequentes sobre acessibilidade.

Ele vai te ajudar em questionamentos básicos e clarear sua trajetória nesse universo de possibilidades.

Esse artigo é uma tradução livre com permissão do autor. O artigo original encontra-se em [Answers to common (web) accessibility questions](https://hidde.blog/a11y-faq/).

Inspirado nas respostas de Chris Coyer às [perguntas comuns sobre design (web)](https://chriscoyier.net/2023/10/31/answers-to-common-web-design-questions/), que por sua vez foram inspiradas [no post anterior de Dan Mall](https://chriscoyier.net/2023/10/02/dan-mall-answers-to-common-design-questions/), aqui está uma lista de perguntas comuns sobre acessibilidade.

## 1\. Devo usar links ou botões?

‘**Sim.**

Usamos links quando queremos **levar o usuário a algum lugar**, botões quando **queremos que ele realize alguma ação**.

1)Também usamos botões se a ação for enviar um formulário (mesmo se o usuário for redirecionado a algum lugar depois). Tentando evitar nuances neste post, [mas aqui estão algumas nuances sobre botões e links](https://github.com/alphagov/govuk_elements/pull/272).

## 2\. Temos usuários com deficiência?

**Sim.**

_É improvável que você conheça cada um de seus usuários e exatamente como eles usam a web. É ainda mais improvável que o grupo e as pessoas dentro dele permaneçam exatamente da mesma forma para sempre._

## 3\. O que é uma auditoria de conformidade de acessibilidade?

Alguém verificará se o seu site atende [a cada um dos 56 Critérios de Sucesso no WCAG](https://www.w3.org/TR/WCAG22/#non-text-content) (contando a versão 2.2, níveis A e AA) ou não.

Escrevi um [artigo falando sobre os novos critérios](https://brunopulis.com/wcag-2-2/) e seu uso.

Idealmente, eles também explicam quais são os problemas e como resolvê-los (para que você possa fazer isso). Isso também é [chamado de avaliação de conformidade](https://www.w3.org/WAI/test-evaluate/conformance/).

## 4\. Quem deve “fazer” acessibilidade em nosso time?

Todos. _Copywriters_, desenvolvedores, designers e gerentes de produtos têm tarefas de acessibilidade a fazer.

## 5\. Quais são alguns testes rápidos que posso fazer?

Use sua interface com as teclas Tab/ Shift Tab no teclado ([verifique as configurações se estiver usando um Mac](https://www.a11yproject.com/posts/macos-browser-keyboard-navigation/)), você consegue acessar tudo sem um mouse? A ordem faz sentido?

Clique em rótulos para campos de formulário, eles devem focar no campo ao qual pertencem.

Verifique se seus vídeos e áudios (podcasts?) têm legendas/transcrições.

## 6\. A acessibilidade já foi implementada?

Não. É um processo contínuo, mesmo que sua auditoria diga que você atende a todos os Critérios de Sucesso hoje, é comum deixar de atendê-los depois.

Os sites mudam. Você deve monitorar continuamente a acessibilidade, assim como faz com segurança e privacidade.

## 7\. Temos obrigações legais para tornar nossos produtos acessíveis?

Muito provavelmente. Mesmo se você não for um órgão governamental (por exemplo, consulte a [Lei de Acessibilidade Europeia](https://business.gov.nl/amendment/european-accessibility-act-products-services/)).

Existem [políticas e leis em todo o mundo](https://www.lflegal.com/global-law-and-policy/).

No Brasil, temos a [Lei Brasileira de Inclusão](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13146.htm).

## 8\. É tudo culpa do meu site?

Não, alguns problemas [podem ser resolvidos pelos navegadores](https://talks.hiddedevries.nl/IEwNvG/could-browsers-fix-more-accessibility-problems-automatically), tecnologias assistivas e/ou [ferramentas de autoria](https://talks.hiddedevries.nl/tGzZs2/your-cms-is-an-accessibility-assistant), como, por exemplo, um CMS.

## 9\. WCAG 3.0 será lançado em breve, certo?

Pouco provável. Os objetivos são bons e eu os apoio há muito tempo (ainda apoio), mas levará muitos anos para que isso se torne realidade.

A **WCAG 3.0 continua em uma fase muito inicia**l. O algoritmo de cores que está sendo considerado é interessante para tentar atender desde já, pois atende melhor às necessidades do usuário do que o algoritmo atual do WCAG.

## 10\. A “IA” melhorará a acessibilidade?

A aprendizagem de máquina ou _Machine Learning_, pode ser uma ótima ferramenta para automatizar parte do processo de legendagem em muitos idiomas, e várias outras coisas.

Mas é improvável que as _Large Language Models_ ou **LLMs,** frequentemente chamadas de “IA”, gerem código acessível.

Para treinar uma LLM assim, seria necessário um conjunto enorme de código muito acessível (o que não existe).

A construção de componentes e a semântica de acessibilidade **também exigem intencionalidade**, que esses sistemas especificamente não são bons em fazer.

## 11\. O score do Axe ou Page Insights é tudo o que importa para o meu site? Ou o resultado da auditoria WCAG?

Não. Qualquer sistema que pontue seu site e retorne um número (incluindo auditorias WCAG) não descreve completamente sua situação de acessibilidade.

A acessibilidade é, em última análise, **sobre pessoas** e se elas podem usar seu site. Trata-se de reconhecer e remover barreiras.

As métricas podem ajudar de várias maneiras, **mas não são o objetivo final**. E o mais facilmente mensurável nem sempre é o mais impactante.

Postagens de acessibilidade mais detalhadas podem ser encontradas em outros lugares no [blog do Hidde](https://hidde.blog/blog).