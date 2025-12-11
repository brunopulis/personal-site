---
title: 'Usando fetch API'
excerpt: 'Neste artigo, irei mostrar como utilizar a nova Spec para requisições Ajax e como ela pode ser largamente usada atualmente.'
pubDate: 2017-10-03T00:23:14.955Z
tags: ['javascript']
---

### Usando fetch API

![](https://cdn-images-1.medium.com/max/2560/1*EfsrQb18vGl-THVugP2DOA.jpeg)

Neste artigo, irei mostrar como utilizar a nova Spec para requisições Ajax e como ela pode ser largamente usada atualmente.

### A forma antiga

Antigamente para realizar uma consulta assincrona (Ajax) usariamos o modelo do objeto **XMLHttpRequest**, nossa requisição HTTP ficaria da seguinte forma:

```js
var httpRequest;

if (window.XMLHttpRequest)
 httpRequest = new XMLHttpRequest();
else if (window.ActiveXObject)
 httpRequest = new ActiveXObject(“Microsoft.XMLHTTP”);

Com o advento do **jQuery** a vida ficou um pouco mais fácil, pois o jQuery proveu uma nova forma de acessar dados assincronamente, atráves do metódo **$.ajax()**.
 Neste exemplo, o jQuery faz uma requisição no arquivo **script.php**, esperando que retorne um JSON da consulta.

var request = $.ajax({
 url: “script.php”,
 method: “POST”,
 data: { id : menuId },
 dataType: “json”
});
```

### Usando a fetchAPI

De acordo com a definição do MDN, a fetchAPI é:

> _A Fetch API fornece uma interface para buscar recursos.  
>  Parece familiar para qualquer um que tenha usado o XMLHttpRequest, mas a nova API oferece um conjunto de recursos mais poderoso e flexível._

### Suporte

![](https://cdn-images-1.medium.com/max/2560/1*twJt1yTH24VL5bSUMjTEHA.png)

Além de um suporte bem favorável ao uso, ela é baseada em Promises.  
Vale lembrar que a fetchAPI retorna um Response com diversos metódos importantes, vamos utilizar o método **json** como resposta.

Para título de exemplo vamos consultar a [Swapi](https://swapi.co/) uma API do mundo Star Wars.

Nosso objetivo e buscar o personagem **Luke Skywalker**.

```js
const URL = “http://swapi.co/api/people/1"

fetch(URL).then(function(res){
 res.json().then(function(data){
 console.log(data)
 })
})
.catch(function(err){
 console.error(‘Não foi possível achar a informação’, err)
})
```

### Explicando o exemplo

- Na linha 1, eu declaro uma **const** com o valor da consulta que irá me retorna o Luke.
- Na linha 2, utilizo o fetchAPI passando como paramêtro a URL definida.
- Entre as linhas 3 a 6, crio uma Promise que espera uma resposta e converto essa resposta para JSON e exibido o resultado.
- Caso ele não satisfaça as condições das linhas 3 a 6 ele entrará na linha 8 a 10 e mostrará um erro.