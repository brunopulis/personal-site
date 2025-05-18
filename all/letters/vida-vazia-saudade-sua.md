---
title: "Vida vazia, saudade sua"
date: "2024-12-12"
coverImage: "buttons-scaled.jpg"
---

Olá,

Essa semana navegando pelo Max vi no catálogo o filme do Beetlejuice 2. Me chamou a atenção o recurso de **LIBRAS** no filme.

Confesso, aquilo me intrigou e coloquei para assistir, foi uma experiência interessante.

Mas, vamos ao que interessa

* * *

Os botões são um dos elementos mais importantes do HTML. Sem eles não poderíamos:

- Comprar produtos;

- Acessar redes sociais;

- Tirar dinheiro da nossa conta.

Os formulários seriam iguais uma comida sem sal. Mas esse camarada é bem judiado por nós programadores.

Existem algumas situações que os botões aparecem sem um rótulo acessível. E isso é péssimo para a acessibilidade, afinal faz sentido ter um botão sem uma identificação visual?

Todo elemento HTML deve ter definido três propriedades: **nome**, **função** e **valor**.

Essas características são levadas em consideração e lidas pelo leitor de telas. Isso é importante para dar um feedback real e preciso para as tecnologias assistivas.

> **Para memorizar**: tecnologias assistivas leem os elementos HTML e extraem suas propriedades. Sem as propriedades corretas, o feedback pode ficar comprometido.

Imagine comigo o cenário, você precisa implementar uma janela modal com um botão de fechar.  
  
O código produzido foi:

```markup
<button>
  <i class="fa-solid fa-close"></i>
</button>
```

Esse botão não seria acessível para os leitores de tela. Ele não possui um rótulo acessível. O feedback para o leitor seria algo como: **“botão clicável”**, ou seja, um botão sem identificação.

Ninguém sabe o que esse cara faz.

Para corrigir podemos usar o atributo **aria-label** e informar seu rótulo acessível.

```markup
<button aria-label="Fechar">
  <i class="fa-solid fa-close" aria-hidden="true"></i>
</button>
```

> **Para memorizar:** não tem necessidade repetir a palavra “botão” dentro do aria-label, o leitor de telas lê a semântica nativa do elemento.

Usando o aria-label ele estende a semântica do elemento e verbalizar corretamente com o rótulo acessível.

Uma regra geral seria, os rótulos acessível devem ser visível sempre que possível. Em casos onde isso não pode acontecer use o aria-label.

Essa pequena dica vai te salvar de muitos bugs de acessibilidade.  
Por hoje é só.
