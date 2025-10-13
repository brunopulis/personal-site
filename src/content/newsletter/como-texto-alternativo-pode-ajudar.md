---
issue: '43'
title: 'Uma imagem vale mais que mil palavras'
date: '2024-11-14'
coverImage: 'MB-421-scaled.jpg'
---

Ontem, recebemos os álbuns do nosso casamento. Por contrato receberíamos dois, um pequeno e outro grande.

Não estava em casa quando chegou, minha esposa me mandou a foto da foto.

Cheguei curioso, folheie as fotografias e uma mexeu comigo.

Foi a última foto que tirei com a minha avó materna, Deus chamou ela esse ano para morar com Ele. Essa foto é especial, um momento de alegria, mas mal sabia que era uma das últimas fotos que tiraria com ela.

Fiquei pensativo e bateu saudade, uma imagem despertou isso. Imagens são recursos fascinantes, podem contar história e despertam diversos sentimentos.

Na carta de hoje, vou te mostrar a importância do texto alternativo e como ele vai além de um simples recurso.

Vamos percorrer os seguintes tópicos:

- Resumo do critério 1.1.1;
- Seu objetivo;
- Onde podemos usar textos alternativos?
- Quando descrever uma imagem?
- Imagens contextuais e decorativas
- Descrições curtas e longas.

Vamos lá!

Quando ouvimos falar de texto alternativo para imagens, estamos falando do critério [1.1.1 Conteúdo não textual (Nível A)](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html).

O resumo desse critério é:

> Fornecer um texto alternativo para conteúdos que não são textos, como imagens.

## Objetivo do critério

Esse critério tem um objetivo simples: fornecer informação para todos. Conseguimos através da técnica de textos alternativos.

Algumas pessoas são beneficiadas com isso, por exemplo:

- Pessoas que têm dificuldade de perceber o conteúdo visual;
- Pessoas que têm dificuldades em compreender fotografias, desenhos e outras imagens;
- Pessoas surdo-cegas.

## Onde podemos usar textos alternativos?

Podemos usar em quase todos os cenários, mas alguns estão presente em nosso cotidiano e nem percebemos, como:

- **Carrosséis para redes sociais;**
- **GIFs, memes e quadrinhos**;
- **Um gráfico de dados;**
- **Um mapa de imagem;**
- **Uma animação que ilustra como funciona o motor de um carro.**

Todos os casos citados podem ser acessível, porém, infelizmente na maioria das vezes não é. Uma vez que ignoramos descrever as imagens, pessoas com algum tipo de deficiência visual não compreendem seu conteúdo.

**Ou seja, você pode ter a melhor oferta, copy e criativo, mas se seu conteúdo não é acessível nada disso irá adiantar.**

## Quando descrever uma imagem?

Essa é a pergunta de milhões, uma resposta objetiva seria: depende do contexto. No site da W3C tem uma [árvore de decisão que pode ajudar a ilustrar quando e como descrever a imagem](https://www.w3.org/WAI/tutorials/images/decision-tree/).

De forma geral, temos dois tipos de imagens:

- Imagens informativas;
- Imagens decorativas.

E dois cenários:

- Descrições curtas;
- Descrições longas.

### Imagens informativas

![Aspirador Robô Eclipse, seu formato é redondo da cor preto com dois botões na parte de cima. Na parte debaixo, existe cerdas que fazem a limpeza da casa.](images/aspirador.webp)

Para ilustramos, temos o anúncio de um Aspirador Robô Eclipse. Se tivéssemos somente a imagem como fonte de consulta, o texto não seria suficiente.

Ele não explica quase nada, isso levaria algumas perguntas como:

- Sua cor?
- Qual a marca do produto?
- Formato?

Acho que deu para pegar a ideia, não é? Esse exemplo é uma imagem informativa, logo ela precisa ser descrita.

Uma possível descrição seria:

> Aspirador Robô Eclipse, seu formato é redondo da cor preto com dois botões na parte de cima. Na parte debaixo, existem cerdas que fazem a limpeza da casa.

Convertendo para código HTML ficaria:

```html
<img
  src="aspirador.jpg"
  alt="Aspirador Robô Eclipse, seu formato é redondo da cor preto com dois botões na parte de cima. Na parte debaixo, existe cerdas que fazem a limpeza da casa."
/>
```

### Imagens decorativas

![No exemplo, existe um envelope simbolizando um e-mail com um sinal de alerta e uma frase: “Proteja-se! Confira sempre se seu boleto vem com seu nome, telefone e endereço”](images/vivo.webp)

As imagens decorativas, não precisam de descrição. Elas funcionam como um **reforço visual** e não contribuem em nenhuma informação para as pessoas.

No exemplo, existe um envelope simbolizando um e-mail com um sinal de alerta e uma frase: “Proteja-se! Confira sempre se seu boleto vem com seu nome, telefone e endereço”

A informação mais importante nesse contexto, é a frase, logo a imagem pode ser ignorada pelo leitor de telas.

Convertendo para código HTML ficaria:

```html
<img src="alerta.png" alt="" />
<p>Proteja-se! Confira sempre se seu boleto vem com seu nome, telefone e endereço</p>
```

> Para fixar
>
> Imagens decorativas devem ficar no CSS, caso não conseguir deixe o ALT em branco.

### Descrições curtas

Busque escrever descrições objetivas e sucintas, o atributo ALT tem um limite.

Sua descrição deve informar as características principais da imagem.

**Por exemplo:**

Uma imagem em um site fornece um link para uma newsletter gratuita. A imagem contém o texto "Newsletter gratuita. Receba receitas, notícias e muito mais. Saiba mais." O texto alternativo corresponde ao texto na imagem.

```html
<img src="newsletter.gif" alt="Newsletter gratuita. Receba receitas, notícias e muito mais. Saiba mais." />
```

### Descrições longas

A técnica que descrevo a seguir é utilizada quando precisamos fazer descrições longas, um detalhamento mais extenso da imagem. Isso é muito útil quando temos uma foto histórica, uma pintura, gráfico, imagens que precisam ser descrito com maior precisão.

**Por exemplo:**

Uma fotografia do quadro “Uma noite estrelada de Van Gogh”. Esse exemplo utiliza o atributo  `aria-describedby` e demonstra como pode ser aplicado a uma imagem para fornecer uma descrição longa, onde essa descrição de texto está na mesma página da imagem.

```html
<img src="noite-estrelada.jpg" alt="A noite estrela, Van Gogh 1889" aria-describedby="p1" />
<p id="p1">
  A imagem é uma representação vibrante e dinâmica de uma noite estrelada, onde o céu parece vivo, com redemoinhos de
  luz e estrelas brilhantes contrastando com uma vila calma e silenciosa abaixo. A combinação de cores intensas e
  movimento transmite uma sensação de energia pulsante e introspecção, como se capturasse a grandiosidade e o mistério
  do universo junto com a quietude da humanidade.
</p>
```

O leitor de telas irá ler as duas informações: a curta e a longa. Tudo devido à junção do aria-describebdy e o atributo id.

> Para se aprofundar
> Traduzi [um guia super completo de como escrever um texto alternativo](https://brunopulis.com/texto-alternativo-o-guia-definitivo/).

## Conclusão

Fica nítido que uma imagem quando descrita diz muito mais que várias palavras. Sentimentos, sensações, saudades, tudo isso só pode existir se eu e você fizermos nossa parte.

Cada imagem sem descrição é uma chance perdida de contar uma bela história.

Não deixe suas imagens falarem sozinhas. Torne-se parte da solução. **Escolha a inclusão.**

Até semana que vem,

SDG,
Pulis.
