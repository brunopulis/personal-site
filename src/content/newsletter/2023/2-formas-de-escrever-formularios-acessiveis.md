---
issue: '44'
title: '2 formas de escrever formulários acessíveis'
pubDate: '2024-11-28'
---

Fiz um teste essa semana que me deixou puto, uma tela simples com mais de 18 erros de acessibilidade. Fiquei pensando "como uma criatura conseguiu fazer isso".

Era uma landing page 99% linda, mas com aquele 1% de porcaria. 😂

Passada minha revolta, vamos falar sobre um dos elementos mais importantes: **formulários**.

Já pensou como seria a experiência sem eles? Seria bem sem graça.

Infelizmente, essa é uma realidade que muitas pessoas que usam leitores de tela enfrentam. A falta de acessibilidade em formulários é um dos erros mais comuns.

Nesta carta, irei te ensinar algumas formas de deixar seu formulário acessível, vamos aprender:

- Como usar uma `<label>` visível;
- Como usar uma `<label>` invisível;
- Como usar com atributo aria-label;

Vamos lá!

---

## O que são formulários?

Formulários são usados para seu usuário **interagir com seu conteúdo, seja em sites ou aplicativos web.**

Existem diversas situações que eles são importantes, como:

- Login e Registro em redes sociais;

- Inscrição em uma vaga de emprego;

- Compra em um _e-commerce_.

A lista é longa, porém, uma coisa que detesto são formulários grandes. Eles têm a tendência de serem chatos, inacessíveis e sem graça.

Uma boa prática é manter seus formulários, curtos e objetivos e nada de pedir informações desnecessárias.

**Nesse caso, menos é mais.**

## Por que isso é importante?

Formulários podem ser visualmente e cognitivamente complexos e desafiadores de usar. Entretanto, os formulários acessíveis são mais fáceis de usar para todos, incluindo pessoas com deficiência.

Algumas vantagens de escrever formulários acessíveis:

- **Pessoas com deficiências cognitivas** pode entender melhor o formulário e como completá-lo, pois tornar os formulários acessíveis melhoram a estrutura do layout, as instruções e o feedback.
- **Pessoas usando a entrada de fala** pode usar os rótulos por comandos de voz para ativar controles e mover o foco para os campos que eles têm que completar.
- **Pessoas com destreza limitada** beneficie-se de grandes áreas clicáveis que incluem os rótulos, especialmente para controles menores, como botões de opção e caixas de seleção.
- **Pessoas que usam leitores de tela** pode identificar e entender os controles de formulário mais facilmente porque eles estão associados a rótulos, conjuntos de campos e outros elementos estruturais.

## Critérios da WCAG

Além das vantagens citadas acima, formulários acessíveis também cumprem diversos critérios de sucesso.

Esses critérios, permitem seu formulário alcançar todas as pessoas. Usamos os seguintes critérios:

