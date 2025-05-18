---
title: 5 tags que ajudam na acessibilidade
date: 2024-09-30
metadata:
  categories:
    - Acessibilidade
  tags:
    - html
    - semântica
  url: https://brunopulis.com/5-tags-acessibilidade/
tags:
  - acessibilidade
---
## Introdução

Acessibilidade é um tema que nós desenvolvedores esquecemos, porém, é extremamente importante. Por isso, saber acessibilidade pode ser um grande diferencial.

Nesse artigo vou te mostrar **5 tags que ajudam na acessibilidade**.

Vamos lá?

## 1\. \<header>

O **elemento HTML** **`<header>`** representa um grupo introdutório ou navegacional. Pode conter alguns elementos, como:

-   Logo;
-   Seções de cabeçalho;
-   Formulário de pesquisa;
-   Redes sociais;
-   Botões.

Ele pode ser usado em diversos contextos, como:

-   Dentro de um artigo de blog;
-   Dentro de uma sessão;
-   Dentro de listas.

Quando usamos o **`<header>`** como navegação principal não é necessário incluir o atributo **role=”banner”**.

```
<header>
  <h1>Título da Página Principal</h1>
  <img src="minha-logo.png" alt="Sua logo">
</header>
```

Mas se usarmos em um outro contexto, como o cabeçalho de um post, devemos usar:

```
<article>
  <header role="banner">
    <h3>Meu título</h3>
    Publicado em <time>19 de setembro de 2024</time>
  </header>
</article>
```

## 2\. \<nav>

O **elemento `<nav>`** representa uma estrutura com links de navegação. Ela não deve ser usada em todos os links, somente em **links principais**.

Podemos usá-la em:

-   **Navegação principal;**
-   **Paginação;**
-   **Navegação secundária.**

Outro ponto importante, podem existir vários elementos `<nav>` em uma página. Leitores de tela são beneficiados com o uso do elemento, pois direcionam a navegação principal.

```
<nav>
  <ul>
    <li><a href="#">Página inicial</a></li>
    <li><a href="#">Sobre</a></li>
    <li><a href="#">Contato</a></li>
  </ul>
</nav>
```

## 3\. \<main>

O elemento **`<main>`** define o conteúdo principal dentro do <kbd><strong>&lt;body&gt;</strong></kbd>. Ele é relacionado com o tópico central da sua página.

**Detalhe importante: deve existir somente um elemento `<main>` por página. Outra regra importante, o elemento não pode ser filho de:**

-   **\<article>;**
-   **\<aside>;**
-   **\<footer>;**
-   **\<header>;**
-   **\<nav>.**

Um exemplo de uso correto do `<main>`:

```
<main>
  <h1>Maçãs</h1>
  <p>A maçã é a fruta pomácea da macieira.</p>

  <article>
    <h2>Vermelho delicioso</h2>
    <p>
      Estas maçãs vermelhas brilhantes são as mais comumente encontradas em
      muitos supermercados.
    </p>
    <p>...</p>
    <p>...</p>
  </article>
</main>
```

## 4\. \<footer>

O elemento <kbd><strong>&lt;footer&gt;</strong></kbd> representa o rodapé do seu site.  
Normalmente um rodapé contém informações sobre o autor da seção de dados, direitos autorais ou links para documentos relacionados.

```
<footer>
  Algumas informações de copyright ou talvez alguma informação do autor de um <article>?
</footer>
```

## 5\. \<dialog>

O **elemento HTML `<dialog>`** representa uma caixa de diálogo ou outro componente interativo, ele pode ser usado para criar janelas modais. Aquelas antigas que usávamos com muito Javascript.

Graças a evolução do HTML, é possível criar essa funcionalidade nativamente.

Um detalhe importante, o atributo tabindex não deve ser usado com o **<kbd>&lt;dialog&gt;</kbd>**.

Podemos usar o atributo `<strong>open</strong>`, que indica que a janela modal está ativa.

```
<dialog open>
  <p>Seja bem-vindo</p>
  <form method="dialog">
    <button>OK</button>
  </form>
</dialog>
```

Para estilizar o **`<dialog>`**, podemos usar o pseudo-elemento CSS [`::backdrop`](https://developer.mozilla.org/pt-BR/docs/Web/CSS/::backdrop), para estilizar seu background.

Mesmo que o elemento **`<dialog>`**, possua suporte completo em navegadores modernos precisamos de usar um _[polyfill](https://github.com/GoogleChrome/dialog-polyfill)_, para termos retrocompatibilidade.

## Conclusão

Além das tags auxiliarem na semântica, tem um valor significativo para acessibilidade. Não ter um canivete sem saber usá-lo. É extremamente importante, saber o que e quando usar.

## Referências

-   [\<header> – HTML: Linguagem de Marcação de Hipertexto](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/header)
-   [\<nav> – HTML: Linguagem de Marcação de Hipertexto](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/nav)
-   [\<main> – HTML: Linguagem de Marcação de Hipertexto](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/main)
-   [\<footer> – HTML: Linguagem de Marcação de Hipertexto](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/footer)
-   [\<dialog>: O elemento Dialog – HTML: Linguagem de Marcação de Hipertexto](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/dialog)

Também em:

-   [<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Pixelfed</title><path d="M12 24C5.3726 24 0 18.6274 0 12S5.3726 0 12 0s12 5.3726 12 12-5.3726 12-12 12m-.9526-9.3802h2.2014c2.0738 0 3.7549-1.6366 3.7549-3.6554S15.3226 7.309 13.2488 7.309h-3.1772c-1.1964 0-2.1663.9442-2.1663 2.1089v8.208z"></path></svg>Pixelfed](https://pixelfed.social/p/brunopulis.com/746381227036273154)