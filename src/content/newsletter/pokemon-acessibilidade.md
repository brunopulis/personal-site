---
issue: "21"
title: "O que o Pokémon me ensinou sobre acessibilidade"
date: "2024-02-29"
coverImage: "pokemon.jpg"
---

Pulis Letters - Edição #21  
Tempo de leitura: 5 minutos

Para quem me acompanha no Instagram, viu que postei um story falando sobre um sonho de adolescência.

Todas às vezes que ia ao supermercado fica desejando comprar o famoso Häagen-Dazs.

Acontece que, após adulto, decidi comprar.  
Por que demorei tanto? O trem bom sô.

Fiquei pensando sobre o que escreveria para essa semana.  
Lembrei de um roteiro de vídeo que nunca foi publicado.

Vamos lá.

* * *

Em dezembro de 1997 a série Pokémon, lançava um episódio que ficaria marcado na sua história.

O episódio 38° da primeira temporada, chamava-se: **Denno Senshi Porygon**.

Ash e seus amigos viajam em um universo alternativo digital.

Esse episódio tinha uma cena onde o Pikachu usa um choque trovão destrutivo para derrotar um míssil cibernético.

Acontece uma explosão que pisca luzes vermelhas e azuis muito rápido.

## O que aconteceu com esse episódio?

Bom, o episódio teve que ser retirado do ar. Devido à combinação de cores muito rápidas várias pessoas passaram mal.

A situação foi tão séria que algumas pessoas reclamaram de:

- Visão embaçada;

- Dores de cabeça;

- Tontura e náuseas.

Cegueira temporária, convulsões e perda de consciência também foram relatadas.

Dos 685 espectadores, 310 meninos e 375 meninas, foram levados a hospitais.

Mais de 150 pessoas foram internadas e duas pessoas permaneceram hospitalizadas por mais de duas semanas.

Outras tiveram convulsões, enquanto assistiam às reportagens que exibiam alguns trechos.

> **Dados importantes**
> 
> A série parou de ser exibida durante 4 meses e quase foi cancelada e as ações da Nintendo caíram 5% na bolsa de valores.
> 
> Uma fração das 685 crianças tratadas foram diagnosticadas com epilepsia fotossensível.

A culpada por essa bagunça toda foi as luzes estroboscópicas.

A produção da série gravou um pedido de desculpa explicando tecnicamente o que aconteceu.

<iframe src="//www.youtube.com/embed/KsDVDJYoMG0" width="560" height="314" allowfullscreen="allowfullscreen" data-mce-fragment="1"></iframe>

> Quem diria que um descuido com a acessibilidade quase levaria uma série a ser cancelada e perder uma empresa perder valor de mercado ein!?

## Por debaixo dos panos

Os flashes no desenho eram bem brilhantes, com uma taxa de 12Hz por 5 segundos.

Detalhe: era quase na tela inteira.

Isso acompanhado de uma duração 2 segundos, essa "pequena quantidade" fez um belo estrago.

Na WCAG, existem dois critérios de sucesso para tratar o uso de flashes, eles são:

- [2.3.1: Três flashes ou abaixo do limite](https://www.w3.org/WAI/WCAG21/Understanding/three-flashes-or-below-threshold);

- [2.3.2 Três flashes](https://www.w3.org/WAI/WCAG21/Understanding/three-flashes).

### 2.3.1 Três flashes ou abaixo do limite

O objetivo deste critério é permitir que usuário acessem ao conteúdo completo sem induzí-los convulsões devido à fotossensibilidade.

Eu tenho epilepsia e não consigo ficar em ambientes com esse tipo de luz. Me dá tontura e prefiro sair de perto, balada não é meu forte.

Para evitar que isso aconteça, aplique essas técnicas:

- [G19: Garantindo que nenhum componente do conteúdo pisque mais de três vezes em 1 segundo período](https://www.w3.org/WAI/WCAG21/Techniques/general/G19);

- [G176: Mantendo a área intermitente pequena o suficiente](https://www.w3.org/WAI/WCAG21/Techniques/general/G176);

- [G15: Usando uma ferramenta para garantir que o conteúdo não viole o limite geral do flash ou limiar de flash vermelho](https://www.w3.org/WAI/WCAG21/Techniques/general/G15).

### 2.3.2 Três flashes

Esse critério possui um nível de complexidade maior.  
Ele garante que a aplicação esteja acessível para todos.

**Resumindo**:

- O primeiro permite piscar se estiver suficientemente escuro;

- O segundo não permite piscar mais de 3 vezes por segundo;

Para evitar que aconteça, use a técnica:

- [G19: Garantir que nenhum componente do conteúdo pisque mais de três vezes em qualquer segundo](https://www.w3.org/WAI/WCAG21/Techniques/general/G19).

* * *

## Qual a lição que tiro disso?

Nesse contexto, fica claro que a acessibilidade quando deixada de lado pode trazer muitos danos para as pessoas.

Ela não faz parte somente da área técnica, mas é viva.

Projetar ignorando essas regras pode trazer danos materiais e físicos.

Uma frase ilustra a lição que aprendi:

> _**Estamos criando deficiências se não estivermos criando uma web para todos.**_
> 
> via @emplums no Twitter
