---
title: 'WordPress vs. Eleventy: Qual é a melhor opção para o seu blog?'
publishDate: 2022-02-02
category: 'Frontend'
url: https://brunopulis.com/migrando-para-o-eleventy/
tags:
  - desenvolvimento-web
---

Um ano novo começou e seguimos o velho mantra de todos os anos, aquele famoso ditado popular:

> Ano novo, vida nova.

Nesse artigo, irei contar para vocês algumas mudanças que fiz no meu site.

Se você me acompanha há um tempo percebeu que o layout mudou, não é mesmo?

Além da parte visual, algumas coisas na arquitetura também foram modificadas. Então, vem comigo que vou detalhar todo o processo.

## Início de tudo

Em meados de 2017, decidi criar um blog para escrever sobre diversos assuntos, ainda não tinha uma linha editorial definida. Na maior parte do tempo, utilizei o WordPress hospedado em um domínio próprio.

Dessa forma, eu tinha controle do código de ponta a ponta, a stack que utilizei por muito tempo foi:

- WordPress;
- MySQL;
- Hospedagem compartilhada;
- FTP 🤣

Nunca tive problemas com essa _stack_, porém, em 2022 queria algo mais minimalista.

Comecei a perceber que estava com certas burocracias no WordPress, as quais impediam de ser mais criativo e produtivo com o conteúdo.

## Escolhendo a stack

Existem várias tecnologias as quais ficamos pensando “**um dia vou experimentar** “, o meu namoro com a **Jamstack** durou muito tempo. Entretanto, esse ano decidi usar.

### O que é a JamStack?

Segundo o próprio site da [JamStack](https://jamstack.org),é:

> Uma arquitetura projetada para tornar a Web **mais rápida**, **mais segura** e **mais fácil** de dimensionar. Se baseia em muitas das ferramentas e fluxos de trabalho que os desenvolvedores adoram e que trazem o máximo de produtividade.

Existem diversas vantagens ao utilizar essa arquitetura, dentre elas, podemos destacar:

- segurança;
- escalabilidade;
- performance;
- manutenbilidade;
- portabilidade;
- experiência de desenvolvimento (DX).

## Pontos positivos

A experiência de usar a stack é bem agradável, o desenvolvedor se sente confortável, no meu caso, senti bem mais produtivo.

Além disso, o nível de controle de código é total, facilitando assim a sua privacidade.

### Tecnologias utilizadas

Para realizar essa transição escolhi três tecnologias que contribuíram bastante:

- [Eleventy](https://www.11ty.dev/);
- [Netlify](https://www.netlify.com/);
- [Github](http://github.com/).

#### Eleventy

É um gerador de sites estáticos bastante famoso, open source e prioriza a privacidade dos dados, onde alguns projetos de empresas de renome utilizam.

Podemos destacar:

- [Chrome Dev Summit](https://developer.chrome.com/devsummit/);
- [A11y Project](https://www.a11yproject.com/);
- [CSS Tricks](https://css-tricks.com/);
- [ESlint](https://eslint.org/);
- [Google V8](https://v8.dev/);
- [web.dev](https://web.dev/).

Sua flexibilidade e praticidade me impressionaram, me lembrou bastante o Jekyll que é escrito em Ruby.

#### Netlify

O [Netlify](https://www.netlify.com/) utilizo como ferramenta de deploy, com ele conseguimos subir um site estático em questão de segundos.

Além disso, conta com diversas ferramentas que valem muito a pena experimentar.

#### GitHub

Na minha stack utilizo o GitHub como uma “hospedagem” tradicional.

Tenho controle total do código e posso criar **Actions** para automatizar diversas tarefas que posso julgar necessárias.

## Privacidade

Depois do escândalo da Cambridge Analytica, comecei a prestar mais atenção na questão de privacidade.

Minha meta é cada vez utilizar menos o Google e suas ferramentas, existe até um [tutorial passo a passo de como fazer isso](https://impossiblehq.com/complete-guide-leaving-google/).

Pensando nesse sentido, resolvi testar o [Plausible Analytics](https://plausible.io/), um serviço de Analytics para sites com a promessa de não perseguir os usuários com propagandas e coletar dados.

Aproveitando o gancho, troquei de serviço de newsletter também, estou experimentando o [Buttondown Email](https://buttondown.email/).

Bom, acredito que isso seja tudo (por enquanto) novas modificações serão comentadas posteriormente.

Algo que almejo é experimentar o uso de WebMentions, porém, isso é assunto para um próximo post.

Até lá,
Pulis.
