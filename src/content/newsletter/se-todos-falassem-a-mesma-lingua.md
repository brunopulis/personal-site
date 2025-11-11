---
issue: "46"
title: "Se todos falassem a mesma língua?"
date: "2024-12-18"
coverImage: "images/the-cleveland-museum-of-art-axm7m_45_zk-unsplash-scaled.jpg"
---

Opa!

Chegamos à edição 47 e ao fim da nossa jornada sobre os [6 bugs mais comuns de acessibilidade](https://brunopulis.com/6-maiores-erros-de-acessibilidade-digital/). Esta é nossa última newsletter do ano.

Não acompanhou a série completa? Sem problemas!

Você pode consultar todos os artigos anteriores aqui:

1. [Erro de contraste como corrigir?](https://brunopulis.com/letters/erro-de-contraste-como-corrigir/)
2. [Uma imagem vale mais que mil palavras](https://brunopulis.com/letters/como-texto-alternativo-pode-ajudar/)
3. [Como fazer conexões certas](https://brunopulis.com/letters/conexoes-certas/)
4. [Duas formas de escrever formulários acessíveis](https://brunopulis.com/letters/2-formas-de-escrever-formularios-acessiveis/)
5. [Vida vazia, saudade sua](https://brunopulis.com/letters/vida-vazia-saudade-sua/)

## Destaque da semana

Esta semana, testemunhei um momento emocionante em minha igreja: uma cantata de Natal com a participação de pessoas surdas. Foi uma experiência transformadora, onde não apenas os surdos se apresentaram, mas também os ouvintes tiveram a oportunidade de aprender alguns sinais para cantar junto.

E falando nisso, vi um filme chamado **O som do silêncio**, vale a pena conferir.

https://www.youtube.com/watch?v=VFOrGkAvjAE

Esse filme trouxe um misto de reflexão e paz. Se quiser que faço uma resenha me responda esse e-mail. Mas vamos o que interessa.

---

Já imaginou se todos pudessem falar a mesma língua? Navegadores, celulares e tecnologias assistivas seriam beneficiados.

Em teoria, falamos a mesma língua: o inglês. Os padrões de internacionalização existem justamente para dar uma uniformidade entre sistemas e prover maior interação.

Mas, infelizmente, uma parte crucial da web é deixada de lado: o HTML.

Nessa carta vou te mostrar como deixar seu conteúdo disponível no idioma correto.

## O problema

Alguns editores de código, como o Visual Code, definem por padrão o idioma inglês na estrutura do HTML.

O documento vem escrito da seguinte forma:

```html
<!DOCTYPE html>
<html lang="en">
  ...
</html>
```

E cá pra nós, aposto que você nunca percebeu isso ou se importou, não é mesmo? Mas ai que mora o perigo jovem padawan.

Usuários de leitores de tela, utilizam o sintetizador de voz embutido nos softwares para ler o conteúdo.

Uma das primeiras coisas que o sintetizador de voz faz é identificar o idioma atribuído a página.

Além disso, ele busca características como: **entonação**, **ritmo** e **sotaque** da língua definida no documento.

Agora pensa comigo, faz sentido o idioma ser em inglês e o conteúdo em português?

A experiência seria como a saudosa propaganda do Joel Santana.

https://www.youtube.com/watch?v=uW5DRnyfTCc

Para não cairmos nessa cilada, precisamos realizar um pequeno ajuste que irá fazer toda a diferença.

**Importante destacar:**

- A tecnologia assistiva buscará o atributo `lang` e realizará a leitura conforme o idioma definido.

- Essa abordagem inadequada não apenas gera uma experiência confusa, mas também descumpre o critério de sucesso [3.1.1 – Idioma da Página \[A\] — WCAG 2.1.](https://www.w3.org/WAI/WCAG21/Understanding/language-of-page.html)

## **Aprofundando o Conhecimento**

Para explorar mais sobre o atributo `lang`, [consulte outro artigo que publiquei sobre o tema](https://brunopulis.com/usando-o-atributo-lang-corretamente/).

A correção é bem trivial, mas ajuda a todos. Faça isso:

```html
<!DOCTYPE html>
<html lang="pt-br">
  ...
</html>
```

**Para fixar:  
**O idioma na tag `<html>` deve ser o padrão de sua página, caso seu site possua internacionalização o conteúdo do atributo `lang` deverá ser modificado dinamicamente.

## **Conclusão**

Após percorrermos todos os bugs de acessibilidade, torna-se evidente a necessidade de maior conscientização para resolver esses problemas.

Os desenvolvedores precisam aprender, de forma adequada, os padrões web e HTML semântico. Dessa maneira, grande parte dessas barreiras será eliminada.

Reciclar nosso conhecimento é fundamental para a evolução contínua da acessibilidade digital.

Deixo uma reflexão inspiradora de Tim Berners-Lee:

> O poder da Web está em sua universalidade. O acesso por todas as pessoas, independentemente de suas condições, é um aspecto essencial.
