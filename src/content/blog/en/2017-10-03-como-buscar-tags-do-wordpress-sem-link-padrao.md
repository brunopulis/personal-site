---
title: "[EN] Como buscar tags do Wordpress sem link padrão"
excerpt: "[EN] Esse artigo visa mostrar de forma clara como é possível retornar o nome das tags do Wordpress sem o link padrão. É uma técnica…"
publishDate:
  - "2017-10-03T00:00:20.969Z"
draft:
  - "false"
isFeatured:
  - "false"
category:
  - "blog"
canonicalUrl: "https://medium.com/@brunopulis/como-buscar-tags-do-wordpress-sem-link-padr%C3%A3o-47d5c64a8073"
---

> **Translation Note**: This is a placeholder for the English translation of the Portuguese article.
> Original article: [Como buscar tags do Wordpress sem link padrão](https://medium.com/@brunopulis/como-buscar-tags-do-wordpress-sem-link-padr%C3%A3o-47d5c64a8073)


### Como buscar tags do Wordpress sem link padrão

![](https://cdn-images-1.medium.com/max/2560/1*rL5PeI1UmZPuZnT_P6mMIw.png)

Esse artigo visa mostrar de forma clara como é possível retornar o nome das tags do Wordpress sem o link padrão. É uma técnica relativamente simples uma consulta na documentação e resolvemos nosso problema, vamos lá!

### O cenário

Estou desenvolvendo um site com meu amigo Jhonny Costa, onde temos uma determinada página que irá retornar a tag de um determinado post.

Após algumas conversas, entramos em um impasse onde não exisitiria a necessidade das tags virem com seus respectivos links.

Então eu recorri a [documentação do Wordpress](https://codex.wordpress.org/Function_Reference/the_tags) para consultar a função que gera as tags a **the\_tags()**, a documentação mostra que ela recebe três paramêtros por padrão: **$before, $sep, $after**.

### $before

Paramêtro do tipo **String**, onde retornará um texto antes das tags serem exibidas. Seu padrão é a palavra “Tags”.

### $sep

Paramêtro do tipo **String**, onde retornará um texto ou caractere que serão exibidos entre cada tag link, O padrão dele é (,) entre cada tag.

### $after

Paramêtro do tipo **String**, onde retornará um texto após a última tag. Seu padrão não é exibir nada.

A função **the\_tags()** não possui retorno.

### Exemplo

Imagine o caso, o cliente me pediu que o texto que deve ser mostrado seria “Tags Sociais” e separados pelo sinal matemático de maio (>):

the\_tags( ‘Tags Sociais: ‘,’ > ‘ );

Para exibir somente as tags sem o link devemos escrever o seguinte código:

foreach(( get\_the\_tags()) as $tag):   
  echo $tag->name;  
endforeach;

Você deve colocar esse trecho de código no lugar apropriado do seu tema para retornar as tags sem os seus links.

### Conclusão

Com esse trecho de código resolvi meu problema para retornar as tags, espero que possa ser útil para alguém que tenha a mesma dúvida ou similar. Caso tenha alguma dúvida escreva um comentário.