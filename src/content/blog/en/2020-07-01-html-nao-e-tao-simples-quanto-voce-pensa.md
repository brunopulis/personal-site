---
title: "[EN] HTML não é tão simples quanto você pensa"
excerpt: "[EN] Como a marcação do HTML pode afetar diretamente seu negócio"
publishDate:
  - "2020-07-01T12:19:10.431Z"
draft:
  - "false"
isFeatured:
  - "false"
category:
  - "blog"
canonicalUrl: "https://medium.com/@brunopulis/html-n%C3%A3o-%C3%A9-t%C3%A3o-simples-quanto-voc%C3%AA-pensa-15ea9b611def"
---

> **Translation Note**: This is a placeholder for the English translation of the Portuguese article.
> Original article: [HTML não é tão simples quanto você pensa](https://medium.com/@brunopulis/html-n%C3%A3o-%C3%A9-t%C3%A3o-simples-quanto-voc%C3%AA-pensa-15ea9b611def)


### HTML não é tão simples quanto você pensa

![Foto. Uma pessoa sentada em uma mesa de cor marrom, com uma lapiseira na mão fazendo anotação em um papel. Fundo desfocado.](https://cdn-images-1.medium.com/max/2560/1*bMMrt9n-vSXSCQPYePJpIQ.jpeg)

Esse artigo foi postado originalmente no [meu blog](https://brunopulis.com/dev/repensando-sobre-o-html/).

### Introdução

O HTML é o bloco de construção mais básico da web. É o responsável por definir duas características importantíssimas: **significado** e a **estrutura** do conteúdo da web.

Além dessas características primordiais, também contribui para um melhor posicionamento de nossas páginas na web, ocasionando assim, **maior visibilidade** e **lucro**.

Outro fator não menos importante, é a promoção do conteúdo para todas as pessoas, visto que, uma vez escrito corretamente consegue atingir todos os públicos, garantindo assim a interoperabilidade do conteúdo, sem se preocupar com plataformas ou devices.

### Um breve contexto

O ano é 2020, frameworks de frontend, especialmente de javascript nascem a cada seis segundos com a promessa quase messiânica de resolver nossos problemas.

Basta rodar um comando e voilá, seu projeto está pronto só esperando fazer o que é necessário: **codar**.

O desenvolvedor satisfeito com a agilidade fica contente e inicia seu trabalho feliz com tudo isso, começa a criar componentes “reutilizáveis”, utiliza JSX, Typescript, Webpack, Sass, Styled Components e mais de milhares de dependências do nosso amado NPM.

Passa-se alguns dias e seu projeto vai para produção, mas será que a escrita da forma mais básica cumpre os princípios básicos de **significado** e **conteúdo**?

Bom, essa analogia demonstra a realidade de muitos de nós, pensamos nas melhores arquiteturas, tecnologias e abordagens de DevOps e o pobre e velho HTML, coitado, é deixado de lado.

Frameworks são excelentes ferramentas, **mas não são uma bala de prata**, devemos ter cuidados e prudência, afinal você não precisa de um canhão para matar uma formiga.

### Uma tendência

Atualmente a maioria dos projetos web tem alguma lib ou framework de javascript por trás, por um lado isso é excelente, a web evoluiu e fazer frontend não é a mesma coisa do que 10 anos atrás.

Lembro dos dias áureos de Dreamwever, CSS puro e VanillaJS. Era muito difícil fazer certas coisas, hoje nossa realidade é bem mais simples, temos excelentes libs, como o React e VueJS para construir componentes reutilizáveis.

Essas libs por sua vez possuem frameworks para deixar o desenvolvimento, digamos **“vitaminado”**, e, ser mais rápida a produção de nossas apps.

O problema é que a maioria desses frameworks possuem erros grotescos de html, ao ponto de renderizar um componente de select, por exemplo, com várias divs aninhadas.

Um exemplo do framework Vuetify com o componente select:

```
<v-select :items="items" label="Standard"></v-select>
```

Aparentemente é um componente simples e elegante, mas qual é sua saída no código HTML? Sua saída é parecida com isso:

```
<div class="v-input theme--light v-text-field v-text-field--is-booted v-select"></div>  <div class="v-input__control">    <div role="button" aria-haspopup="listbox" aria-expanded="false" aria-owns="list-1359" class="v-input__slot">      <div class="v-select__slot">          <label for="input-1359" class="v-label theme--light" style="left: 0px; right: auto; position: absolute;">Standard</label>          <div class="v-select__selections">              <input id="input-1359" readonly="readonly" type="text" aria-readonly="false" autocomplete="off">          </div>          <div class="v-input__append-inner">              <div class="v-input__icon v-input__icon--append">                <i aria-hidden="true" class="v-icon notranslate mdi mdi-menu-down theme--light"></i>              </div>          </div>          <input type="hidden">      </div>        <div class="v-menu"></div>    </div>    <div class="v-text-field__details">        <div class="v-messages theme--light">            <div class="v-messages__wrapper"></div>        </div>    </div>  </div></div>
```

Já no bom e velho HTML, o componente de select se parece com isso.

```
<select>  <option>Selecione uma opção</option>  <option>1</option>  <option>2</option>  <option>3</option></select>
```

**Simples, não?  
**Exemplos assim, estão recheados aos montes pela web. A WebAIM uma empresa que presta treinamentos e consultorias sobre acessibilidade web, realizou no ano de 2019 uma pesquisa onde mapeou 1 milhão de páginas e detectou problemas relacionados a acessibilidade. E pasmem, a maioria dos problemas não era coisas hiper complexas, mas extremamente simples.

Abaixo uma tabela demonstrando os problemas mais recorrentes nas páginas.

![Tabela com amostragem da pesquisa realizada pelo WAI, disponível em https://webaim.org/projects/million/#intro](https://cdn-images-1.medium.com/max/800/1*UwX1C6BHTV1SHyyF690PxQ.png)

Fica nítido uma coisa, **temos um problema gritante com a semântica e estrutura**

### HTML semântico

Quando falamos sobre semântica, estamos falando sobre o conteúdo ter significado. Assim como um livro ou TCC respeita uma estrutura lógica de hierarquia de informação o HTML também possuí.

Nele podemos marcar corretamente: _datas, cabeçalhos, sessões, citações longas e curtas, parágrafos, ênfase_ e diversos outros recursos.

Um dos grandes problemas na web não é a falta de acessibilidade, mas escrita incorreta de **HTML, CSS e Javascript**.

O nosso problema é que não conseguimos fazer o básico bem feito e logo queremos usar frameworks para resolver nossos problemas…

Muitos desenvolvedores não conseguem escrever um HTML semântico, mas sabem criar um componente super complexo que um componente nativo do HTML resolveria.

Eu sempre tenho um mantra comigo: **Sempre utilize componentes nativos. SEMPRE!**, mas existem casos que não é possível, nossa função é informar que não utilizando um componente nativo podemos perder em semântica, acessibilidade, posicionamento e até mesmo grana.

Essa semana a [Talita Pagani](https://twitter.com/talitapagani) iniciou uma conversa no twitter sobre o mesmo tema. Você pode ver um trecho logo abaixo.

> [](https://twitter.com/talitapagani/status/1255190328690311169?ref_src=twsrc%5Etfw%7Ctwcamp%5Etweetembed%7Ctwterm%5E1255190328690311169%7Ctwgr%5E&ref_url=https%3A%2F%2Fbrunopulis.com%2Fdev%2Frepensando-sobre-o-html%2F)

Thread sobre estrutura semântica do HTML

Esse assunto no Twitter me fez lembrar de outra conversa com o [Reinaldo Ferraz](https://twitter.com/reinaldoferraz) em um Brazil JS. Estávamos falando sobre o estado atual da acessibilidade web no Brasil e os avanços que temos feito. Ele disse uma frase que me marcou muito:

> **_Estamos em um momento que as pessoas precisam reaprender como escrever HTML. Só assim, conseguiremos tornar a web mais inclusiva._**

### Conclusão

A minha dica é desacelerar e voltar a base, não adianta nada saber os melhores frameworks e técnicas de desenvolvimento frontend, sendo que, o **essencial** não está bem fundado.

Isso me lembra a Parábola dos dois fundamentos, segue um trecho:

> _Todo aquele, pois, que escuta estas minhas palavras, e as pratica, assemelhá-lo-ei ao homem prudente, que edificou a sua casa sobre a rocha; E desceu a chuva, e correram rios, e assopraram ventos, e combateram aquela casa, e não caiu, porque estava edificada sobre a rocha. E aquele que ouve estas minhas palavras, e não as cumpre, compará-lo-ei ao homem insensato, que edificou a sua casa sobre a areia; E desceu a chuva, e correram rios, e assopraram ventos, e combateram aquela casa, e caiu, e foi grande a sua queda. (Mateus 7:24–27)_

Uma fundação com estrutura sólida nos dá segurança e confiança, mas uma fundação sem segurança e instável é passível de diversas falhas.

A fundação HTML, CSS, Javascript devem ser sólidas, frameworks vem e vão. Que tal refletirmos e escrevermos de forma semântica?

### Conteúdos relevantes

Separei alguns links para aprender a escrever HTML semântico, espero que os ajude.

-   [Recomendações de acessibilidade](http://emag.governoeletronico.gov.br/cursodesenvolvedor/desenvolvimento-web/recomendacoes-de-acessibilidade-definicao.html)
-   [HTML5 and CSS fundamentals](https://www.edx.org/course/html5-and-css-fundamentals)
-   [HTML5 Coding Essentials and best pratices](https://www.edx.org/course/html5-coding-essentials-and-best-practices)
-   [Referência da MDN sobre HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML)

### Referências

-   [Referência da MDN sobre HTML](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
-   [Pesquisa WebAIM](https://webaim.org/projects/million/)
-   [Vuetify Select](https://vuetifyjs.com/en/components/selects/)