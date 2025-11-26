# Conversão de Markdown para MDX

Este documento explica como usar o TinaCMS com MDX e como converter seus posts existentes de Markdown para MDX.

## O que mudou?

### 1. Configuração do TinaCMS

A configuração do TinaCMS em `tina/collections/blog.ts` foi atualizada para usar o formato `mdx` ao invés de `md`:

```typescript
export const BlogCollection: Collection = {
  name: 'post',
  label: 'Blog',
  path: 'src/content/blog',
  format: 'mdx', // ← Mudado de 'md' para 'mdx'
  // ...
};
```

### 2. Por que MDX?

MDX permite que você use componentes React diretamente dentro dos seus posts do blog. Isso significa que você pode:

- **Criar componentes interativos** (gráficos, demos, formulários)
- **Reutilizar componentes** em múltiplos posts
- **Manter a compatibilidade** com Markdown padrão
- **Adicionar funcionalidades avançadas** sem sair do conteúdo

Exemplo de uso:

```mdx
---
title: Meu Post com MDX
publishDate: 2024-01-01
---

# Título do Post

Texto normal em Markdown...

<CustomComponent prop="valor" />

Mais texto em Markdown...

<InteractiveDemo />
```

## Estrutura de pastas

O script funciona com a seguinte estrutura de pastas:

```
src/content/blog/
├── pt-br/           # Posts em português
│   ├── 2014/
│   ├── 2015/
│   └── ...
└── en/              # Posts em inglês (quando criados)
    ├── 2024/
    └── ...
```

O script converterá **todos** os arquivos `.md` encontrados em qualquer subpasta de `src/content/blog`, incluindo:

- ✅ Posts em português (`pt-br/`)
- ✅ Posts em inglês (`en/`) - quando você criar essa pasta
- ✅ Qualquer outra estrutura de locale que você adicionar no futuro

## Como converter posts existentes

### Opção 1: Dry Run (Recomendado primeiro)

Antes de converter todos os arquivos, execute o modo dry-run para ver o que será convertido:

```bash
pnpm run convert:mdx:dry-run
```

Isso mostrará uma lista de todos os arquivos que seriam convertidos, **sem modificar nada**.

### Opção 2: Conversão Real

Quando estiver pronto para converter todos os arquivos:

```bash
pnpm run convert:mdx
```

Este comando irá:

1. ✅ Encontrar todos os arquivos `.md` em `src/content/blog`
2. ✅ Converter cada arquivo para `.mdx`
3. ✅ Preservar todo o frontmatter e conteúdo
4. ✅ Remover os arquivos `.md` originais
5. ✅ Mostrar um resumo da conversão

### O que o script faz?

O script `scripts/convert-md-to-mdx.js`:

- Percorre recursivamente todos os diretórios em `src/content/blog`
- Funciona com a estrutura de locales (`pt-br/`, `en/`, etc.)
- Encontra todos os arquivos `.md` em todas as subpastas
- Cria novos arquivos `.mdx` com o mesmo conteúdo
- Remove os arquivos `.md` originais
- Preserva toda a estrutura de diretórios (anos, locales, etc.)
- Mantém o frontmatter intacto

### Exemplo visual: Antes e Depois

**Antes da conversão:**

```
src/content/blog/
├── pt-br/
│   ├── 2014/
│   │   ├── ignoramos-45-milhoes-de-pessoas.md
│   │   └── acessibilidade.md
│   └── 2024/
│       └── github-profile-dicas.md
└── en/
    └── 2024/
        └── accessibility-tips.md
```

**Depois da conversão:**

```
src/content/blog/
├── pt-br/
│   ├── 2014/
│   │   ├── ignoramos-45-milhoes-de-pessoas.mdx  ← Convertido
│   │   └── acessibilidade.mdx                    ← Convertido
│   └── 2024/
│       └── github-profile-dicas.mdx              ← Convertido
└── en/
    └── 2024/
        └── accessibility-tips.mdx                ← Convertido
```

### Exemplo de saída

```
Conversor de Markdown para MDX

Procurando arquivos .md em: /path/to/src/content/blog

Encontrados 107 arquivos .md

✓ pt-br/2014/ignoramos-45-milhoes-de-pessoas.md → ignoramos-45-milhoes-de-pessoas.mdx
✓ pt-br/2015/caso-de-amor-acessibilidade.md → caso-de-amor-acessibilidade.mdx
✓ pt-br/2016/a-dor.md → a-dor.mdx
...

Resumo:
107 arquivos convertidos com sucesso
```

## Usando componentes MDX nos posts

Após a conversão, você pode começar a usar componentes React nos seus posts:

### 1. Criar um componente

```tsx
// src/components/blog/Callout.tsx
export function Callout({ children, type = 'info' }) {
  return <div className={`callout callout-${type}`}>{children}</div>;
}
```

### 2. Usar no post MDX

```mdx
---
title: Meu Post
---

import { Callout } from '@components/blog/Callout';

# Título

Texto normal...

<Callout type="warning">**Atenção:** Isso é importante!</Callout>

Mais texto...
```

## Configuração do Astro

O Astro já está configurado para suportar MDX através da integração `@astrojs/mdx` em `astro.config.mjs`:

```javascript
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [
    mdx(),
    // ...
  ],
});
```

## Compatibilidade

- ✅ Todo Markdown válido é MDX válido
- ✅ Você não precisa usar componentes React se não quiser
- ✅ Posts antigos continuarão funcionando normalmente
- ✅ Você pode adicionar componentes gradualmente

## Troubleshooting

### Erro ao converter

Se houver erro na conversão de algum arquivo, o script mostrará qual arquivo falhou e continuará com os demais.

### Reverter conversão

Se precisar reverter, você pode:

1. Usar o controle de versão (Git) para restaurar os arquivos
2. Renomear manualmente os arquivos `.mdx` de volta para `.md`

### TinaCMS não reconhece os arquivos

Certifique-se de que:

1. A configuração em `tina/collections/blog.ts` está com `format: 'mdx'`
2. Você reiniciou o servidor do TinaCMS após a mudança
3. Os arquivos estão no caminho correto (`src/content/blog`)

## Próximos passos

1. ✅ Execute o dry-run para ver o que será convertido
2. ✅ Faça backup dos seus arquivos (commit no Git)
3. ✅ Execute a conversão real
4. ✅ Teste alguns posts no TinaCMS
5. ✅ Comece a criar componentes reutilizáveis para seus posts

## Recursos úteis

- [MDX Documentation](https://mdxjs.com/)
- [Astro MDX Integration](https://docs.astro.build/en/guides/integrations-guide/mdx/)
- [TinaCMS MDX Support](https://tina.io/docs/editing/markdown/)
