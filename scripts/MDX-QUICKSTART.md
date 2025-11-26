# Guia Rápido: MDX no TinaCMS

## ✅ O que foi feito

1. **Configuração do TinaCMS atualizada** para usar formato MDX
2. **Script de conversão criado** para migrar posts de `.md` para `.mdx`
3. **Componente de exemplo** (Callout) criado
4. **Post de exemplo** demonstrando o uso de MDX

## 📁 Estrutura de Pastas

O script funciona com qualquer estrutura de locales:

```
src/content/blog/
├── pt-br/    # Posts em português (107 arquivos .md)
└── en/       # Posts em inglês (quando criados)
```

O script converterá **todos** os arquivos `.md` em **todas** as subpastas automaticamente.

## 🚀 Como usar

### Opção A: Migração Completa (Recomendado)

Execute tudo de uma vez - conversão + correção de imagens:

```bash
# Teste primeiro (dry-run)
pnpm run migrate:mdx:dry-run

# Execute a migração completa
pnpm run migrate:mdx
```

### Opção B: Passo a Passo

Se preferir executar cada etapa separadamente:

### 1. Testar a conversão (recomendado primeiro)

```bash
pnpm run convert:mdx:dry-run
```

Isso mostrará quais arquivos serão convertidos **sem modificar nada**.

### 2. Converter todos os posts

```bash
pnpm run convert:mdx
```

Isso converterá todos os 130 arquivos `.md` para `.mdx`.

### 3. Corrigir caminhos de imagens (recomendado)

Após converter para MDX, corrija os caminhos das imagens:

```bash
# Teste primeiro
pnpm run fix:images:dry-run

# Execute a correção
pnpm run fix:images
```

Isso corrigirá caminhos como:

- `/images/blog/...` → `@assets/images/blog/...`

### 4. Usar componentes nos posts

Crie um novo post `.mdx` ou edite um existente:

```mdx
---
title: Meu Post
publishDate: 2025-01-26
---

import { Callout } from '@components/blog/Callout.astro';

# Título

Texto normal em Markdown...

<Callout type="info" title="Dica">
  Conteúdo do callout
</Callout>

Mais texto...
```

## 📁 Arquivos importantes

- **Configuração TinaCMS**: `tina/collections/blog.ts`
- **Script de conversão MD→MDX**: `scripts/convert-md-to-mdx.js`
- **Script de correção de imagens**: `scripts/fix-image-paths.js`
- **Documentação MDX**: `scripts/CONVERT-MDX.md`
- **Documentação imagens**: `scripts/FIX-IMAGES.md`
- **Componente exemplo**: `src/components/blog/Callout.astro`
- **Post exemplo**: `src/content/blog/pt-br/2025/exemplo-post-mdx.mdx`
- **Imagens do blog**: `src/assets/images/blog/`

## 🎨 Componentes disponíveis

### Callout

```mdx
<Callout type="info" title="Título">
  Conteúdo
</Callout>
```

**Tipos disponíveis:**

- `info` (azul) - Informações
- `warning` (amarelo) - Avisos
- `success` (verde) - Sucesso
- `error` (vermelho) - Erros

## 💡 Dicas

1. **Compatibilidade**: Todo Markdown válido funciona em MDX
2. **Gradual**: Você não precisa usar componentes em todos os posts
3. **Reutilização**: Crie componentes para padrões que se repetem
4. **Acessibilidade**: Use componentes semânticos e acessíveis

## 🔧 Criar novos componentes

1. Crie o componente em `src/components/blog/NomeDoComponente.astro`
2. Importe no post: `import { NomeDoComponente } from '@components/blog/NomeDoComponente.astro';`
3. Use no conteúdo: `<NomeDoComponente prop="valor" />`

## 📚 Recursos

- [Documentação completa](./CONVERT-MDX.md)
- [MDX Official Docs](https://mdxjs.com/)
- [Astro MDX Guide](https://docs.astro.build/en/guides/integrations-guide/mdx/)

## ⚠️ Importante

- Faça backup (commit no Git) antes de converter
- Teste o dry-run primeiro
- Verifique alguns posts após a conversão
- O TinaCMS precisa ser reiniciado após mudanças na configuração
