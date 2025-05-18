---
title: "Use a cabeça, teste acessibilidade"
date: "2024-05-02"
tags: 
  - "30"
---

## Indicações e links de afiliados

Semana passada compartilhei uma lista de [5 livros para aprender acessibilidade](https://www.instagram.com/p/C6G0SGZObC-/?img_index=1) no Instagram.

Dos cinco livros, eu escolheria para começar: [Acessibilidade na Web](https://amzn.to/3Ulpfy1) e [Gaia: Um Guia de Recomendações Sobre Design Digital Inclusivo para Pessoas com Autismo](https://amzn.to/466kOwh)

Ontem, gravei um episódio para o podcast [Foco Acessível](https://focoacessivel.com.br/), foi uma conversa muita interessante, em breve estará disponível.

Também estou refazendo meu site com o Eleventy, a ideia de criar um site estático voltou com tudo.

Mas vamos ao que interessa.

Navegando essa semana, encontrei [um repositório no Github](https://github.com/AFixt/apg-gherkin) que usa critérios de aceites escritos em Gherkin.

Pessoalmente detesto Gherkin, mas isso é um assunto para outra carta.

O interessante dessa abordagem é:

- A clareza dos requisitos;

- Informações objetivas;

- Facilidade para descrever o comportamento;

- Previsibilidade do funcionamento do componente;

A W3C possui um site chamado [_**Authoring Pratices Guide**_ (APG](https://www.w3.org/WAI/ARIA/apg/)), ele é uma coletânea de componentes com todas as especificações de acessibilidade.

> Por que isso importa? Esse guia ajuda muito, quando você estiver implementando e não tem muito domínio ou não sabe por onde começar.

Trouxe o componente _**<button>**_ para pensarmos em alguns cenários juntos.

Os cenários para esse componente são:

**Funcionalidade: Interação e acessibilidade de botões**  
Como usuário de um site com componentes de botões  
quero poder ativar os botões usando o teclado e entender seu estado  
Para que eu possa interagir com o site de forma eficaz

**Cenário: Ativar um botão**  
**Dado** que um botão está presente na página  
**Quando** eu me concentro no botão  
**E** pressiono “Enter” ou “Espaço”  
**Então** o botão deve ser ativado

**Cenário: Uso de um botão de alternância para um player de vídeo**  
**Dado** que um botão de alternância está presente no player de vídeo  
**Quando** pressiono o botão de alternância  
**Então** o estado aria-pressed do botão deve refletir seu estado atual  
**E** o rótulo do botão de alternância não é alterado

Exemplos:

- Label do botão: **ativar,** estado: **true;**

- Label do botão: **desativado,** estado: **false;**

Dessa forma, fica muito mais claro testarmos os componentes, fazendo um pequeno exercício temos vários cenários que podemos testar.  
No caso do Toggle Button, podemos validar:

1. Verificar se o atributo **aria-pressed** existe no elemento;

3. Verificar o estado inicial do **aria-pressed** tem o valor **false**;

5. Verificar se o rótulo tem o valor de **“Desativado”** por padrão;

7. Verificar quando pressionado, o **aria-pressed** mudar para **true**;

9. Verificar quando pressionado, o rótulo muda para **“Ativado”;**

11. Verificar quando desativar o botão, o estado deve retornar ao estado inicial.

**Percebeu, como conseguimos extrair seis cenários de testes bem interessantes?**   
O mais legal é que você pode explorar e usar na sua stack preferida.

* * *

## Garimpo da semana ⛏

### Notícias interessantes

- O [Arc Browser](https://arc.net/) está disponível para o Win 11, bora experimentar;

- [Popover API is Here](https://frontendmasters.com/blog/popover-api-is-here/).

### Projetos que vale a pena olhar 🧪

- [Patterns from the ARIA Authoring Practices Guide](https://github.com/AFixt/apg-gherkin) (APG);

- [Generate accessible UI colors from your base color tokens](https://github.com/5t3ph/a11y-color-tokens);

- [Accessibility code examples for Android, iOS, Flutter, React Native and Xamarin](https://github.com/appt-org/accessibility-code-examples);

- [Tinylytics](https://tinylytics.app/) — Web Analytics simples e prático.

### Curadoria de links 🔗

- [The Front End Developer/Engineer Handbook 2024](https://frontendmasters.com/guides/front-end-handbook/2024/);

- [ScreenAI: A visual language model for UI and visually-situated language understanding](https://research.google/blog/screenai-a-visual-language-model-for-ui-and-visually-situated-language-understanding/);

- [Own Your Web — Issue 14: Webmentions](https://buttondown.email/ownyourweb/archive/issue-14/).
