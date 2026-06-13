---
name: code-review-and-quality
description: Realiza revisão de código multiaxial. Use antes de mesclar qualquer alteração. Use ao revisar código escrito por você, por outro agente ou por um humano. Use quando precisar avaliar a qualidade do código em múltiplas dimensões antes que ele entre na ramificação principal.
---

# Revisão e Qualidade do Código

## Visão Geral

Revisão de código multidimensional com critérios de qualidade. Cada alteração é revisada antes da mesclagem — sem exceções. A revisão abrange cinco eixos: correção, legibilidade, arquitetura, segurança e desempenho.

**O padrão de aprovação:** Aprove uma alteração quando ela definitivamente melhorar a saúde geral do código, mesmo que não seja perfeita. Código perfeito não existe — o objetivo é a melhoria contínua. Não bloqueie uma alteração só porque ela não é exatamente como você a teria escrito. Se ela melhorar a base de código e seguir as convenções do projeto, aprove-a.

## Quando usar

- Antes de mesclar qualquer PR ou alteração
- Após concluir a implementação de um recurso
- Quando outro agente ou modelo gerar código que você precise avaliar
- Ao refatorar código existente
- Após qualquer correção de bug (revise tanto a correção quanto o teste de regressão)

## A Revisão de Cinco Eixos

Toda revisão avalia o código em relação a estas dimensões:

### 1. Correção

O código faz o que promete?

- Ele atende à especificação ou aos requisitos da tarefa?
- Os casos extremos são tratados (valores nulos, vazios, limites)?
- Os caminhos de erro são tratados (não apenas o caminho feliz)?
- Ele passa em todos os testes? Os testes estão realmente testando as coisas certas?
- Existem erros de um byte, condições de corrida ou inconsistências de estado?

### 2. Legibilidade e Simplicidade

Outro engenheiro (ou agente) consegue entender este código sem que o autor o explique?

- Os nomes são descritivos e consistentes com as convenções do projeto? (Sem `temp`, `data`, `result` sem contexto)
- O fluxo de controle é direto (evite operadores ternários aninhados e callbacks complexos)?
- O código está organizado logicamente (código relacionado agrupado, limites de módulo claros)?
- Existem truques "inteligentes" que deveriam ser simplificados?
- **Isso poderia ser feito com menos linhas?** (1000 linhas onde 100 seriam suficientes é um fracasso)
- **As abstrações justificam sua complexidade?** (Não generalize até o terceiro caso de uso)
- Os comentários ajudariam a esclarecer intenções não óbvias? (Mas não comente código óbvio.)
- Existem artefatos de código morto: variáveis ​​nulas (`_unused`), shims de retrocompatibilidade ou comentários `// removed`?

### 3. Arquitetura

A mudança se encaixa no projeto do sistema?

- Ela segue padrões existentes ou introduz um novo? Se for um novo, é justificado?
- Ela mantém limites de módulo claros?
- Há duplicação de código que deveria ser compartilhada?
- As dependências estão fluindo na direção correta (sem dependências circulares)?
- O nível de abstração é apropriado (não é excessivamente complexo, nem muito acoplado)?

### 4. Segurança

Para obter orientações detalhadas sobre segurança, consulte `security-andhardening`. A alteração introduz vulnerabilidades?

- A entrada do usuário é validada e higienizada?
- Os segredos são mantidos fora do código, dos logs e do controle de versão?
- A autenticação/autorização é verificada onde necessário?
- As consultas SQL são parametrizadas (sem concatenação de strings)?
- As saídas são codificadas para evitar XSS?
- As dependências são provenientes de fontes confiáveis ​​sem vulnerabilidades conhecidas?
- Os dados de fontes externas (APIs, logs, conteúdo do usuário, arquivos de configuração) são tratados como não confiáveis?
- Os fluxos de dados externos são validados nos limites do sistema antes de serem usados ​​na lógica ou na renderização?

### 5. Desempenho

Para obter informações detalhadas sobre desempenho e otimização, consulte `performance-optimization`. A alteração introduz problemas de desempenho?

- Algum padrão de consulta N+1?
- Algum loop infinito ou busca de dados sem restrições?
- Alguma operação síncrona que deveria ser assíncrona?
- Alguma renderização desnecessária em componentes da interface do usuário?
- Falta de paginação em endpoints de lista?
- Algum objeto grande criado em caminhos críticos?

