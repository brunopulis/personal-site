---
title: Novidades da WCAG 2.2
image: "/src/assets/images/blog/wcag22.webp"
imageAlt: ""
publishDate: 2023-07-22
category: "Acessibilidade"
url: https://brunopulis.com/wcag-2-2/
---

Se você descobriu a WCAG a pouco tempo, vim te contar que irá acontecer grandes **mudanças da WCAG 2.2**.

Semana passada, a **WCAG 2.2** mudou de status e passou para _**Proposed Recommendation**._

O objetivo nesse estágio é garantir que o documento tenha qualidade suficiente para se tornar um Padrão da W3C.

Iremos percorrer por suas novidades e o que irá impactar de forma prática nos testes de acessibilidade. Vamos lá?

## Comparação com a WCAG 2.1

A **WCAG 2.2**, vai continuar o bom trabalho da sua versão anterior. Dessa forma, a nova versão concentrou seus esforços em três grandes grupos:

- usuários com dificuldades cognitivas ou de aprendizagem;
- usuários com baixa visão;
- usuários com deficiências em dispositivos mobile.

### Curiosidades

A nova versão é compatível com a anterior, ou seja, um site que está em _compliance_ com a **WCAG 2.2** estaria também com a **WCAG 2.1**.

Um ponto interessante, o critério **4.1.1 Parsing** foi descontinuado na **WCAG 2.2**.

