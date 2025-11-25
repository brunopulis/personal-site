---
title: "[EN] Como tornar seus gráficos acessíveis para todos"
excerpt: "[EN] Gráficos, mapas e infográficos utilizam recursos visuais para transmitir imagens complexas aos usuários. Porém, esse tipo de mídia traz…"
publishDate:
  - "2022-06-23T00:15:25.816Z"
draft:
  - "false"
isFeatured:
  - "false"
category:
  - "blog"
canonicalUrl: "https://medium.com/@brunopulis/como-tornar-seus-graficos-acessiveis-para-todos-93a3b1aa7142"
---

> **Translation Note**: This is a placeholder for the English translation of the Portuguese article.
> Original article: [Como tornar seus gráficos acessíveis para todos](https://medium.com/@brunopulis/como-tornar-seus-graficos-acessiveis-para-todos-93a3b1aa7142)


### Como tornar seus gráficos acessíveis para todos

![Exemplo de gráfico acessível](https://cdn-images-1.medium.com/max/800/1*8rkkqynxm7YkuMldCJj3uw.png)

Gráficos, mapas e infográficos utilizam recursos visuais para transmitir imagens complexas aos usuários. Porém, esse tipo de mídia traz sérios problemas de acessibilidade para usuários daltônicos, baixa visão e usuários de leitores de tela.

Nesse artigo, irei te mostrar duas técnicas para tornar esse tipo de mídia mais acessível. No final você conseguirá aplicar algumas técnicas para corrigir esse problema corriqueiro.

Vamos lá?

### O que são imagens complexas?

São representações visuais que contêm informações que não podem ser transmitidas atráves de uma sentença ou frase curta. Elas são tipicamente:

-   gráficos, incluindo fluxogramas e organogramas;
-   diagramas e ilustrações em que o texto da página depende da capacidade do usuário de compreender a imagem;
-   infográficos;
-   mapas mostrando locais ou outras informações como sistemas climáticos;
-   os famosos CAPTCHAs.

O atributo alt torna-se ineficiente e devemos procurar outras soluções para correção. Em outro artigo [explico como escrever textos alternativos](https://brunopulis.com/texto-alternativo-o-guia-definitivo/) sem mistérios.

### Criando gráficos acessíveis

Para nosso exemplo, irei utilizar o gráfico da pesquisa [WebAim Million](https://webaim.org/projects/million/), que visa encontrar os maiores erros de acessibilidade nas páginas da web.

![Gráfico sobre Páginas iniciais com falhas WCAG mais comuns (% de páginas iniciais), Existe uma relação entre o tipo de erro com a porcentagem que foi encontrado.](https://cdn-images-1.medium.com/max/800/0*ZI2Y_4Fw35gti9w9.png)

Podemos usar duas alternativas para deixar ele mais acessível. Vamos utilizar duas técnicas: tabelas e atributos ARIA.

### Usando tabelas

Vamos usar uma tabela para representar nosso gráfico. O primeiro passo é usar o elemento `<table>` e construir ela de maneira semântica, outro aspecto bem importante é:

_Manter a tabela logo após a marcação do gráfico. Os leitores de tela leem o HTML de acordo com a orde de declaração._

Dessa forma, usuários de leitores de tela terão várias formas de acesso, possibilitando assim, a navegabilidade nas informações.

Vamos usar duas abordagens com tabelas, a primeira será manter ela visível para todos, e a segunda exibiremos somente para os leitores de tela.

#### Exibindo a tabela

Para fins didáticos vou considerar somente o erro de baixo contraste e texto alternativo no exemplo. A estrutura HTML da nossa tabela será da seguinte forma:

**<**table**\>  
** <caption>Home pages with most common WCAG 2 failures</caption>  
 <tbody>  
   <tr>  
     <th scope=”col”>WCAG Failure Type</th>  
     <th scope=”col”>% of home pages in 2022</th>  
     <th scope=”col”>% of home pages in 2021</th>  
     <th scope=”col”>% of home pages in 2020</th>  
     <th scope=”col”>% of home pages in 2019</th>  
   </tr>  
   <tr>  
     <th scope=”row”>Low contrast text</td>  
     <td>83.9%</td>  
     <td>86.4%</td>  
     <td>86.3%</td>  
     <td>85.3%</td>  
   </tr>  
   <tr>  
     <th scope=”row”>Missing alternative text for images</td>  
     <td>55.4%</td>  
     <td>60.6%</td>  
     <td>66%</td>  
     <td>68%</td>  
   </tr>  
 </tbody>  
</table>

Detalhe importante estou usando o atributo `scope`, ele define o cabeçalho de uma coluna ou linha. Iremos usar os seguintes valores:

-   row: o cabeçalho refere-se a todas as células da linha a que pertence;
-   col: o cabeçalho refere-se a todas as células da coluna a que pertence.

Quando navegamos com o leitor de telas ele identifica esses atributos e conseguimos ter uma navegação mais linear e fluída dentro da tabela.

#### Ocultando tabela visualmente

A única diferença da tabela anterior é uso de uma classe CSS para ocultar a tabela visualmente, dessa forma somente o leitor de tela irá consumir a informação.

**<**table class="visually-hidden"**\>  
** <caption>Home pages with most common WCAG 2 failures</caption>  
 <tbody>  
   <tr>  
     <th scope=”col”>WCAG Failure Type</th>  
     <th scope=”col”>% of home pages in 2022</th>  
     <th scope=”col”>% of home pages in 2021</th>  
     <th scope=”col”>% of home pages in 2020</th>  
     <th scope=”col”>% of home pages in 2019</th>  
   </tr>  
   <tr>  
     <th scope=”row”>Low contrast text</td>  
     <td>83.9%</td>  
     <td>86.4%</td>  
     <td>86.3%</td>  
     <td>85.3%</td>  
   </tr>  
   <tr>  
     <th scope=”row”>Missing alternative text for images</td>  
     <td>55.4%</td>  
     <td>60.6%</td>  
     <td>66%</td>  
     <td>68%</td>  
   </tr>  
 </tbody>  
</table>

### Está gostando desse conteúdo?

Escrevo semanalmente na [Pulis Letters](https://subscribepage.io/cartas) e compartilho insights valiosos sobre **acessibilidade digital** para desenvolvedores, QA’s e designers.

Te espero lá.

### Usando atributos ARIA

Outra técnica interessante é utilizar o atributo **_aria-describedby_**, ele é utilizado para estabelecer um relacionamento entre _widgets_ ou grupos e o texto que o descreve.

Também pode ser usado uma sequência de ids ou somente um. Ele não está limitado a controles de formulários. Pode ser usado em contextos globais dentro de um documento HTML.

<img src="grafico.png" aria-describedby="description" alt="Representação dos erros mais comuns da WCAG 2.1 nas Home pages mais famosas"  />

<div id="description">   
  <h2>Taxa de falhas de baixo contraste em porcentagem por ano</h2>   
  <ul>  
     <li>Em 2019: 85.3%</li>   
     <li>Em 2020: 86.3%</li>   
     <li>Em 2021: 86.4%</li>  
     <li>Em 2022: 83.9%</li>  
  </ul>  
</div>

Com o `aria-describedby` aplicado, o leitor de telas irá ler o atributo `alt` e logo após será direcionado ao conteúdo da `<div>` que contém o ID com valor de _description_.

Dessa forma as duas informações se complementam e conseguimos passar uma informação com maior relevância para todos os usuários.

### Conclusão

Percebemos que as adequações de acessibilidade para tornar a experiência mais acessível são simples. Entretanto, vale salientar que essas são algumas de várias soluções que podemos utilizar.

Tanto as tabelas como os atributos ARIA tem suas vantagens, devemos olhar o nosso contexto e tentar adequar a nossa realidade.

_E você conhecia alguma dessas duas técnicas para deixar os gráficos acessíveis?_

### Referências

-   [https://accessibility.psu.edu/images/charts/](https://accessibility.psu.edu/images/charts/)
-   [https://www.w3.org/TR/WCAG21/#text-alternatives](https://www.w3.org/TR/WCAG21/#text-alternatives)
-   [https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html)
-   [https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=111#non-text-content](https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=111#non-text-content)
-   [https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html](https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html)
-   [https://www.w3.org/WAI/WCAG21/Techniques/general/G95.html#examples](https://www.w3.org/WAI/WCAG21/Techniques/general/G95.html#examples)
-   [https://www.w3.org/WAI/WCAG21/Techniques/general/G73](https://www.w3.org/WAI/WCAG21/Techniques/general/G73)
-   [https://webaim.org/projects/million/](https://webaim.org/projects/million/)
-   [https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby)
-   [https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/th)

### Esse conteúdo foi útil?

Se ele te ajudou de alguma forma, [considere realizar uma doação](https://ko-fi.com/brunopulis).