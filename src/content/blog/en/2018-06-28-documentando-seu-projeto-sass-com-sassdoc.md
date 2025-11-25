---
title: "[EN] Documentando seu projeto sass com sassdoc"
excerpt: "[EN] Aprenda a documentar seus projetos sass de forma prática e concisa."
publishDate:
  - "2018-06-28T02:21:08.130Z"
draft:
  - "false"
isFeatured:
  - "false"
category:
  - "blog"
canonicalUrl: "https://medium.com/@brunopulis/documentando-seu-projeto-sass-com-sassdoc-63b42333e48c"
---

> **Translation Note**: This is a placeholder for the English translation of the Portuguese article.
> Original article: [Documentando seu projeto sass com sassdoc](https://medium.com/@brunopulis/documentando-seu-projeto-sass-com-sassdoc-63b42333e48c)


### Documentando seu projeto sass com SassDoc

Como desenvolvedores sabemos que documentar um projeto é uma tarefa importante, porém, em sua grande maioria chata e penosa.

Quem nunca deve que documentar uma classe ou uma função com um escopo bem grande sabe a tortura que isso é. Alguns, até tem uma filosofia que não há necessidade de documentar seu código, em certos contextos realmente não se faz necessário, porém, aplicações de médio e grande porte são essenciais.

A documentação pode trazer alguns benefícios como:

-   Rastreabilidade de código;
-   Manutenbilidade;
-   Escalonamento do código;
-   Descrição correta de cada parte do software.

O SassDoc vem com a proposta de documentar o Sass, mas você pode se perguntar: "há necessidade realmente de documentar um projeto sass?", a resposta é **dependente do contexto**, sites e sistemas básicos com componentes bem definidos e reutilizáveis não há necessidade.

Mas sistemas com uma arquitetura mais complexa com certeza existe uma necessidade de documentar.

Pensando nisso, o [Hugo Giraduel](https://twitter.com/HugoGiraudel) (o mago do sass) e uma equipe, desenvolveram o [SassDoc](http://sassdoc.com/), que provê documentação para projetos escritos em SCSS ou SASS.

A definição oficial é:

> SassDoc é para Sass o que JSDoc é para JavaScript: um sistema de documentação para criar documentos bonitos e poderosos em um piscar de olhos. \[1\]

Algumas vantagens de utilizar ele, são:

-   altamente personalizável;
-   incrivelmente rápido;
-   totalmente legível;
-   integrado com Grunt/Gulp/Broccoli ou diretamente Node.

### Como ele funciona?

Ele analisa a pasta de origem é busca comentários específicos para a documentação. A partir disso, ele gera um **data tree**, que é aprimorada e filtrada antes de ser parseada para a exibição. E o resultado fica assim:

![](https://cdn-images-1.medium.com/max/800/1*8jUHRDRETUAtAJk99nSX4A.png)

### Instalando

npm install sassdoc -g 

### Comentários

Como dito anteriormente, o SassDoc gera a documentação através de comentários especiais

/// Esse comentário vai ser visto na documentação.

/// Configurações padrão para placeholder's.  
@mixin placeholder() {  
 `::-webkit-input-placeholder {@content}     :-moz-placeholder           {@content}     ::-moz-placeholder          {@content}     :-ms-input-placeholder      {@content}   `}

### Executando o SassDoc

Para executar o SassDoc, você pode integrar ele com algum automatizador de tarefas, como o Gulp, ou pelo próprio Node. Caso você não defina o nome do diretório ele automaticamente irá nomeá-lo como **sassdoc**, executando:

// Sem definição do diretório  
sassdoc

// Com o diretório definido  
sassdoc doc-system/  
  

### Documentando

Chega de teoria! Vamos documentar um mixin que converte a tipografia de pixels para unidade de medida rem e de quebra gera um fallback, caso não o browser não suporte. Vou utilizar algumas annotations básicas que são instruções para gerar a documentação, você pode consultar a [lista completa](http://sassdoc.com/annotations/) no site.

/// Conversor de Tipografia  
///  
/// Converte um valor em px para rem,  
/// provendo um fallback com pixel.  
///  
/// _@access_ public  
/// _@author_ _Bruno Pulis  
_/// _@param_ _{Length}_ _$size_ — Tamanho da tipografia  
///  
/// _@example_ _scss_ — rem mixin  
/// _.foo_ {  
///   @include rem(20px); // Exibe fonte convertida  
/// }  
///  
@mixin rem(_$size_) {  
  font-size: $size; //Fallback in px  
  font-size: calculateRem($size);  
}

Criei [um projeto no Github](https://github.com/brunopulis/sassdoc-example) com o exemplo desenvolvido, com a tarefa do Gulp foi gerar a documentação e o resultado será:

![](https://cdn-images-1.medium.com/max/800/1*EJKiJPvXsfronk6ZdEe8pA.png)

Documentação gerada pelo SassDocs.

Com simples comentários temos a documentação do nosso mixins, podemos explorar em documentar _mixins, functions, variáveis e helpers._ As possibilidades são infinitas, cabe a nós decidirmos o que documentar.

Até mais,  
@obrunopulis