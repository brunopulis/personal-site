---
title: 5 motivos para não automatizar testes em linguagem diferente do time
date: 2020-11-16
draft: false
category: "Qualidade"
tags: ["automação"]
---
Automatizar cenários de teste é uma parte integrante de nossa atuação como profissionais focados em qualidade. Em um contexto ágil é de extrema importância, pois, contribui para promover e permear a qualidade no projeto.

A ideia por trás dos testes automatizados e simples: **otimizar nosso tempo**. Naturalmente existe uma tendência em aumentar a cobertura de testes automatizados, para focarmos em cenários mais complexos e de alto risco.

Em contrapartida, existe uma grande decisão ha ser tomada: qual ferramenta escolher, o que automatizar e como o time pode colaborar.

Neste artigo irei elencar alguns pontos para uma escolha consciente de ferramentas para automatizar nossos testes.

## Pontes ao invés de muros

![](images/pontes.webp)

[Imagem por creativeart](https://www.freepik.com/free-photo/wood-standing-blank-arms-crossed-understanding_1077755.htm#query=pontes&position=18&from_view=search) em Freepik

Deixa eu contar uma história, quando estava fazendo o **TSPI** do [Júlio de Lima](https://about.me/juliodelimas), chegamos a uma etapa do treinamento onde ele aborda sobre a prática de testes automatizados.

Empolgado com a aula, decidi aplicar no time que atuo. Nós decidimos que nossa _stack_ de desenvolvimento seria duas linguagens: **PHP** e **Javascript** e decidi automatizar em **Ruby**, pois estava estudando e gostando da linguagem.

Lembro de ter comentado com o Júlio, no princípio ficou contente pela minha conquista, mas me colocou uma pulga atrás da orelha com a seguinte pergunta:

> “Pulis, por que não automatizar na linguagem que o time usa?”

Começamos a conversar e me explicou detalhadamente que tudo depende do contexto. Colocar uma tecnologia desconhecida ao time iria criar mais uma **barreira** do que promover pontes.

O que eu fiz? Abandonei o Ruby e iniciei alguns experimentos com algumas bibliotecas nas linguagens do time.

## Stack de desenvolvimento

Uma das coisas mais importantes que devemos considerar e a **stack** que o time definiu, tratando-se em um contexto ágil **a responsabilidade de testar a aplicação não é somente do QA**, mas compartilhada com time.

Isto promove o empoderamento dos integrantes do time e aumenta a consciência sobre o aspecto da qualidade também, aumento o sentimento de “dono do produto”.

As autoras Janet Gregory e Lisa Crispin, dizem muito a respeito dessa responsabilidade do time em testar também. Essa citação exemplifica o conceito:

> O coração do teste ágil **envolve toda a equipe no teste** e construção de qualidade em nosso produto.

Para conseguirmos alcançar esse objetivo devemos ter uma **consciência de qualidade**, onde todos contribuem e são donos do produto.

Devemos atuar colaborativamente, ou seja, a linguagem de programação do projeto **deve ser a mesma**, pois assim, todos possam “conversar a mesma língua”.

Desenvolver testes automatizados em uma linguagem sem nenhum contexto, irá segregar os profissionais de qualidade e afastar eles do código da aplicação e gerar outros desdobramentos que iremos pontuar a seguir.

Separei cinco pontos nocivos, sobre automatizar cenários de teste em uma linguagem diferente ao que o time utiliza.

### 1 – Curva de aprendizado

Ao usarmos uma linguagem diferente, a curva de aprendizado pode ser muito maior para os profissionais de qualidade. Cito alguns pontos que podem ser nocivos:

- tempo de aprendizagem;
- aprendizado do ecossistema em torno da linguagem;
- falta de alguém como referencial no time;
- falta de suporte;
- segregação implícita dos QAs com o resto do time.

### 2 – Baixa produtividade

Outro ponto importantíssimo é a **produtividade**. Em um mundo onde tudo tem urgência, ter foco e produtividade é essencial para o sucesso dos produtos e/ou serviços que desenvolvemos.

Com uma nova linguagem em mãos a produtividade pode cair consideravelmente, pois, o profissional não teria domínio e nem _especialização_ na mesma.

Outro ponto que deveríamos levar em consideração é que a etapa de testes não deveria ser um gargalho para finalizar uma versão do produto ou ser algo impeditivo.

Até o profissional de qualidade compreender a linguagem e pegar a “maldade” demanda tempo e em muitos cenários nosso tempo é bem escasso.

### 3 – Segregação dos testes

Ao usar essa abordagem, a responsabilidade do teste fica inteiramente na mão do QA, reforçando uma má prática no contexto ágil. Essa má prática pode ocasionar em:

- desconforto do time em relação à segregação;
- antipatia entre devs e analistas de qualidade;
- falta de engajamento do time;
- separação por silos, indo contra os princípios da agilidade;
- falta de colaboração do time nos testes;
- base de conhecimento somente nas mãos de pessoas específicas.

### 4 – Maior esforço para manutenção

O esforço em manutenção iria aumentar consideravelmente. Numa squad com cinco desenvolvedores e um QA, todos poderiam dar manutenção e prover novas melhorias.

No cenário desenhado anteriormente a carga de manutenção dos scripts automatizados ficaria somente nas mãos do QA, podendo assim, trazer uma quantidade de trabalho muito grande e gerando gargalos em suas atividades.

Outro ponto importante é a sensação de não ter tempo para melhorar os scripts, engana-se quem pensa que scripts de testes uma vez desenvolvidos nunca mais são tocados.

Assim como, um código de uma aplicação scripts automatizados são passíveis de refatoração e manutenção, **eles são parte integrante do código da aplicação**.

### 5 – Pipelines isoladas

A etapa de integração e entrega contínua é uma das mais importantes para um time ágil. Geralmente são construídas _pipelines_ para realizar essas atividades.

Quando automatizamos em uma linguagem que não é falada pelo time, criamos uma série de possíveis problemas, tais como:

- maior custo de infraestrutura;
- arquitetura da pipeline pode ficar bastante complexa;
- construção de uma nova estrutura de pipeline;
- time desconhece a linguagem não podendo contribuir;
- aumento de trabalho para os _DevOps_.

## Considerações finais

Automatizar testes é uma etapa importante de um processo de qualidade, mas deve ser alinhado com o time e sempre procurar essa responsabilidade entre os membros.

Ao segregar os testes essa responsabilidade cai nas mãos de uma única pessoa, trazendo diversos problemas como os que foram citados anteriormente.

Devemos sempre tentar optar por linguagens falada por todos, pois, linguagens de programação também são uma forma de comunicação.

Acredito que a regra de ouro nesse assunto seria **tudo depende do seu contexto**.

Agora é com você:

Quais são os seus pensamentos sobre o assunto? Gostaria muito de saber sua opinião.

## Referências

- [TSPI](https://hotmart.com/product/treinamento-de-testes-de-software-para-iniciantes)
- [Júlio de Lima](https://about.me/juliodelimas)
