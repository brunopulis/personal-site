# Scripts de Migração e Manutenção

Este diretório contém scripts para migração de Markdown para MDX e manutenção do blog.

## 📚 Documentação

- **[MDX-QUICKSTART.md](./MDX-QUICKSTART.md)** - Guia rápido de migração MDX
- **[CONVERT-MDX.md](./CONVERT-MDX.md)** - Documentação completa sobre conversão MD→MDX
- **[FIX-IMAGES.md](./FIX-IMAGES.md)** - Documentação sobre correção de caminhos de imagens

## 🚀 Scripts Disponíveis

### Migração Completa (Recomendado)

Execute tudo de uma vez - conversão + correção de imagens:

```bash
# Teste primeiro (não modifica nada)
pnpm run migrate:mdx:dry-run

# Execute a migração completa
pnpm run migrate:mdx
```

### Scripts Individuais

#### 1. Conversão MD → MDX

Converte todos os arquivos `.md` para `.mdx`:

```bash
# Dry run (teste)
pnpm run convert:mdx:dry-run

# Conversão real
pnpm run convert:mdx
```

**Script:** `convert-md-to-mdx.js`

#### 2. Correção de Caminhos de Imagens

Corrige caminhos de `/images/blog/` para `@assets/images/blog/`:

```bash
# Dry run (teste)
pnpm run fix:images:dry-run

# Correção real
pnpm run fix:images
```

**Script:** `fix-image-paths.js`

## 📋 Ordem Recomendada

1. **Backup**: Faça commit no Git antes de começar
2. **Teste**: Execute `pnpm run migrate:mdx:dry-run`
3. **Migre**: Execute `pnpm run migrate:mdx`
4. **Verifique**: Confira os arquivos modificados
5. **Teste build**: Execute `pnpm run build`
6. **Reinicie**: Execute `pnpm run dev` para reiniciar o TinaCMS

## 🎯 O que cada script faz?

### migrate-to-mdx.js (Script Mestre)

Executa em sequência:

1. Conversão de `.md` para `.mdx`
2. Correção de caminhos de imagens

### convert-md-to-mdx.js

- Encontra todos os arquivos `.md` em `src/content/blog`
- Converte para `.mdx` preservando conteúdo
- Remove arquivos `.md` originais
- Funciona com estrutura de locales (`pt-br/`, `en/`)

### fix-image-paths.js

- Encontra todos os arquivos `.mdx` em `src/content/blog`
- Corrige caminhos de imagens no frontmatter e conteúdo
- Preserva URLs externas (http://, https://)
- Atualiza para usar `@assets/images/blog/`

## 📊 Status Atual

- **Posts em português**: ~130 arquivos em `pt-br/`
- **Posts convertidos**: Após executar `convert:mdx`
- **Imagens corrigidas**: Após executar `fix:images`

## ⚠️ Importante

- **Sempre faça backup** antes de executar os scripts
- **Use dry-run primeiro** para ver o que será modificado
- **Reinicie o TinaCMS** após as mudanças
- **Teste o build** para garantir que tudo funciona

## 🔧 Troubleshooting

### Script não encontrado

```bash
# Certifique-se de estar na raiz do projeto
cd /home/pulis/Projetos/javascript/brunopulis

# Execute novamente
pnpm run migrate:mdx:dry-run
```

### Permissão negada

```bash
# Torne os scripts executáveis
chmod +x scripts/*.js
```

### Erro durante execução

1. Verifique os logs de erro
2. Reverta usando Git se necessário
3. Execute dry-run novamente
4. Reporte o erro se persistir

## 📖 Recursos

- [MDX Documentation](https://mdxjs.com/)
- [Astro MDX Integration](https://docs.astro.build/en/guides/integrations-guide/mdx/)
- [Astro Assets](https://docs.astro.build/en/guides/images/)
- [TinaCMS MDX Support](https://tina.io/docs/editing/markdown/)