## Dimensionamento das Alterações

Alterações pequenas e focadas são mais fáceis de revisar, mais rápidas de mesclar e mais seguras de implementar. Defina metas para estes tamanhos:

```
~100 linhas alteradas → Bom. Revisável em uma única sessão.
~300 linhas alteradas → Aceitável se for uma única alteração lógica.
~1000 linhas alteradas → Muito grande. Divida.
```

**O que conta como "uma alteração":** Uma única modificação independente que aborda um único problema, inclui testes relacionados e mantém o sistema funcional após a submissão. Uma parte de uma funcionalidade — não a funcionalidade inteira.

**Estratégias de divisão quando uma alteração é muito grande:**

| Estratégia                | Como | Quando |
|----------                 |----- | ------ |
| **Pilha**                 | Submeter uma pequena alteração e iniciar a próxima com base nela | Dependências sequenciais |
| **Por grupo de arquivos** | Alterações separadas para grupos que precisam de revisores diferentes | Preocupações transversais |
| **Horizontal** | Criar código/stubs compartilhados primeiro e depois os consumidores | Arquitetura em camadas |
| **Vertical** | Dividir em fatias menores da funcionalidade completa | Trabalho na funcionalidade |

**Quando grandes alterações são aceitáveis:** Exclusão completa de arquivos e refatoração automatizada, onde o revisor precisa apenas verificar a intenção, e não cada linha.

**Separe a refatoração do desenvolvimento de novas funcionalidades.** Uma alteração que refatora o código existente e adiciona um novo comportamento são duas alterações distintas — envie-as separadamente. Pequenas correções (renomeação de variáveis) podem ser incluídas a critério do revisor.

## Descrições de Alterações

Toda alteração precisa de uma descrição que seja independente no histórico de controle de versão.

**Primeira linha:** Curta, imperativa e independente. "Excluir o RPC do FizzBuzz", e não "Excluindo o RPC do FizzBuzz". Deve ser informativa o suficiente para que alguém pesquisando o histórico possa entender a alteração sem precisar ler as diferenças (diffs).

**Corpo da descrição:** O que está mudando e por quê. Inclua contexto, decisões e justificativas não visíveis no próprio código. Inclua links para números de bugs, resultados de benchmarks ou documentos de design, quando relevantes. Reconheça as limitações da abordagem, quando existirem.

**Antipadrões:** "Corrigir bug", "Corrigir build", "Adicionar patch", "Movendo código de A para B", "Fase 1", "Adicionar funções de conveniência".

## Processo de Revisão

### Etapa 1: Compreenda o Contexto

Antes de analisar o código, entenda a intenção:

```
- O que essa alteração pretende realizar?
- Qual especificação ou tarefa ela implementa?
- Qual é a mudança de comportamento esperada?
```

### Etapa 2: Analise os Testes Primeiro

Os testes revelam a intenção e a cobertura:

```
- Existem testes para a alteração?
- Eles testam o comportamento (e não detalhes de implementação)?
- Os casos extremos são cobertos?
- Os testes têm nomes descritivos?
- Os testes detectariam uma regressão se o código fosse alterado?
```

### Etapa 3: Analise a Implementação

Analise o código considerando os cinco eixos:

```
Para cada arquivo alterado:

1. Correção: Este código faz o que o teste diz que ele deveria fazer?
2. Legibilidade: Consigo entender este código sem ajuda?
3. Arquitetura: Este código se encaixa no sistema?
4. Segurança: Alguma vulnerabilidade?
5. Desempenho: Algum gargalo?
```

### Etapa 4: Categorizar as Descobertas

Rotule cada comentário com sua gravidade para que o autor saiba o que é obrigatório e o que é opcional:

| Prefixo | Significado | Ação do Autor |
|-------- |---------    |---------------|
| *(sem prefixo)* | Alteração obrigatória | Deve ser corrigida antes da mesclagem |
| **Crítico:** | Impede a mesclagem | Vulnerabilidade de segurança, perda de dados, funcionalidade quebrada |
| **Menor:** | Opcional | O autor pode ignorar — formatação, preferências de estilo |
| **Opcional:** / **Considerar:** | Sugestão | Vale a pena considerar, mas não é obrigatório |
| **Para sua informação:** | Apenas informativo | Nenhuma ação necessária — contexto para referência futura |

