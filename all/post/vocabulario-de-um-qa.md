---
title: "Vocabulário de um QA"
date: "2020-08-18"
categories: 
  - "qualidade-de-software"
---

> Este artigo é uma tradução e adaptação livre do artigo "QA Testing Vocabulary" que pode ser acessado no [blog](https://www.mindfulqa.com/qa-vocabulary/). O autor foi notificado e houve permissão para realizar a tradução.

Se você trabalha em um time onde exista um QA, com certeza já se deparou com ele dizendo vários jargões técnicos, não é mesmo?

Pensando nisso, foi criado esse mini dicionário para entendermos cada jargão e dar sua devida importância.

Quando o time aumenta a compreensão desse vocabulário, fica mais fácil de entender cada etapa e alinhar as expectativas de cada parte. Então vamos lá?

Essa lista deve ajudá-lo a ter uma compreensão básica do vocabulário que um QA usa no seu cotidiano.

## Tipos de teste

- **Teste manual:**  significa testar o aplicativo ou site manualmente. Por exemplo, abrir um navegador e navegar manualmente para diferentes seções de um site, procurando por problemas de [experiência do usuário](https://www.mindfulqa.com/what-is-user-experience) ou bugs. (Para mais informações, consulte [O que é teste manual?](https://www.mindfulqa.com/what-is-manual-testing);

- **Teste automatizado** significa usar uma linguagem de programação (como Java) para escrever scripts que irão navegar em um site ou aplicativo. Esses scripts podem gerar relatórios para problemas como links quebrados, texto ausente, etc. (para mais informações sobre as diferenças entre manual e automatizado, consulte [Teste manual vs. automatizado](https://www.mindfulqa.com/manual-vs-automated);

- **[Teste de API](https://www.mindfulqa.com/api-testing-services)** significa verificar a qualidade/precisão de uma API. As APIs enviam solicitações e respostas de/para servidores remotos.

- **[O teste de desempenho](https://www.mindfulqa.com/performance-testing):**  envolve verificar o tempo de resposta de um aplicativo ou site em cenários de uso típicos;

- **O teste de carga:** é muito semelhante ao teste de desempenho, mas com ainda mais foco em encontrar o ponto exato em que um aplicativo ou site travaria, ou cairia.

## Métodos de teste

- **O Teste de Aceitação do Usuário (UAT):** significa fazer com que usuários reais testem o beta de seu aplicativo ou site e forneçam feedback;

- **Teste de acessibilidade**  significa verificar se o aplicativo ou site é amigável para todas as pessoas. Por exemplo, verificar se os vídeos possuem legendas para pessoas com deficiência auditiva ou se as imagens têm descrições para pessoas com deficiência visual;

- **Teste de unidade (unitários):** significa criar scripts automatizados para testar partes individuais do aplicativo ou código do site. Embora seja uma forma de teste, o teste de unidade geralmente é feito por desenvolvedores. O objetivo dos testes de unidade é garantir que cada área do código esteja funcionando corretamente;

- **Teste Ad-hoc:** significa testar um aplicativo ou site sem seguir nenhum caso de teste específico. Em vez disso, o QA vasculhará o aplicativo à vontade, identificando quaisquer problemas que detectar durante o processo;

- **Teste exploratório:** significa testar com a experiência e conhecimento existentes do aplicativo móvel ou site. Esse insight dá ao QA a capacidade de ter um envolvimento focado sem seguir casos de teste formais.

## Testes básicos

**Smoke test**: é uma das formas mais rápidas/básicas de testar. Envolve fazer um teste simples dos principais recursos, geralmente logo antes do lançamento. O objetivo é verificar se alguma coisa “pega fogo”, por assim dizer.

Ele é usado como um backup para ser extremamente cauteloso quando não há tempo suficiente para o nível ideal de teste.

O smoke test é uma das frases mais comuns no vocabulário de um QA. Saiba mais em nosso artigo: [O que é teste de fumaça?](https://www.mindfulqa.com/what-is-smoke-testing)

## Testes detalhados

**O teste de regressão** é muito mais completo do que o _smoke test_. Uma regressão envolve a verificação de todos os aspectos possíveis das features pré-existentes do aplicativo após a implantação de uma nova feature ou correção de bug. Isso é para garantir que as atualizações de código não prejudiquem nenhuma outra área do software;

**Cross browser/cross-device**  significa que o teste está sendo feito, ou um bug está ocorrendo, em vários navegadores de internet (como Safari, Chrome, Firefox, Internet Explorer, etc) ou vários dispositivos (Androids, iPhones, tablets, desktops, etc).

O teste entre navegadores/dispositivos é importante, pois muitos bugs estarão em um navegador ou dispositivo, mas não em outro.

## Planejamento

**Casos de teste** são requisitos com etapas para testar se uma determinada parte do aplicativo ou site está funcionando corretamente. Se isso soar vago ou confuso, não se preocupe - temos uma explicação completa (com exemplos!) Em nossa postagem [O que são casos de teste de controle de qualidade?](https://www.mindfulqa.com/test-cases)

**Test Suite** é um conjunto de casos de teste. Por exemplo, você pode ter casos de teste para a seção de registro, a página inicial, a reprodução de vídeo, etc. Um conjunto de testes é uma planilha que consiste em todos esses diferentes casos de teste.

**Sprint** é um determinado período de tempo em um processo de QA Agile. Um sprint inclui um determinado número de tarefas que a equipe espera concluir no prazo (geralmente uma a duas semanas).

Antes do início de um Sprint, a equipe se reúne para o Planejamento do Sprint. Durante esta sessão, gerentes de produto, desenvolvedores e QA's decidirão quais correções de bug ou features podem ser incluídos de forma realista no Sprint. Para saber mais sobre o processo de priorização, consulte [Como priorizar correções de bugs](https://www.mindfulqa.com/prioritize-bugs).

## Processo

**Agile** é um processo de desenvolvimento de software que envolve lançamentos regulares. Também envolve a atualização de requisitos em tempo real. Ao trabalhar com um processo Agile, é comum que novos lançamentos / atualizações sejam lançados a cada poucas semanas. Para saber mais, consulte nosso artigo sobre o [Processo de controle de qualidade](https://www.mindfulqa.com/agile-qa) do [Agile](https://www.mindfulqa.com/agile-qa).

**Os critérios de aceitação**  são um conjunto de condições que devem ser atendidas para que um recurso seja considerado pronto para liberação. Com um processo ágil, as condições exatas podem mudar instantaneamente. Afinal, as equipes Agile giram em torno de novas informações ou ideias. No entanto, para considerar o recurso concluído, o conjunto final de critérios de aceitação deve ser atendido.

Por exemplo, aqui estão os critérios de aceitação para um recurso de mensagens:

- Os usuários premium devem ser capazes de enviar mensagens a qualquer usuário de sua lista de amigos;

- Todos os usuários devem ser capazes de bloquear qualquer usuário;

- Os usuários administradores devem ser capazes de excluir uma mensagem;

- Todos os usuários devem ter seções "caixa de entrada" e "enviado".

**Especificações** (abreviação de especificações) são documentações ou recursos que descrevem como um aplicativo ou site deve se parecer ou se comportar. Por exemplo, um testador pode pedir “especificações de design” para se certificar de que as imagens e o layout correspondem às expectativas.

**Os requisitos** são essencialmente os mesmos que as “especificações” - documentação que detalha todas as informações sobre um recurso. Isso permite que os desenvolvedores criem e testem os detalhes corretos.

**O Desenvolvimento Orientado a Comportamento** usa uma linguagem chamada Gherkin para documentar os requisitos. Esses requisitos se tornam a base para testes automatizados. Gherkin usa um formato de “Dado, Então, Quando” que ajuda os membros da equipe menos técnica a entender o recurso.

Por exemplo:

```
Dado um usuário quiser postar em Facebook
Quando se digita a mensagem e clique em “publicar”
Então seus amigos podem ver o post
```

**Usuários** (ou “usuários finais”) são as pessoas que usam seu aplicativo ou site. Por exemplo, seus clientes ou clientes.

## Lançamentos

**MVP** significa Mínimo Produto Viável. Para uma versão de um aplicativo ou site ser “MVP”, ela precisa atender aos critérios que a equipe decidiu ser o mínimo necessário para o lançamento.

Por exemplo, o proprietário de uma empresa pode decidir que uma seção de GPS de um aplicativo é um “recurso MVP”, o que significa que deve ser incluída mesmo para um lançamento suave. Eles também podem decidir que um recurso de vídeo é “Pós-MVP”, o que significa que pode ser adicionado após o lançamento inicial.

**Candidato a lançamento (release)**  é uma versão que está pronta para ser lançada ao público, assumindo que nenhum bug importante seja encontrado durante o teste.

Por exemplo, digamos que você queira que a próxima versão de seu aplicativo iOS apresente novo conteúdo. Você também deseja incluir uma correção de bug na seção “favoritos”. Os desenvolvedores enviarão um novo build ao QA como um “candidato a lançamento” assim que concluírem a atualização do conteúdo e a correção do bug. Se o QA encontrar algum bug significativo, o build não é mais um candidato a lançamento. Por outro lado, se o QA não encontrar nenhum bug notável, ele está pronto para ser lançado.

**Código completo** significa que os desenvolvedores concluíram a implementação da correção do bug ou do novo recurso. Isso significa que ele está pronto para o controle de qualidade ou estará em breve, quando o código for implantado. “Código completo” não significa que a nova versão não terá bugs. Na verdade, provavelmente vai! O trabalho do QA é verificar a validade e a qualidade assim que a primeira passagem do desenvolvedor for concluída.

## Qualidade

Por exemplo, um site que leva dois minutos inteiros para carregar seria um bug bastante simples. Mas se uma empresa deseja que a cor de fundo seja azul e apareça como verde, isso também seria um bug (mesmo que não pareça ruim para os usuários).

**Relatórios de bugs** são formas formais de documentar problemas com um aplicativo ou site. Os relatórios de bugs são geralmente arquivados como 'tickets' em um sistema de gerenciamento de projeto como o [Jira](https://www.atlassian.com/software/jira).

Para saber mais sobre relatórios de bugs e ver exemplos, confira nossa postagem sobre [Melhores práticas para relatar bugs](https://www.mindfulqa.com/bug-reports).

**Showstopper** é um bug absolutamente crítico. Se o controle de qualidade encontrar qualquer obstáculo em uma nova versão de um build de teste, ele não deve ser lançado ao público. Showstoppers são considerados prioridade para os desenvolvedores corrigirem - especialmente se forem encontrados em uma versão ao vivo.

Por exemplo, se um aplicativo móvel travar consistentemente sempre que os usuários se inscrevem, isso seria considerado um bug bloqueador.

**Blocker** é essencialmente a mesma coisa que showstopper (veja acima). Um bug bloqueador impede um novo lançamento.

**Erros de casos extremos** acontecem apenas em raras situações. Isso pode significar apenas em um sistema operacional ou dispositivo antigo, ou ocorrendo apenas 1 em 200 vezes. A priorização para casos extremos geralmente é baixa. Em muitos casos, os casos extremos ficarão permanentemente no backlog.

Por exemplo, digamos que 99,9% de seus usuários estejam no iOS versão 10 e superior. Um caso extremo pode ser um bug de formatação no iOS 9, que afetaria apenas 0,01% dos usuários.

**Defeitos** são problemas em um aplicativo ou site que não atendem aos critérios de aceitação (veja acima). Por exemplo, talvez um fundo tenha o tom errado de azul. Isso não pareceria necessariamente um “bug” para usuários reais. Mas porque não atende aos requisitos da empresa para o projeto, seria um "defeito".

**Hot Fix** é uma correção de bug crítica que precisa ser lançada antes da próxima data de lançamento agendada.

**Experiência do usuário** se refere à qualidade da experiência e das interações que um usuário tem com um aplicativo ou site. Um aplicativo pode ter uma experiência ruim para o usuário sem ser explicitamente “bugado”.

Por exemplo, digamos que você tenha uma seção de registro em um aplicativo iOS. Talvez cada campo funcione corretamente e os usuários consigam salvar e registrar-se com sucesso. Mas se um usuário tiver que ir para uma nova tela sempre que terminar um campo (em vez de ter vários campos em uma página), isso seria uma experiência ruim para o usuário.

“Experiência do usuário” é um tópico importante no vocabulário de teste de controle de qualidade de qualquer pessoa. Para saber mais, consulte [O que é experiência do usuário?](https://www.mindfulqa.com/what-is-user-experience)

**Feature**  é um serviço ou funcionalidade em um aplicativo ou site. Por exemplo, poder 'curtir' tweets é um recurso do Twitter.

## Você chegou ao final do nosso vocabulário de QA - parabéns!

Embora essas definições não sejam exaustivas, agora você conhece os termos mais comuns de um profissional de qualidade.
