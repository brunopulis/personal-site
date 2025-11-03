---
issue: "05"
title: "Como usar atributos ARIA sem passar vergonha"
date: "2023-12-18"
---

Essa é a última carta sobre acessibilidade do ano de 2023. Vamos retornar em Janeiro, com muita informação útil e novidades.

Nessa carta vou te ensinar como usar atributos ARIA's sem passar vergonha.

É sério, muitas pessoas usam e nem sabem o por quê.

Semana passada estava testando uma tela, nela existiam três cards simples. Cada um tinha um título, um texto e um link que direcionava o usuário para outra tela.

Porém, ao conferir o HTML escrito, estava assim:

```html
<a href="#" role="button">Consultar</a>
```

**_O que está errado nessa linha de HTML? Se você souber responda esse e-mail._** 

## **Explicando**

Toda vez que usamos algum dos três  atributos ARIA, *role, states e properties* **alteramos a semântica do elemento HTML**.

Guarda essa informação: **alteramos a semântica do elemento.**

Ao inserir o atributo **role="button",** eu forço o elemento **<a>** a se comportar como um botão.

O link entra em uma crise existencial, e começa a se perguntar: eu sou um link ou um botão? 😂

Para resolver esse problema, devemos ter em mente as 5 regras de uso dos atributos ARIA. Elas são:

1. Use sempre que possível recursos nativos do HTML 5.1;

2. **Não altere a semântica nativa, a menos que você realmente precise;**

3. Todos os controles ARIA devem ser interativos via teclado;

4. Não use em um elemento **focalizável**, como links e campos de formulários os atributos `role="presentation" e` `aria-hidden="true"`;

5. Todos os elementos interativos, como links, botões, campos de formulários, devem ter um **nome acessível.**

Em nosso exemplo, a segunda regra é violada, pois, o elemento **<a>** não necessita de mudar sua semântica.

Nosso objetivo era direcionar o usuário para uma outra tela, ou seja, deve se comportar como um link.

Uma curiosidade, se navegasse com o NVDA, com a tecla de atalho "B" para percorrer todos os botões da tela, ele iria identificar esse link como um botão.

Perceba, o elemento foi remapeado. Isso acontece devido o atributo role.

Uma pessoa cega navegando nesse "link/botão" vai jurar de pé junto que é um botão, percebe a confusão semântica que você se enfiou? 😅

Resumindo:

- Precisa de promover a navegação entre telas? use link;

- Precisa de ações específicas na tela? use botão.

Se você ficou curioso como isso tudo funciona, recomendo [consultar a documentação oficial](https://www.w3.org/TR/wai-aria/#introduction) (em inglês).

Você já passou por algo parecido? Adoraria saber suas dificuldades nesse assunto.
