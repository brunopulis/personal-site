---
title: 5 motivos para testar acessibilidade com leitor de telas
image: ''
imageAlt: ''
publishDate: 2022-04-04
draft: false
category: 'Acessibilidade'
---

Testar acessibilidade é quase uma arte, ela encontra-se nos detalhes. Alguns comportamentos são reconhecidos somente com muita prática e experiência.

Os leitores de telas, de modo geral, tem comportamentos padrões para determinados componentes e as pessoas que os utilizam identificam de forma natural.

Neste artigo irei mostrar 5 motivos para testar com um leitor de telas. Vamos lá?

## O que são leitores de telas?

![Notebook preto em cima de uma mesa branca. Sua tela está desfocada e existe uma linha braille acopla para o uso da tecnologia assistiva](images/screen-reader.png)

Foto por [Elizabeth Woolner](https://unsplash.com/es/@elizabeth_woolner?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) em [Unsplash](https://unsplash.com/s/photos/blind?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

Bom, se você nunca ouviu falar sobre leitores de telas eles são softwares construídos para auxiliar pessoas com deficiência visual para utilizar um computador/smartphone e navegar na web.

Sua função básica é converter a informação, através de um API que lê a estrutura do HTML e converte o texto em aúdio.

Existem diversos leitores de telas no mercado, podemos citar alguns:

- NVDA;
- Jaws;
- Talkback;
- VoiceOver.

Tendo em vista que, definimos o que são os leitores de tela irei apresentar para vocês, os **5 motivos para testar acessibilidade com leitor de telas**.

**Se você gostou do meu conteúdo e quer receber em primeira mão, assine a [minha newsletter](https://brunopulis.ck.page).**

## Prevenção de bugs

![Uma joaninha com seu corpo vermelho e pintinhas pretas, ela está em cima de uma folha verde. Ao fundo a vegetação da floresta está desfocada.   A joianinha é usada para representar os bugs que encontramos nas aplicações](images/bug.png)

Foto por Neringa Hunnefeld

Pode parecer óbvio, entretanto, uma interface impecável visualmente, pode conter erros grotescos de acessibilidade.

Na grande maioria das vezes, esses bugs são erros de marcação HTML que poderiam ser evitados.

Um exemplo banal são botões sem rótulo. Por padrão, todo elemento HTML deve ser **usado para seu propósito**.

Cada elemento possuí duas informações extremamente importantes: **rótulo** e **semântica** adequada.

No exemplo a seguir, temos um botão que representa a ação de fechar, porém, ele não está rotulado corretamente.

```html
<button>X</button>
```

Dessa forma, compromete drasticamente a experiência de quem usa leitor de telas. O leitor iria verbalizar algo como: **botão X**.

> Mas afinal o que seria o botão X?

Além disso, esse inocente botão fere as diretrizes da WCAG 2.1:

- [1.3.1 – Informações e Relações \[A\]](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships);
- [2.5.3 – Rótulo no Nome acessível \[A\]](https://www.w3.org/WAI/WCAG21/Understanding/label-in-name);

A **1.3.1** nos diz:

> A organização estrutural de uma tela deve ser construída de forma que sua arquitetura de informação **faça sentido tanto para quem vê, quanto para quem ouve** o conteúdo.

A **2.5.3** nos diz:

> Rótulos em botões, ícones acionáveis ou qualquer controle interativo, devem ter uma descrição significativa tanto para quem vê, quanto para quem apenas ouve a informação.

Fica nítido que o descumprimento de uma diretriz afeta a outra proporcionalmente.

### Como resolvemos?

Uma das possíveis soluções é adicionar um atributo da WAI-ARIA o **aria-label**, dessa forma o leitor de tela receberá o _feedback_ apropriado.

O exemplo a seguir adotamos a técnica com o uso do _aria-label_:

```html
<button aria-label="Fechar">X</button>
```

## Cobrir áreas não mapeadas

É bem comum desenvolvermos um componente é esquecermos algumas ações, como, por exemplo:

- teclas de atalho para acionar o componente;
- navegação via teclado;
- ordem de foco.

Esses itens diversas vezes são ignorados pelos desenvolvedores, costumo chamar isso de programação orientada a mouse. Com isso, precisamos de “descobrir” certos comportamentos.

![](images/discorevy.png)

Foto por [Dariusz Sankowski](https://unsplash.com/@dariuszsankowski?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) em [Unsplash](https://unsplash.com/s/photos/map-unknow?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

Dessa forma, pessoas que utilizam somente o teclado ficam extremamente prejudicadas e ignoradas.

> Dica: sempre pense na possibilidade de navegar somente via teclado. Afinal, quando utilizamos um smartphone, usamos somente o teclado.

## HTML semântico

![Trecho de código HTML com um fundo preta e letras coloridas](images/code.jpg)

O leitor de telas é amigo íntimo do HTML, como um fiel amigo ele informa **exatamente** como foi escrito.

É de extrema importância desenvolvedores escreverem um HTML decente. Já cansei de realizar testes e identificar um problema: a grande maioria dos desenvolvedores **ignoram uma escrita correta de HTML**.

> Como podemos construir uma casa sem um bom fundamento? O primeiro temporal leva nosso esforço aos ares.

Estude HTML semântico, caso você tenha dúvidas [entre em contato comigo](mailto:contato@brunopulis.com).

## Feedback em tempo real

![](images/feedback.png)

Foto por [Claudio Schwarz](https://unsplash.com/@purzlbaum?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) em [Unsplash](https://unsplash.com/s/photos/rating?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

Usando leitores de telas para testes de acessibilidade, eu aprendi uma coisa:

> De feedback ao usuário o mais rápido possível.

Imagina a seguinte situação, um formulário para aplicar em uma vaga de emprego. Esse formulário possuí 20 campos que não informam em tempo de preenchimento se os dados estão corretos.

Somente no momento do envio e também não possui mensagens claras dos erros. Uma pessoa que usa um leitor de telas provavelmente vai tentar novamente ou desistir da candidatura.

### Possibilidades

Dar o feedback enquanto as informações são preenchidas é uma excelente prática. Mensagens contextuais e concisas auxiliam bastante.

Existem técnicas que podemos usamos em alguns casos, como o atributo **aria-live**.

## A experiência do usuário final

![](images/ux.png)

Foto por [Amélie Mourichon](https://unsplash.com/@amayli?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) em [Unsplash](https://unsplash.com/s/photos/ux-design?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

A acessibilidade está intimamente ligada com a experiência de uso das pessoas. Escrever um HTML semântico e adotar boas práticas de desenvolvimento podem contribuir muito para usuários de leitor de telas.

Usando leitores de telas para testes de acessibilidade, conseguimos captar a experiência dos usuário, assim, podemos corrigir de forma preventiva possíveis problemas.

## Conclusão

Recomendo fortemente você desenvolvedor, enquanto estiver fazendo suas interfaces use algum leitor de telas para identificar possíveis problemas.

Dessa forma, você irá “sentir na pele” como é uma navegação com tecnologia assistiva. E isso pode contribuir significamente em sua carreira.

Com esses conhecimentos, poderá explorar novos horizontes e quem sabe se tornar um especialista em desenvolvimento acessível.

Tudo depende de você e como diria o Tio Ben:

> **Com grandes poderes, vem grandes responsabilidades**