Isso evita que os autores tratem todos os feedbacks como obrigatórios e percam tempo com sugestões opcionais.

### Etapa 5: Verificar a Verificação

Verifique o histórico de verificação do autor:

```
- Quais testes foram executados?
- A compilação foi bem-sucedida?
- A alteração foi testada manualmente?
- Existem capturas de tela das alterações na interface do usuário?
- Existe uma comparação de antes e depois?
```

## Padrão de Revisão Multimodelo

Use modelos diferentes para diferentes perspectivas de revisão:

```
Modelo A escreve o código
 │
 ▼
Modelo B revisa quanto à correção e arquitetura
 │
 ▼
Modelo A considera o feedback
 │
 ▼
O humano toma a decisão final
```

Isso identifica problemas que um único modelo poderia não detectar — modelos diferentes têm pontos cegos diferentes.

**Exemplo de solicitação para um agente de revisão:**

```
Revise esta alteração de código quanto à correção, segurança e conformidade com as
convenções do nosso projeto. A especificação diz [X]. A alteração deve [Y].

Marque quaisquer problemas como Críticos, Importantes ou Sugestões.

```

## Higiene de Código Morto

Após qualquer refatoração ou alteração de implementação, verifique se há código órfão:

1. Identifique o código que agora está inacessível ou não utilizado
2. Liste-o explicitamente
3. **Pergunte antes de excluir:** "Devo remover estes elementos agora não utilizados: [lista]?"

Não deixe código morto por aí — isso confunde leitores e agentes futuros. Mas não exclua silenciosamente coisas sobre as quais você não tem certeza. Em caso de dúvida, pergunte.

```
CÓDIGO MORTO IDENTIFICADO:
- formatLegacyDate() em src/utils/date.ts — substituído por formatDate()
- Componente OldTaskCard em src/components/ — substituído por TaskCard
- Constante LEGACY_API_URL em src/config.ts — sem referências restantes
→ Posso remover estes?
```

## Velocidade de Revisão

Revisões lentas bloqueiam equipes inteiras. O custo de alternar o contexto para revisar é menor do que o custo de espera imposto aos outros.

- **Responder em até um dia útil** — este é o prazo máximo, não a meta.
- **Cadência ideal:** Responda logo após o recebimento de uma solicitação de revisão, a menos que esteja imerso em uma codificação concentrada. Uma alteração típica deve passar por várias rodadas de revisão em um único dia.
- **Priorize respostas individuais rápidas** em vez de aprovações finais rápidas. Feedback rápido reduz a frustração, mesmo que várias rodadas sejam necessárias.
- **Alterações grandes:** Peça ao autor para dividi-las em vez de revisar um conjunto de alterações enorme.

## Lidando com Divergências

Ao resolver disputas de revisão, aplique esta hierarquia:

1. **Fatos e dados técnicos** prevalecem sobre opiniões e preferências.
2. **Guias de estilo** são a autoridade absoluta em questões de estilo.
3. **O design de software** deve ser avaliado com base em princípios de engenharia, não em preferências pessoais.
4. **A consistência do código** é aceitável se não prejudicar a integridade geral do sistema.

**Não aceite "Eu limpo isso depois."** A experiência mostra que a limpeza adiada raramente acontece. Exija a limpeza antes da submissão, a menos que seja uma emergência genuína. Se os problemas relacionados não puderem ser resolvidos nesta alteração, exija a abertura de um bug com autoatribuição.

## Honestidade na Revisão

Ao revisar código — seja escrito por você, por outro agente ou por um humano:

- **Não aprove automaticamente.** "Está tudo bem" sem evidências de revisão não ajuda ninguém.
- **Não minimize problemas reais.** Dizer "Isso pode ser um problema menor" quando se trata de um bug que afetará a produção é desonesto.
- **Quantifique os problemas sempre que possível.** "Esta consulta N+1 adicionará ~50ms por item na lista" é melhor do que "isso pode ser lento".
- **Recuse sobre abordagens com problemas claros.** Bajulação é um erro comum em revisões. Se a implementação tiver problemas, diga isso diretamente e proponha alternativas.
- **Aceite alterações com elegância.** Se o autor tiver o contexto completo e discordar, respeite o julgamento dele. Comente sobre o código, não sobre as pessoas — reformule as críticas pessoais para focar no código em si.

