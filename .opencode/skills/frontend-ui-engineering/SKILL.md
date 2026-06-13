---
name: frontend-ui-engineering
description: Cria interfaces de usuário com qualidade de produção. Use ao construir ou modificar interfaces voltadas para o usuário. Use ao criar componentes, implementar layouts, gerenciar estado ou quando a saída precisa ter a aparência e o comportamento de um produto de produção, em vez de parecer gerada por IA.
---

# Engenharia de Interface de Usuário Front-end

## Visão Geral

Crie interfaces de usuário com qualidade de produção que sejam acessíveis, performáticas e visualmente refinadas. O objetivo é uma interface de usuário que pareça ter sido criada por um engenheiro com conhecimento de design em uma grande empresa — e não como se tivesse sido gerada por IA. Isso significa aderência real a um sistema de design, acessibilidade adequada, padrões de interação bem pensados ​​e nenhuma "estética de IA" genérica.

---

# Engenharia de Interface de Usuário Front-end ## Quando usar

- Criar novos componentes ou páginas de interface do usuário
- Modificar interfaces existentes voltadas para o usuário
- Implementar layouts responsivos
- Adicionar interatividade ou gerenciamento de estado
- Corrigir problemas visuais ou de UX

## Arquitetura de componentes

### Estrutura de arquivos

Coloque tudo relacionado a um componente no mesmo local:

```
src/components/

TaskList/

TaskList.tsx # Implementação do componente

TaskList.test.tsx # Testes

TaskList.stories.tsx # Histórias do Storybook (se estiver usando)

use-task-list.ts # Hook personalizado (se o estado for complexo)

types.ts # Tipos específicos do componente (se necessário)
```

### Padrões de componentes

**Prefira composição à configuração:**

```tsx
// Bom: Componível
<Card>

<CardHeader>

<CardTitle>Tarefas</CardTitle>

</CardHeader>

<CardBody>
<TaskList tasks={tasks} />

</CardBody>
</Card>

// Evite: Configuração excessiva
<Card

title="Tarefas"

headerVariant="large"

bodyPadding="md"

content={<TaskList tasks={tasks} />}

/>
```

**Mantenha os componentes focados:**

```tsx

// Bom: Faz uma coisa
export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {

return (

<li className="flex items-center gap-3 p-3">

<Checkbox checked={task.done} onChange={() => onToggle(task.id)} />

<span className={task.done ? 'line-through text-muted' : ''}>{task.title}</span>

<Button variant="ghost" size="sm" onClick={() => onDelete(task.id)}>

<TrashIcon />

</Button>

</li>

);

}
```

**Separar a busca de dados da apresentação:**

```tsx
// Contêiner: manipula dados
export function TaskListContainer() {

const { tasks, isLoading, error } = useTasks();

if (isLoading) return <TaskListSkeleton />;

if (error) return <ErrorState message="Falha ao carregar tarefas" retry={refetch} />;

if (tasks.length === 0) return <EmptyState message="Nenhuma tarefa ainda" />;

return <TaskList tasks={tasks} />;

}

// Apresentação: lida com a renderização
export function TaskList({ tasks }: { tasks: Task[] }) {

return (

<ul role="list" className="divide-y">

{tasks.map(task => <TaskItem key={task.id} task={task} />)}

</ul>

); }

## Gerenciamento de Estado

**Escolha a abordagem mais simples que funcione:**

```
Estado local (useState) → Estado da interface do usuário específico do componente
Estado elevado → Compartilhado entre 2 a 3 componentes irmãos
Contexto → Tema, autenticação, localidade (muitas operações de leitura, poucas de escrita)
Estado da URL (searchParams) → Filtros, paginação, estado da interface do usuário compartilhável
Estado do servidor (React Query, SWR) → Dados remotos com cache
Armazenamento global (Zustand, Redux) → Estado complexo do cliente compartilhado por todo o aplicativo

```

**Evite passar props por mais de 3 níveis.** Se você estiver passando props por componentes que não as utilizam, introduza um contexto ou reestruture a árvore de componentes.

## Adesão ao Sistema de Design

### Evite a Estética da IA

A interface do usuário gerada por IA possui padrões reconhecíveis. Evite todos eles:

| Padrão de IA | Por que é um problema | Qualidade de produção |
|---           |---                    |---                    |
| Tudo roxo/índigo | Os modelos usam paletas visualmente "seguras" por padrão, fazendo com que todos os aplicativos pareçam idênticos | Use a paleta de cores real do projeto |
| Gradientes excessivos | Gradientes adicionam ruído visual e conflitam com a maioria dos sistemas de design | Gradientes planos ou sutis que combinem com o sistema de design |
| Tudo arredondado (arredondado-2xl) | O arredondamento máximo sinaliza "amigável", mas ignora a hierarquia dos raios dos cantos em designs reais | Raio de borda consistente do sistema de design |
| Seções de destaque genéricas | Layout baseado em modelo sem conexão com o conteúdo real ou a necessidade do usuário | Layouts com foco no conteúdo |
| Texto no estilo Lorem Ipsum | O texto de espaço reservado esconde problemas de layout que o conteúdo real revela (comprimento, quebra de linha, estouro) | Conteúdo de espaço reservado realista |
| Preenchimento excessivo em todos os lugares | Preenchimento generoso e igual destrói a hierarquia visual e desperdiça espaço na tela | Escala de espaçamento consistente | Grades de cartões de estoque | Grades uniformes são um atalho de layout que ignora a prioridade da informação e os padrões de leitura | Layouts orientados a objetivos |
Design com muitas sombras | Sombras em camadas adicionam profundidade que compete com o conteúdo e torna a renderização mais lenta em dispositivos de baixo desempenho | Sombras sutis ou ausentes, a menos que o sistema de design especifique |

### Espaçamento e Layout

Use uma escala de espaçamento consistente. Não invente valores:

```css
/* Use a escala: incrementos de 0,25rem (ou qualquer que seja o valor do projeto)
