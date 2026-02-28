---
issue: '42'
title: 'Erro de contraste como corrigir'
pubDate: '2024-11-07'
---

Olá pessoal,

Durante seis semanas, exploraremos os **erros mais comuns de acessibilidade** e como corrigi-los. Ao final, você terá informações necessárias para aplicar melhorias.

**Sequência de conteúdos:**

- **Baixo contraste;**
- Imagem sem texto alternativo;
- Links vazios;
- Formulários sem labels;
- Botões vazios;
- Documento HTML sem idioma.

## **Erro 1: Baixo Contraste**

Os problemas de contraste estão em quase todas as páginas, mas em alguns segmentos encontramos com maior frequência, como:

- Sites de papelarias;
- Sites de estética e beleza;
- Sites de fornecedores de casamento.

Esse problema é grave, pois afeta muitas pessoas no mundo todo, **mas afinal o que é contraste?**

> Contraste é a capacidade da percepção das cores em dois planos: a cor do fundo e texto.

Para ter um bom contraste, o fundo e texto devem seguir uma razão matemática. A recomendação mínima é de **4.5:1**.

### **Exemplo prático**

Em uma seção **"Sobre mim"** do meu site:

![Print da sessão de Sobre mim do meu site, com fundo branco e cinza bem claro, quebrando o critério de contraste.](/assets/images/newsletters/email.webp)

Percebeu como ficou difícil de ler o conteúdo?

Pois é!

Essa experiência afeta pessoas com daltonismo e outras especificidades de visão, como:

- Ceratocone;
- Baixa visão;
- Miopia.

Sabe-se que [cerca de 1 em cada 20 pessoas](http://www.colourblindawareness.org/colour-blindness/) apresenta alguma deficiência na percepção de cores, também conhecida pelo termo "**daltonismo"**.

Isso dificulta a diferenciação das cores, podendo aumentar problemas relacionados ao contraste. **O exemplo falha em todos os tipos de daltonismo**.

### **Como corrigir?**

Para corrigir, precisamos identificar as cores:

- **de fundo da tela;**
- **do elemento textual.**

A cor de fundo é **`#fff`** e a cor do texto é **`#ccc`** o contraste entre elas é de **1.61**. Esse valor não atinge o mínimo exigido de **4.5:1.**

Existem ferramentas que podemos usar. Recomendo:

- [Colour Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/);
- [Accessible Colors](https://accessible-colors.com/);
- [Who Can Use](https://www.whocanuse.com/?bg=ffffff&fg=cccccc&fs=16&fw=).

No [Awesome A11y](https://github.com/brunopulis/awesome-a11y/blob/master/topics/tools.md#colors-and-contrast), listei várias ferramentas, recomendo você experimentar. O Accessible Colors é meu preferido, porque é prático.

Gravei um vídeo no meu canal que pode ser muito útil para compreender melhor.

<div><custom-youtube @slug="4R7-z4kSqqE" @label="Como corrigir problemas de contraste | Método simples e prático"></custom-youtube></div>

A imagem abaixo nos mostra o Accessible Colors em ação.

![Print da análise de contraste, Configuração atual: texto #CCC em 16px regular sobre fundo #FFF. Alternativas para aprovação AA: Alterar o fundo para #565656 (novo contraste: 4.57). Alterar o texto para #767676 (novo contraste: 4.54).](/assets/images/newsletters/accessible-colors.png)

O interessante são as duas alternativas de correção.

Nesse cenário escolhi a segunda opção, irei modificar a cor do texto de **`#ccc`** para **`#767676.`**

Pronto, menos uma dor de cabeça para me preocupar.

## Resumo desta lição

- Segmentos mais impactados por baixo contraste;
- O que é teste de contraste;
- Ferramentas úteis;
- Como corrigir contrastes inadequados.

Nos vemos na próxima semana para falar sobre **imagens sem texto alternativo**!

## **Para saber mais**

- [Guia WCAG](https://guia-wcag.com/)
- [Pesquisa do WebAIM](https://webaim.org/projects/million/#errors)
- [Accessible Colors](https://accessible-colors.com/)

## **Curadoria de links**

- [Tooltips best pratices](https://css-tricks.com/tooltip-best-practices/);
- [HTML Form Validations is heavily underused](https://expressionstatement.com/html-form-validation-is-heavily-underused);
- [Pratical Accessibility Tips you can apply today](https://piccalil.li/blog/practical-accessibility-tips-you-can-apply-today/);
- [Alt Text for Avatars](https://nicolas-steenhout.com/alt-text-for-avatars/);
- [Making Accessibility Accessible](https://www.basbroek.nl/making-accessibility-acceessible);
- [25 tips for improve accessibility](https://webaim.org/blog/25-tips/);
- [Getting Started with NVDA](https://www.tempertemper.net/blog/getting-started-with-nvda);
- [HTML Screen Reader](https://www.a11y-collective.com/blog/html-screen-reader/).

## O que ando assistindo, lendo ou ouvindo

- Ouvi o novo álbum do P.O.D;
- Terminei de reassistir Game of Thrones;
- Comecei a ver The Big Bang Theory.