- [**1.3.1** Informações e Relações:](https://www.w3.org/WAI/WCAG21/quickref/#qr-content-structure-separation-programmatic) a informação deve fazer sentido para quem vê ou ouve o conteúdo;
- [**2.4.6** Títulos e Etiquetas:](https://www.w3.org/WAI/WCAG21/quickref/#qr-navigation-mechanisms-descriptive) títulos e rótulos (campos de fomulários) devem ser claros e objetivos;
- [**3.3.2** Etiquetas ou Instruções:](https://www.w3.org/WAI/WCAG21/quickref/#qr-minimize-error-cues) todos os rótulos devem ser claros e sem ambiguidades a finalidade dos campos de formulário.
- [**4.1.2** Nome, Papel, Valor:](https://www.w3.org/WAI/WCAG21/quickref/#qr-ensure-compat-rsv) tecnologias assistivas precisam do **nome, função e valor** para identificar os elementos padronizados do HTML.

## Sua estrutura básica

Um formulário possui uma estrutura básica que é composta, conforme o código abaixo:

```html
<form>
  <input type="text" id="fname" name="fname" /><br />
  <input type="text" id="lname" name="lname" />
</form>
```

Nesse exemplo omiti diversas informações por fins didáticos, mas se marcamos um form dessa forma estaria correto.

## Formulários sem labels

Essa é a pior experiência que alguém pode passar na web, esse exemplo é uma má prática.

O leitor de telas iria, ler algo semelhante à:

<div><custom-youtube @slug="eXn3-yyq0qc" @label="Leitura de um form com o NVDA"></custom-youtube></div>

Isso levantaria uma série de questões, como, por exemplo:

- Como devo preencher?
- Possui algum campo obrigatório?
- Necessita de um formato específico?

São muitas perguntas e zero respostas. Por isso iremos usar as técnicas para deixar seu formulário acessível.

## Como usar uma `<label>` visível

Eu sempre recomendo usar essa técnica, ela é a mais segura e assertiva de todas. O elemento `label` serve identificar o propósito do campo do seu formulário.

Um ponto importante é adicionar o atributo **for** com o mesmo valor do **id** do campo.

> **Por que isso é importante?**
> Isso aumenta a área de clique e fornece um recurso visual e audível para identificar qual **<label>** está associada a um campo.

Usando a label visível, nosso exemplo ficaria:

```html
<form>
  <label for="fname">Nome</label>
  <input type="text" id="fname" name="fname" />
  <label for="lname">Sobrenome</label>
  <input type="text" id="lname" name="lname" />
</form>
```

O leitor de tela iria ler da seguinte forma:

<div><custom-youtube @slug="WSHQEJWotf8" @label="Leitura de um form com o NVDA"></custom-youtube></div>

**Volto a repetir, essa é a técnica mais segura que recomendo.**

Mas, sei que em algumas situações não podemos exibir as <labels>, nesse caso como fazer?

Isso nos leva para a próxima técnica…

## Como usar uma `<label>` invisível

Essa situação acontece geralmente quando o designer pensou na arquitetura da informação sem uma `<label>` visível. Isso é bem comum em designs minimalistas.

Para resolver essa situação você precisa de uma classe CSS que oculta a informação visual, nada de usar placeholder como `<label>`.

> \*\*IMPORTANTE
>
> **O atributo **placeholder é um complemento de informação**, uma dica de preenchimento.**
>
> A `<label>` é o rótulo de identificação dos campos do formulário.\*\*

Essas classes têm o objetivo de ocultar visualmente a `<label>`, porém, ela não perde sua função.

```css
/* Classe para ocultar elementos visualmente */
.sr-only {
  border: 0;
  clip: rect(0 0 0 0);
  position: absolute;
  margin: -1px;
  padding: 0;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
```

Uma alternativa seria:

Aplicando a técnica em nosso exemplo, ficaria:

```html
<form>
  <label class="sr-only" for="fname">Nome</label>
  <input type="text" id="fname" name="fname" />

  <label class="sr-only" for="lname">Sobrenome</label>
  <input type="text" id="lname" name="lname" />
</form>
```

Com a <label> oculta usei o atributo **placeholder** para dar maior contexto de preenchimento.

<div><custom-youtube @slug="dDGLAR6pArU" @label="Leitura de um form com o NVDA"></custom-youtube></div>

## Conclusão

Dessa forma mantive as informações relevantes tanto para quem vê ou ouve. Isso é importante para manter a consistência e feedback.

Seja exibindo ou não suas labels os dois exemplos atendem perfeitamente os critérios de sucesso e auxiliam num preenchimento correto das informações.

Viu como pode ser mais simples do que você imagina?

Me conta, você conhecia essas técnicas?

---

P.S.: Compartilha o trecho que você mais gostou no Instagram e me marque **brunopulis**

P.S2.: continuo com vagas abertas na [**Mentoria Acessibilidade Já**](https://mentoria.brunopulis.com)**.**

Até semana que vem!
SDG,
Pulis.