Bem como, o critério [2.4.7 – Foco visível](https://www.w3.org/TR/WCAG22/#focus-visible) se tornou uma **técnica obrigatória** de implementação.

## WCAG 2.2 e seus novos critérios

A **WCAG 2.2** incluiu 9 novos critérios de sucesso. Eles são:

- **2.4.11 Foco não obscurecido (mínimo) (Nível AA)**
- **2.4.12 Foco não obscurecido (aprimorado) (Nível AAA)**
- **2.4.13 Aparência do Foco (Nível AAA)**
- **2.5.7 Movimentos de Arrasto (Nível AA)**
- **2.5.8 Tamanho do Alvo (Mínimo) (Nível AA)**
- **3.2.6 Ajuda consistente (Nível A)**
- **3.3.7 Entrada Redundante (Nível A)**
- **3.3.8 **Autenticação Acessível (Nível AA)\*\*\*\*
- **3.3.9 **Autenticação Acessível (aprimorado) (Nível AAA)\*\*\*\*

Vamos explicar cada critério de sucesso e como atendê-lo.

### **[2.4.11 Foco não obscurecido (mínimo](https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum)**)

O critério 2.4.11 diz que o elemento que recebe foco não seja obscurecido pelo desenvolvedor. Embora existam algumas exceções como do sistema operacional e navegadores.

O foco será aplicado somente nos conteúdos que estão de fato focados. no momento.

#### Como atender 2.4.11

Para atender esse critério se faz necessário que o foco esteja **visível** e **perceptível** ao usuário, dessa forma, ele conseguirá interagir com os componentes.

O público mais beneficiado seria pessoas que utilizam o teclado, em especial, usuários com algum tipo de deficiência cognitiva ou de memória. Garantindo assim, que seja fácil de identificar os elementos focados.

### **[2.4.12 Foco não obscurecido (aprimorado)](https://www.w3.org/TR/WCAG22/#focus-not-obscured-enhanced)**

O critério 2.4.12 é o mesmo que o 2.4.11, exceto que é menos permissivo. O critério falha se **qualquer parte** do elemento focado esteja obscurecido.

### **[2.4.13 Aparência do Foco](https://www.w3.org/TR/WCAG22/#focus-appearance)**

O critério 2.4.13 exige que o **“indicador de foco”** seja visualmente claro e conciso.

Possui relação com os critérios: **2.4.7 – Foco visível** e **1.4.11 – Contraste não textual**. Entretanto, possui algumas diferenças:

- Critério 2.4.7: **valida a existência de um indicador de foco**;
- Critério 1.4.11: **define o nível mínimo de visibilidade**.

#### Como atender 2.4.13

De maneira prática, uma vez que, podemos pensar em soluções como, usar contornos sólidos para a indicação de foco.

Entretanto, existem outras possibilidade para atendê-lo.

Recomendo verificar as técnicas de sucesso para cumprir esse critério. Um exemplo seria a imagem abaixo:

![Critério 2.4.13 da WCAG 2.2, existem 2 botões azuis com um retângulo de foco de deslocamento escuro de 1 pixel de espessura ao redor do segundo.](images/focus-indicator-basic.png)

_Figura 1 Passes: Um retângulo de foco sólido em torno do segundo de dois botões._

### **[2.5.7 Movimentos de arrastar](https://www.w3.org/TR/WCAG22/#dragging-movements)**

O critério 2.5.7 lida com interfaces que possibilitam arrastar os componentes. Semelhantemente, podemos citar alguns exemplos:

- um mapa permite que os usuários arrastem sua visualização;
- um _board_ de Kanban que permite o usuário movimentar os _cards_.

Interfaces que possuem a funcionalidade de movimentos de arrastar, tem quatro ações distintas:

- toque ou clique para estabelecer um ponto de partida e, em seguida,
- pressionar e manter esse contato enquanto…
- realizar o reposicionamento do ponteiro;
- liberar o ponteiro no ponto final.

Não cumprir esse critério, prejudica pessoas com mobilidade reduzida, ou deficiências cognitivas. Contudo o ideal é fornecer outros meios de entrada para o usuário interagir com a interface.

#### Como atender 2.5.7

Para atender esse critério, se faz necessário ter outros meios de entrada para o usuário.

Um componente, por exemplo, _**color picker**_ se enquadra nesse critério. Ele é acionado pelo movimento de arrasto.

Mas possui campos de texto para a entrada numérica de valores de cor permitem a definição de uma cor sem a necessidade de movimentos de arrastamento.

### **[2.5.8 Tamanho do Alvo (mínimo)](https://www.w3.org/TR/WCAG22/#target-size-minimum)**

A princípio o critério 2.5.8 tem como premissa garantir que os usuários possam ativar elementos sem clicar acidentalmente em outro elemento próximo.

Entretanto, existem algumas exceções:

- **Espaçamento:** O [deslocamento do alvo](https://www-w3-org.translate.goog/WAI/WCAG22/Understanding/target-size-minimum.html?_x_tr_sl=auto&_x_tr_tl=pt&_x_tr_hl=pt-BR&_x_tr_pto=wapp#dfn-target-offset) é de pelo menos 24×24 pixels para cada alvo adjacente;
- **Equivalente:** A função pode ser alcançada através de um controle diferente na mesma página que atenda a esse critério.
- **Inline:** O alvo está em uma frase ou bloco de texto;
- **Controle do agente do usuário:** O tamanho do destino é determinado pelo agente do usuário;
- **Essencial:** Uma apresentação particular do alvo é [essencial](https://www-w3-org.translate.goog/WAI/WCAG22/Understanding/target-size-minimum.html?_x_tr_sl=auto&_x_tr_tl=pt&_x_tr_hl=pt-BR&_x_tr_pto=wapp#dfn-essential).

#### Como atender 2.5.8

A princípio, podemos usar técnicas básicas para cumprir esse critério. O recomendável é utilizar um espaçamento entre os elementos seja **24×24 pixels**.

Não necessariamente o elemento deve ter 24×24 pixels, mas a soma do alvo tenha esse tamanho.

Curiosidade: Ao cumprir **o critério 2.5.5**, automaticamente o 2.5.8 é satisfeito.

### **[3.2.6 Ajuda consistente](https://www.w3.org/TR/WCAG22/#consistent-help)**

O critério 3.2.6, exige que, os usuários consigam ajuda para concluir uma tarefa em um website.

O acesso aos mecanismos de ajuda pode ser diretamente pela página onde o usuário se encontra, ou através de um link para uma outra página com as informações de ajuda.

Dessa forma, o usuário tem opções para encontrar possíveis soluções.

#### Como atender 3.2.6

O website deve ter um modelo de design consistente, com hierarquia das informações de modo claro.

Se você for oferecer esse tipo de recurso, tenha em mente, de colocá-lo no mesmo local para manter conformidade.

### **[3.3.7 Entrada Redundante](https://www.w3.org/TR/WCAG22/#redundant-entry)**

O critério 3.3.7 exige que informações previamente inseridas ou fornecidas pelo usuário sejam preenchidas de maneira automática, ou estejam disponíveis para que o próprio usuário as selecione, se for necessário.

#### Como atender 3.3.7

É extremamente simples implementar a lógica de sessão para pré-preencher campos usando informações que o usuário já inseriu.

Dessa forma, conseguimos manter a entrada redundante das informações.

### **[3.3.8 Autenticação Acessível](https://www.w3.org/TR/WCAG22/#accessible-authentication-minimum)**

O critério 3.3.8 está preocupado com testes de função cognitiva que são usados para autenticar usuários, como por exemplo, CAPTCHA onde devemos digitar uma série de caracteres, ou identificar um tipo específico de objeto.

Dessa forma, usuários com deficiência cognitiva ou problemas de memória, dislexia, discalculia serão extremamente beneficiadas com ele.

#### Como atender 3.3.8

Primeiramente atender esse critério é garantir que todas as formas de entrada de autenticação (como campos de nome de usuário e senha) suportem a cópia de seus valores.

Contudo, é uma boa ideia incluir um atributo em todos os campos que pedem as próprias informações de um usuário (conforme descrito no [critério 1.3.5](https://www.w3.org/TR/WCAG/#identify-input-purpose), embora isso não seja estritamente exigido pelo 3.3.8.

### **[3.3.9 Autenticação Acessível (aprimorada)](https://www.w3.org/TR/WCAG22/#accessible-authentication-enhanced)**

Esse critério é idêntico ao 3.3.8, exceto que não possui exceções para testes de reconhecimento de objetos ou conteúdo pessoal.
