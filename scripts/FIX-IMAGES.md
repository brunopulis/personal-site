# Correção de Caminhos de Imagens

Este documento explica como corrigir os caminhos de imagens nos posts do blog para usar a estrutura correta do Astro.

## O problema

Alguns posts têm caminhos de imagens que apontam para `/images/blog/...`, mas as imagens estão em `src/assets/images/blog/`. No Astro, precisamos usar o alias `@assets` para referenciar imagens corretamente.

### Exemplos de caminhos incorretos:

**No frontmatter:**

```yaml
---
image: '/images/blog/validadores-acessibilidade.png'
---
```

**No conteúdo Markdown:**

```markdown
![Alt text](/images/blog/deficiencia.png)
```

### Caminhos corretos:

**No frontmatter:**

```yaml
---
image: '@assets/images/blog/validadores-acessibilidade.png'
---
```

**No conteúdo Markdown:**

```markdown
![Alt text](@assets/images/blog/deficiencia.png)
```

## Como usar o script

### Opção 1: Dry Run (Recomendado primeiro)

Antes de modificar os arquivos, execute o modo dry-run para ver o que será alterado:

```bash
pnpm run fix:images:dry-run
```

Isso mostrará:

- Quantos arquivos serão modificados
- Quais tipos de alterações serão feitas
- Quantos arquivos não precisam de alterações

### Opção 2: Correção Real

Quando estiver pronto para corrigir os caminhos:

```bash
pnpm run fix:images
```

## O que o script faz?

O script `scripts/fix-image-paths.js`:

1. ✅ Percorre todos os arquivos `.mdx` em `src/content/blog`
2. ✅ Detecta e corrige os seguintes padrões:
   - `image: '/images/blog/...'` → `image: '@assets/images/blog/...'`
   - `featured_image: '/images/blog/...'` → `featured_image: '@assets/images/blog/...'`
   - `![alt](/images/blog/...)` → `![alt](@assets/images/blog/...)`
   - `![alt](/public/images/blog/...)` → `![alt](@assets/images/blog/...)`
3. ✅ Mantém URLs externas inalteradas (http://, https://)
4. ✅ Preserva todo o resto do conteúdo
5. ✅ Mostra um resumo das alterações

## Exemplo de saída

```
Corretor de Caminhos de Imagens

Procurando arquivos .mdx em: /path/to/src/content/blog

Encontrados 131 arquivos .mdx

✓ pt-br/2014/4-validadores-de-acessibilidade.mdx - Frontmatter image path
✓ pt-br/2014/ignoramos-45-milhoes-de-pessoas.mdx - 1 Markdown image(s)
✓ pt-br/2015/caso-de-amor-acessibilidade.mdx - 1 Markdown image(s)
...

Resumo:
6 arquivos modificados com sucesso
6 alterações realizadas
125 arquivos não precisavam de alterações
```

## Estrutura de imagens

As imagens do blog estão organizadas em:

```
src/assets/images/blog/
├── validadores-acessibilidade.png
├── deficiencia.png
├── acessibilidade-na-web.webp
└── ...
```

## Por que usar @assets?

O Astro processa imagens em `src/assets/` de forma otimizada:

- ✅ **Otimização automática** - Compressão e redimensionamento
- ✅ **Formatos modernos** - Conversão para WebP/AVIF
- ✅ **Cache eficiente** - Hashing de arquivos
- ✅ **Lazy loading** - Carregamento sob demanda
- ✅ **Responsive images** - Múltiplos tamanhos

## Usando imagens em posts MDX

Após a correção, você pode usar imagens de duas formas:

### 1. Markdown tradicional (otimizado automaticamente)

```mdx
---
title: Meu Post
image: '@assets/images/blog/cover.jpg'
---

![Descrição da imagem](@assets/images/blog/exemplo.png)
```

### 2. Componente Image do Astro (controle total)

```mdx
---
title: Meu Post
---

import { Image } from 'astro:assets';
import minhaImagem from '@assets/images/blog/exemplo.png';

<Image src={minhaImagem} alt="Descrição da imagem" width={800} height={600} />
```

## URLs externas

O script **não modifica** URLs externas, como:

```markdown
![Imagem externa](https://cdn-images-1.medium.com/max/800/image.jpeg)
```

Essas imagens continuarão funcionando normalmente, mas não serão otimizadas pelo Astro.

## Troubleshooting

### Imagem não encontrada após correção

Se após a correção uma imagem não for encontrada:

1. Verifique se o arquivo existe em `src/assets/images/blog/`
2. Confira se o nome do arquivo está correto (case-sensitive)
3. Certifique-se de que a extensão está correta (.png, .jpg, .webp, etc.)

### Caminho ainda incorreto

Se algum caminho não foi corrigido:

1. Verifique se o padrão está coberto pelo script
2. Abra uma issue ou corrija manualmente
3. O script pode ser estendido para novos padrões

## Ordem recomendada de execução

Se você está migrando de Markdown para MDX:

1. **Primeiro**: Converta MD para MDX

   ```bash
   pnpm run convert:mdx:dry-run
   pnpm run convert:mdx
   ```

2. **Depois**: Corrija os caminhos das imagens

   ```bash
   pnpm run fix:images:dry-run
   pnpm run fix:images
   ```

3. **Por fim**: Teste o build
   ```bash
   pnpm run build
   ```

## Recursos úteis

- [Astro Assets](https://docs.astro.build/en/guides/images/)
- [Astro Image Component](https://docs.astro.build/en/guides/images/#image--astroassets)
- [MDX in Astro](https://docs.astro.build/en/guides/integrations-guide/mdx/)
