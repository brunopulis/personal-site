---
title: "3 ferramentas para avaliar a acessibilidade web"
excerpt: "Neste post bem rapidinho vou mostrar alguns avaliadores automáticos para testar as recomendações da WCAG em suas app’s ou websites."
pubDate: 2017-10-02T23:53:59.488Z
tags: ['a11y']
canonicalUrl: "https://medium.com/@brunopulis/3-ferramentas-para-avaliar-a-acessibilidade-web-41fa8091e42b"
---

### 3 ferramentas para avaliar a acessibilidade web

![](https://cdn-images-1.medium.com/max/800/1*uxKQX-CrtJaRQ9dlctw7YA.jpeg)

Neste post bem rapidinho vou mostrar alguns avaliadores automáticos para testar as recomendações da WCAG em suas app’s ou websites.

Os avaliadores de acessibilidade, tem como função, testar de forma automática a estrutura do seu código para checar se atende as conformidades dos webstandards propostos pela W3C. Estes validadores não testam a semântica, isto é, testam a síntaxe do seu código.

Vou mostrar três validadores que utilizo com maior frequencia, num próximo post eu ensino a como **corrigir os erros apontados**

### WAVE

Foi desenvolvido pela WebAIM em 2001, com o intuito de auxiliar nos testes de acessibilidade. Este vídeo demonstra o funcionamento dele e o tipo de relatório que ele gera.

[YouTube Video](https://www.youtube.com/embed/uNFwj0_78hE?feature=oembed)

### Access Monitor

Desenvolvido em 2009 pela Fundação para a Ciência e a Tecnologia (FCP), atualmente é o que eu mais tenho utilizado, ele gera um relatório bastante simples e com _tips_ para corrigir os bug’s. Permite testar com as duas versões da WCAG a 1.0 e 2.0, recomendo usar a mais atual 2.0 para realizar os testes. Além de dar uma pontuação para o site de **0 a 10** no quesito de acessibilidade.

### Tota11y

O Tota11y é para mim um dos melhores se você quer algo rápido e não muito técnico. Ele é um bookmarklet para ser salvo na sua barra de favoritos.

Ele tem as seguintes opções para verificação:

-   **Heading’s**: permite visualizar a estrutura dos heading’s da página demarcando as areas de forma visual;
-   **Contraste**: exibe se os elementos possuem contraste e se estão com baixo contraste e ainda dá uma sugestão de um bom contraste;
-   **Label’s**: exibe as label’s dos formulários e acusa aonde não existe as mesmas;
-   **Images alt text**: exibe o alt das imagens;
-   **Landmark’s**: mostra as landmark’s da WAI-ARIA.

Meu conselho é: testem e testem essa ferramentas e deixe suas experiências nos comentários.