---
title: "Como criar texto alternativo longo"
date: "2024-03-24"
categories: 
  - "desenvolvimento-web"
coverImage: "code.jpg"
---

Esse final de semana estava atualizando o site do meu casamento e me deparei com um problema. 

Minha noiva fez os **textos alternativos longos** e completos para a página de Galeria de fotos do nosso pré-wedding. 

Como utilizar esses textos alternativos de forma que pessoas não visuais possam ter a mesma experiência? 

Vem comigo nesse artigo, que vou te explicar como resolver esse problema de maneira prática. 

## Entendendo o texto alternativo

A WCAG possui um critério de sucesso responsável por validar alternativas de texto. O critério é o [1.1.1](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content) que nos informa: 

> Todo conteúdo não textual que é apresentado ao usuário tem uma alternativa de texto que serve ao propósito equivalente

Existem algumas exceções, entretanto não é o objetivo esmiuçar elas. Esse critério tem a responsabilidade de dar uma experiência igualitária para as pessoas não-visuais ou de baixa visão.

Escrevi [um guia completo sobre texto alternativo](https://brunopulis.com/texto-alternativo-o-guia-definitivo/) que pode ser muito útil para compreender todo o contexto. 

## Meu cenário

Primeiramente tentei incluir os **textos alternativos longos** da forma que minha noiva fez, mas percebi que essa informação poderia ficar muito confusa. 

Dessa forma, optei por pesquisar outras soluções, graças a Deus a WCAG tem recursos muito interessantes que podem nos auxiliar para essa tarefa. 

Além dos critérios de sucesso, ela conta com o apoio das técnicas de sucesso. Basicamente são técnicas que orientam para que o conteúdo seja feito de forma acessível. 

No documento auxiliar [Entendendo o Critério de Sucesso 1.1.1 (em inglês)](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content), existe uma sessão chamada **técnicas**, vamos basear nossos esforços nela. 

## Entendendo a técnica de suficientes

O critério de sucesso 1.1.1 fornece diversas técnicas suficientes, atualmente existem 6 situações para seu uso, por exemplo:

- Situação A: Se uma breve descrição pode servir ao mesmo propósito e apresentar o mesmo informações como o conteúdo não textual;

- Situação B: Se uma breve descrição não puder servir o mesmo propósito e apresentar as mesmas informações que o conteúdo **não** textual (por exemplo, um gráfico ou diagrama);

- Situação C: Se o conteúdo não textual for um controle ou aceitar a entrada do usuário;

- Situação D: conteúdo não textual for mídia baseada em tempo (incluindo somente vídeo ao vivo e somente áudio ao vivo); um teste ou exercício que seria inválido se apresentado em texto; ou Destina-se principalmente a criar uma experiência sensorial específica;

- Situação E: Se o conteúdo não textual for um CAPTCHA

- Situação F: o conteúdo não textual deve ser ignorado pela tecnologia assistiva.

No meu caso, a situação que mais se encaixa era a Situação B: se uma breve descrição não puder servir o propósito e apresentar as mesmas informações que o conteúdo não textual. 

Analisando essa situação, encontramos a técnica alternativa para texto longo:

- [ARIA15: Usando aria-describedby para fornecer descrições de imagens](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA15)

Pra minha solução vou precisar recorrer a um atributo ARIA chamado aria-describedby. O objetivo de usar essa técnica é garantir as descrições de imagens quando um texto alternativo curto não transmite adequadamente a função ou as informações fornecidas.

Basicamente o que iremos fazer é associar um texto descritivo a uma sessão com o auxilio do atributo ID. Isso é semelhante quando precisamos rotular um <label> com um <input>.

## Compreendendo o aria-describedby

O atributo **aria-describedby** é um atributo global que identifica um elemento ou (elementos) que descrevam o elemento no qual o atributo é definido. 

Parece ser algo bem complexo não é mesmo? Vai por mim, é bem mais tranquilo do que parece. 

## Descrição do aria-describedby

O atributo **aria-describedby** lista os id’s dos elementos que descrevem o objeto. Ele é usado para estabelecer uma relação entre widgets ou grupos e o texto que os descrevem.

Também podemos destacar uma semelhança com o atributo aria-labelledby, porém, isso fica para um próximo artigo.

Dessa forma, pensei que poderia usar uma descrição sucinta no atributo ALT e utilizar do aria-describedby para dar um suporte mais detalhado. 

## Minha solução

Ao invés de colocar um texto alternativo extremamente grande no atributo ALT eu irei fazer da seguinte forma: 

```markup
<picture> 
   <source srcset="./images/couple.webp" type="image/webp"    <source srcset="./images/couple.jpg" type="image/jpeg">    <img src="/images/couple.jpg" alt="Bruno e Mari fazendo careta para a câmera." aria-describedby=”desc1”>
</picture>
<div class="visually-hidden id="desc1">
<p>Bruno é um homem branco, olhos escuros, usa gorro preto de lã e óculos de grau com armação preta arredondada e barba grande escura, está de casaco de zíper cinza escuro. Mariana é uma mulher branca, cabelos castanho claro longos, está com os olhos fechados apertados, está usando casaco preto e gola de lã cinza. Os dois estão com os rostos colados fazendo bico pra foto.</p> 
</div> 
```

### Explicando o código:

Da linha 1 a 5 defino as imagens que serão carregadas, usando a tag <picture> o navegador irá decidir qual imagem será carregada, note que uso dois formatos: webp (um formato mais leve e novo) e o nosso velho conhecido jpg. 

Dessa forma, permito o browser decidir qual recurso ele irá carregar. 

Na linha 4, utilizo o atributo aria-describedby e passo o valor “desc1” para ele. 

Na linha 7 defino uma <div> que irá servir como um container para as informações ela possuí uma classe visually-hidden que permite que essa informação seja lida somente pelo leitor de telas e um id referenciando o mesmo valor que define no aria-describedby. 

Na linha 8, coloco a descrição longa que desejo. 

## Leitura com o NVDA

O NVDA irá ler as duas informações, primeiramente o ALT curto e complementar com a descrição longa. 

## Conclusão 

O uso do aria-describedby é uma técnica extremamente simples, porém, muito eficaz para esses cenários com um texto alternativo longo. 

Sempre é bom lembrar que usar atributos ARIA deve ser com muita cautela, pois, com grandes poderes vem grandes responsabilidades.
