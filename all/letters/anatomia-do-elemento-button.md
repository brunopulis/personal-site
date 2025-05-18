---
title: "Anatomia do elemento button"
date: "2024-01-29"
---

Nessa carta quero te mostrar como garantir a acessibilidade em um dos componentes mais usados na web: o **<button>**.

Vamos ao que interessa.

## **Anatomia do componente**

O botão é um _widget_ que permite os usuários realizarem uma **ação** ou **evento**, como por exemplo:

- Enviar um formulário;

- Abrir uma modal;

- Cancelar uma ação.

Além do botão comum, a WAI ARIA 2 dá suporte a outros tipos:

1. Botão de alternância _(toggle button);_

3. Botão de menu.

## **Botão de alternância (toggle button)**

Um botão que recebe dois estados que pode ser **desligado** (não pressionado) ou **ligado** (pressionado).

Para as tecnologias assistivas identificarem seu estado, deve-se usar o atributo [aria-pressed](https://w3c.github.io/aria/#aria-pressed).

Por exemplo, um botão rotulado (texto do botão) como **Mute** em um player de áudio pode indicar que o som está silenciado, definindo o estado pressionado **true**.

```markup
<!-- Botão não pressionado --> 
<button aria-pressed="false">Desligar som</button> 

<!-- Botão pressionado --> 
<button aria-pressed="true">Desligar som</button>
```

> **Importante: é fundamental que o rótulo em uma alternância não mude quando seu estado muda. Neste exemplo, quando o estado pressionado é verdadeiro, o rótulo permanece como Desligar som.**

## **Botão de menu**

Conforme descrito no [padrão do botão do menu](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/), um botão é revelado para tecnologias assistivas como um botão de menu se tiver a propriedade [aria-haspopup](https://w3c.github.io/aria/#aria-haspopup) definido para qualquer um **menu** ou **true**.

Geralmente esse tipo de botão é usado em editores WYSWYG.

**Por que isso importa?** 

Existe uma confusão na web, muitos não sabem quando usar um `button` e um `a`. Suas funções são diferentes e sua aparência e papel, devem permanecer com à função que fornecem.

Esse [artigo da Marcy Sutton](https://css-tricks.com/buttons-vs-links/), esclarece essa confusão.

## **Interação com teclado**

Existem duas formas de ativar um <button> via teclado, através das tecla:

- Space;

- Enter.

Ambas, ativam o botão. Depois de ativado, o foco é definido dependendo do contexto.

Por exemplo:

- Um botão que abre uma modal, quando clicado o foco deve ir para dentro da modal;

- Um botão de Fechar de uma modal quando pressionado, deve ser direcionado ao botão que originou a ação.

## **Considerações sobre WAI-ARIA, roles, states e properties**

- O botão deve ter a _**role=button,**_ por padrão o elemento <button> vem com ela implícita não precisa de inserir;

- O botão deve ter um rótulo acessível. Por padrão, o nome acessível é o conteúdo de texto dentro do elemento do botão;

- Se o botão é um botão de alternância, deve conter um aria-pressed. Quando ativado, o valor do estado é **true**, desativado: false.

## **Novidade no ar 👀**

Estou pensando em abrir algumas vagas para **mentorias individuais** sobre acessibilidade digital.

Ainda não defini quantos mentorandos serão, mas a ideia é ajudar você a evoluir em assuntos que não sabe ou tem muita dificuldade.

Se fez sentido para você, entre em contato comigo.

## **Para se aprofundar**

- [Exemplos de Botões](https://www.w3.org/WAI/ARIA/apg/patterns/button/examples/button/);

- [Exemplos de botões (IDL)](https://www.w3.org/WAI/ARIA/apg/patterns/button/examples/button_idl/).

Soli Deo Gloria, Bruno Pulis
