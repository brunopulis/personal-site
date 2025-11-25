---
title: "[EN] Muito bacana a sua abordagem com seletores CSS, inclusive eu uso de forma parecida, gosto muito de…"
excerpt: "[EN] Só uma pequena contribuição, se possível tente evitar seletores de CSS complexos, eles possuem alguns pontos negativos."
publishDate:
  - "2021-03-30T18:46:27.128Z"
draft:
  - "false"
isFeatured:
  - "false"
category:
  - "blog"
canonicalUrl: "https://medium.com/@brunopulis/muito-bacana-a-sua-abordagem-com-seletores-css-inclusive-eu-uso-de-forma-parecida-gosto-muito-de-d319091e26a9"
---

> **Translation Note**: This is a placeholder for the English translation of the Portuguese article.
> Original article: [Muito bacana a sua abordagem com seletores CSS, inclusive eu uso de forma parecida, gosto muito de…](https://medium.com/@brunopulis/muito-bacana-a-sua-abordagem-com-seletores-css-inclusive-eu-uso-de-forma-parecida-gosto-muito-de-d319091e26a9)


Muito bacana a sua abordagem com seletores CSS, inclusive eu uso de forma parecida, gosto muito de usar data-attributes ou seletores atômicos. Eles fazem mais sentido e são mais simples de manipular.

Só uma pequena contribuição, se possível tente evitar seletores de CSS complexos, eles possuem alguns pontos negativos.

Um exemplo de seletor complexo:

#favorites .animals > li:nth-child(3)

Pontos negativos nesse tipo de abordagem:

\- CSS demora para renderizar as informações;

\- Complexidade talvez desnecessária (depende muito do contexto);

\- Seletores não atômicos podem ser um grande problema, caso o desenvolver altere um class ou ID.

O CSS lê as informações da direita para esquerda, isso acontece na etapa do CSSOM (que seria a construção da interpretação do CSS no browser).

Num exemplo hipotético se fosse uma lista não ordenada com mais de 100 itens dentro dela, ele iria percorrer esse seletor diversas vezes.

Esse tópico chama especificidade de CSS existe essa calculadora que podemos usar para calcular ele [https://specificity.keegan.st/](https://specificity.keegan.st/)

A dica de ouro é: evite usar seletores css complexos, pois demoram para o DOM calculá-los. Se possível usar um data-attribute no elemento que você precisa de manipular seja a saída.