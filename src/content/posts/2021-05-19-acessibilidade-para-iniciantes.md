---
title: Acessibilidade para iniciantes
pubDate: 2021-05-19
tags: ['a11y']
---

## **Importante**

Este artigo foi originalmente escrito por [Karina Chow](https://karomancer.medium.com/) e traduzido e adaptado por mim. Houve a autorização da autora para realizar a tradução.

---

No mundo atual da computação ubíqua e no desejo de todo o setor de melhorar a diversidade e inclusão de empresas e produtos, não há mais uma desculpa para não investir em acessibilidade na web. Dito isso, começar a acessibilidade na web pode ser uma tarefa difícil. É difícil saber por onde começar e o que você pode fazer agora para melhorar seu produto!

Quando eu estava começando, estava muito confusa e sentia que estava constantemente pesquisando definições no Google. Felizmente para mim, eu tinha uma colega que era muito qualificado e respondeu implacavelmente a muitas das minhas perguntas. Agora, se você me permitir, gostaria de ser seu colega e apresentar uma introdução abrangente à acessibilidade na web.

Se você trabalha com produtos e gostaria de defender a acessibilidade na web, mas não sabe por onde começar, este é o guia para você!

> Se você – ou a liderança da sua empresa – ainda precisa ser convencido de por que vale a pena gastar tempo ou dinheiro em acessibilidade, recomendo a leitura do guia sobre [Como convencer a liderança da empresa a se preocupar com a acessibilidade](https://uxdesign.cc/why-should-i-care-about-web-accessibility-a-guide-to-convincing-management-to-care-d8cc372c12fa).

## O que é acessibilidade web?

Ser acessível significa que sites, ferramentas e tecnologias são projetados e desenvolvidos para que pessoas com deficiência possam usá-los. Dizemos que deve ser **P**.**O**.**U**.**R** .: Perceptível, Operável, Compreensível e Robusto. Voltaremos ao que tudo isso significa mais profundamente em um momento!

## O que é a11y?

Existem onze letras entre o **A** e **Y** na palavra _accessibility_, então as pessoas começaram a abreviá-la como a11y. Tem a vantagem adicional de se parecer com a palavra aliado, por isso as pessoas às vezes a usam como tal. Na maioria das vezes, ouço as pessoas dizerem em voz alta como “a-eleven-y”, mas nesse ponto você também pode dizer “acessibilidade”!

![A palavra a11y é o termo usado em inglês para 'accessibility'](@assets/images/blog/a11y.png)

Fonte: The A11y Project

## Quem define o que é acessível ou não?

As [Diretrizes de Acessibilidade de Conteúdo da Web](https://www.w3.org/WAI/standards-guidelines/wcag/) (WCAG) são o norte quando se trata em medir quão acessível o seu produto digital é. Elas foram criadas pelo  [World Wide Web Consortium](https://www.w3.org/Consortium/) (W3C), o mesmo grupo que define os padrões web para interatividade, internacionalização, segurança, computação mobile e muito mais. Estes são os padrões internacionais que todos os nossos navegadores seguem.

No contexto americano, se você receber uma ação judicial da ADA, muitas vezes será citada que seu site não está em conformidade com a WCAG como evidência objetiva de sua falta de acessibilidade.

No Brasil, temos a Lei Brasileira de Inclusão, ou **LBI**, que regulamenta as questões que envolvem acessibilidade no contexto digital.

## Como as pessoas podem tentar interagir com meu site?

Assim como a conformidade com [HIPAA](https://seginfo.com.br/2021/01/29/hipaa-explicado-definicao-conformidade-e-violacoes/) é um padrão em constante mudança conforme o setor de saúde e a Internet se expandem, a conformidade com WCAG também está sempre evoluindo e não está confinada a uma pequena lista de **TODOs** do tipo definir e esquecer. Uma equipe não pode “resolver” a acessibilidade em uma empresa; em vez disso, eles devem se comprometer a lidar com isso continuamente.

O padrão WCAG mais recente (no momento da redação deste artigo em 2021) é WCAG 2.1. A WCAG é medida com **três níveis de conformidade**, de A (mais baixo), AA, a AAA (mais alto). Para medir a acessibilidade do seu site, você mede o quão compatível ele é com qualquer um desses níveis WCAG.

![](@assets/images/blog/compliance.png)

“Conformidade WCAG 2.1 AA” significa “Precisamos aderir ao padrão WCAG 2.1, com conformidade duplo A”

Por exemplo, para [mídia baseada em tempo](https://www.w3.org/TR/WCAG21/#time-based-media), aqui estão alguns exemplos das diferenças entre os níveis de conformidade:

- **A – “Conformidade mínima”** – Legendas para vídeo/áudio pré-gravado, alternativas fornecidas para vídeo/áudio pré-gravado (por exemplo, transcrições);
- **AA – “Conformidade aceitável”** – Tudo em A legendas para vídeo/áudio ao vivo, narrações adicionais fornecidas durante o vídeo pré-gravado;
- **AAA – “Optimal Compliance”** – Tudo em AA e interpretação em linguagem de sinais para vídeo, narrações mais detalhadas fornecidas durante e em pausas para vídeo pré-gravado, transcrições ao vivo
  Ao estabelecer metas de acessibilidade, pode ser aconselhável definir o nível de conformidade que você gostaria de atender, para que todos que trabalham no projeto possam trabalhar para a mesma meta.

Se você não sabe qual nível de conformidade seguir, a conformidade WCAG 2.1 AA é considerada aceitável e cobrirá a grande maioria dos casos de uso.

## Quais são os diferentes tipos de deficiência?

Ao projetar seu produto para a web, você provavelmente está sempre imaginando uma pessoa com um teclado e um mouse. No entanto, diferentes tipos de deficiência proíbem as pessoas de interagir com seu produto dessa maneira tradicional.

## Com quais ferramentas as pessoas podem acessar a internet?

As deficiências mais comumente consideradas são as deficiências visuais, mas existem muitas outras categorias, todas as quais você deve considerar ao tornar seu produto acessível:

- Visual – cegueira, daltonismo, baixa visão, glaucoma;
- Audição – surdez, deficiência auditiva;
- Motora – Controle de motor fino limitado;
- Cognitiva – Focalização difícil, dificuldades de aprendizagem;
- Convulsões.

## Como devo considerá-los ao testar meu produto digital?

Diferentes tipos de deficiências ditam como você pode acessar e interagir com os sites. Uma lista com algumas alternativas populares:

- **Teclado
  **Algumas pessoas não utilizam o mouse somente o teclado. Isso é comum entre pessoas com deficiências motoras que não conseguem operar os movimentos finos que um mouse exige.
- **Leitores de tela
  **Tecnologia assistiva que lê o que está na tela, mais comumente usada por pessoas com cegueira ou baixa visão. Normalmente operado usando apenas um teclado.
- **Zoom do Browser** (idealmente, suporte até 200%)
  Pessoas com deficiência visual podem usar o recurso de zoom em seus navegadores para compreender melhor o texto e ver as imagens.
- **[Estilos customizados](https://webaim.org/techniques/css/)**
  Pessoas com baixa visão ou daltonismo podem ter suas próprias folhas de estilo personalizadas para ajustar estilos como tamanho e cor da fonte

## Como aprendo a usar um leitor de tela?

Muitas pessoas veem “acessibilidade” e imediatamente consideram isso “uso do leitor de tela”. O fato é que você não precisa aprender a usar um leitor de tela para tornar seu produto acessível. As diretrizes WCAG são detalhadas o suficiente para que você possa simplesmente segui-las e usar a navegação do teclado para testar a maioria das coisas. E, como aprendemos acima, há muitas maneiras de um usuário usar seu site, além de um leitor de tela.

Dito isso, pessoalmente acho útil aprender a usar um leitor de tela porque ele pode ajudar a desenvolver empatia em você pelo que os usuários que os usam passam e pode ajudar a identificar fluxos de produtos insatisfatórios. As diretrizes podem ensiná-lo a marcar seu HTML corretamente e dar bons conselhos sobre como projetar com acessibilidade em mente, mas nada ilustra verdadeiramente como seu produto pode ser confuso do que ouvir seu conteúdo lido em voz alta em uma ordem sem sentido. Para esse propósito, eu gosto de recomendar que as pessoas pelo menos tentem aprender o básico.

Existem muitas ferramentas interessantes online para ensinar a proficiência básica do leitor de tela. Eu recomendaria este guia [Codecademy](https://www.codecademy.com/articles/how-to-setup-screen-reader) sobre como inicializar um leitor de tela pela primeira vez. Dependendo de qual leitor de tela você usa, também há guias para cada um individualmente. O [VoiceOver](https://www.apple.com/voiceover/info/guide/_1121.html) do Mac OSX tem muita documentação e também há [este glossário de comandos](https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts) que é útil. O [JAWS](https://www.freedomscientific.com/products/software/jaws/) é muito popular para Windows e também tem [uma boa lista de comandos](https://support.freedomscientific.com/Content/Documents/Manuals/JAWS/Keystrokes.pdf).

Depois de aprender um pouco, você pode praticar suas coisas neste divertido guia prático.

## Os sites devem ser P.O.U.R

Vamos circular todo o caminho de volta à nossa declaração inicial. De acordo com as WCAG, existem [4 Princípios da Acessibilidade](https://www.w3.org/TR/UNDERSTANDING-WCAG20/intro.html#introduction-fourprincs-head) que todo produto deveria aderir a:

1. **Perceptível** — as informações precisam estar disponíveis para pelo menos um sentido (visão, audição, tato);
2. **Operável** — um usuário deve ser capaz de realizar todas as ações da interface (ou seja, com um teclado);
3. **Compreensível** — um usuário deve entender o idioma em uma página e como operá-lo;
4. **Robusto** — diferentes agentes de usuário, incluindo tecnologias assistivas, o conteúdo deve ser capaz de acessar todo o conteúdo.

O principal objetivo dos entusiastas de acessibilidade é atingir todos os quatro itens para todos os tipos de deficiência e tipos de dispositivos de entrada. Conforme mencionado anteriormente, existem muitos tipos de deficiência e mais dispositivos de entrada estão sendo inventados o tempo todo, então é uma missão para toda a vida, em vez de um objetivo único.

Espero que você se sinta um pouco menos assustado com o mundo da acessibilidade na web. Gostaria de agradecer a [Jenna Lee](https://www.linkedin.com/in/jnl3/), aquela colega que me ensinou praticamente tudo o que sei.

Fique atento para artigos futuros sobre como incorporar o trabalho de acessibilidade em seus ciclos de vida de produto, bem como instruções mais acionáveis sobre o que fazer em suas bases de código. Desejo-lhe boa sorte e obrigado pelo seu interesse em ser um defensor da acessibilidade!

## Recursos adicionais

Gostaria de aprender ainda mais? Aqui estão alguns ótimos recursos:

- [Google’s A11ycasts](https://www.youtube.com/playlist?list=PL7Bjl0Cb4SboBHNihVBRd-AdctfXcmClc), uma série de vídeos ensinando o básico de acessibilidade pelo time de desenvolvimento da Google;
- [WCAG 2.1 Guidelines](https://www.w3.org/TR/WCAG21/), versão atual das diretrizes de acessibilidade;
- [WebAIM](https://webaim.org/), muita informação de acessibilidade e até mesmo treinamentos de certificação;
- [Awesome A11y](https://github.com/brunopulis/awesome-a11y), uma lista com recursos sobre acessibilidade;
- [ANDI](https://www.ssa.gov/accessibility/andi/help/install.html), uma ferramenta de teste de acessibilidade automatizada para executar em suas páginas da web;
- [Lighthouse](https://developers.google.com/web/tools/lighthouse), uma ferramenta automatizada para SEO, acessibilidade e desempenho;
- [The A11y Project](https://www.a11yproject.com/), educação sobre como fazer designs acessíveis;
- [Mozilla’s a11y documentation](https://developer.mozilla.org/en-US/docs/Web/Accessibility), documentação sobre a11y fácil de compreender.