## Disciplina de Dependências

Parte da revisão de código é a revisão de dependências:

**Antes de adicionar qualquer dependência:**
1. A pilha de tecnologias existente resolve este problema? (Geralmente sim.)
2. Qual o tamanho da dependência? (Verifique o impacto no pacote.)
3. Ela recebe manutenção ativa? (Verifique o último commit e os problemas em aberto.)
4. Ela possui vulnerabilidades conhecidas? (`npm audit`)
5. Qual a licença? (Deve ser compatível com o projeto.)

**Regra:** Prefira bibliotecas padrão e utilitários existentes a novas dependências. Toda dependência representa um risco.

# Lista de Verificação da Revisão

```markdown
## Revisão: [Título da PR/Alteração]

### Contexto
- [ ] Eu entendo o que esta alteração faz e por quê

### Correção
- [ ] A alteração corresponde aos requisitos da especificação/tarefa
- [ ] Casos extremos tratados
- [ ] Caminhos de erro tratados
- [ ] Os testes cobrem a alteração adequadamente

### Legibilidade
- [ ] Nomes claros e consistentes
- [ ] Lógica direta
- [ ] Sem complexidade desnecessária

### Arquitetura
- [ ] Segue padrões existentes
- [ ] Sem acoplamento ou dependências desnecessárias
- [ ] Nível de abstração apropriado

### Segurança
- [ ] Sem segredos no código
- [ ] Entrada validada nos limites
- [ ] Sem vulnerabilidades de injeção
- [ ] Verificações de autenticação implementadas
- [ ] Fontes de dados externas tratadas como não confiáveis

### Desempenho
- [ ] Sem padrões N+1
- [ ] Sem operações ilimitadas
- [ ] Paginação nos endpoints da lista

### Verificação
- [ ] Testes aprovados
- [ ] Compilação bem-sucedida
- [ ] Verificação manual concluída (se aplicável)

### Veredito
- [ ] **Aprovado** — Pronto para mesclar
- [ ] **Solicitar alterações** — Problemas devem ser resolvidos
```

## Veja também

- Para orientações detalhadas sobre revisão de segurança, consulte `references/security-checklist.md`
- Para verificações de desempenho, consulte `references/performance-checklist.md`

## Justificativas comuns

| Justificativa | Realidade |
|---|---|
| "Funciona, está bom o suficiente" | Código funcional que é ilegível, inseguro ou arquiteturalmente incorreto cria dívida técnica que se acumula. |
| "Eu escrevi, então sei que está correto" | Os autores são cegos às suas próprias suposições. Toda alteração se beneficia de um olhar externo. |
| "Vamos corrigir isso depois" | O "depois" nunca chega. A revisão é o controle de qualidade — use-a. Exija a correção antes da mesclagem, não depois. |
| "O código gerado por IA provavelmente está bom" | O código de IA precisa de mais escrutínio, não menos. É confiante e plausível, mesmo quando errado. |
| "Os testes passaram, então está bom" | Os testes são necessários, mas não suficientes. Eles não detectam problemas de arquitetura, questões de segurança ou problemas de legibilidade. |

## Sinais de Alerta

- Pull requests mescladas sem revisão
- Revisão que verifica apenas se os testes passam (ignorando outros aspectos)
- "LGTM" sem evidências de revisão efetiva
- Alterações sensíveis à segurança sem revisão focada em segurança
- Pull requests grandes demais para serem revisadas adequadamente (divida-as)
- Ausência de testes de regressão em pull requests de correção de bugs
- Comentários de revisão sem rótulos de gravidade — torna confuso o que é obrigatório versus opcional
- Aceitar "Eu corrijo depois" — isso nunca acontece

## Verificação

Após a conclusão da revisão:

- [ ] Todos os problemas críticos foram resolvidos
- [ ] Todos os problemas importantes foram resolvidos ou explicitamente adiados com justificativa
- [ ] Os testes passaram
- [ ] A compilação foi bem-sucedida
- [ ] O processo de verificação foi documentado (o que mudou, como foi verificado)

