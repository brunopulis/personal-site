# Relatório de Links Quebrados

Gerado em: 2025-12-12T23:54:51.935Z

## Resumo Executivo

- **Total de arquivos analisados**: 1,755
- **Links internos quebrados**: 86
- **Links externos únicos**: 1,449

## Categorias de Problemas

### 1. Páginas Internas Ausentes (Alta Prioridade) 🔴

Estes links apontam para páginas que não existem:

#### Em `pages/about.md`:

- `/servicos` - talvez deveria ser `/service` ou criar página
- `/cv` - currículo não existe
- `/biblioteca` - deveria ser `/livros`
- `/filmes` - página não existe
- `/musicos` - página não existe
- `/agora` - página "now" não existe

#### Em `pages/explore.md`:

- `/sobre` - deveria ser `/about`
- `/colophon` - existe mas não no caminho esperado
- `/blog` - deveria ser `/posts` ou criar redirecionamento
- `/fotos` - galeria não existe
- `/jogos` - página não existe
- `/afiliados` - deveria ser `/referrals`
- `/inscreva` - deveria ser `/subscribe`
- `/ia` - página sobre uso de IA não existe
- `/interesses` - deveria ser `/interests`
- `/verifique` - deveria ser `/verify`
- `/apoie` - página de apoio não existe

#### Em `pages/subscribe.md`:

- `/rss-notas.xml`
- `/rss-filmes.xml`
- `/rss-blogroll.xml`
- `/rss-biblioteca.xml`

**Recomendação**: Criar páginas faltantes ou corrigir os links

### 2. Imagens com Alias `@assets` (Baixa Prioridade) 🟡

47 ocorrências de imagens usando `@assets/images/blog/...`

Estas são aliases do Eleventy e funcionam em build, apenas não podem ser verificadas estaticamente.

**Arquivos afetados**:

- `posts/2015/caso-de-amor-acessibilidade.md`
- `posts/2016/a-teologia-por-tras-do-pokemon-go.md`
- `posts/2016/idolos-de-bolso.md`
- `posts/2017/node-school-bh-17.md`
- `posts/2019/tdc-bh-19.md`
- `posts/2020/5-motivos-para-nao-automatizar-testes-em-linguagem-diferente-do-time.md`
- `posts/2020/6-maiores-erros-de-acessibilidade-digital.md`
- `posts/2020/usando-o-atributo-lang-corretamente.md`
- `posts/2021/5-livros-acessibilidade-digital.md`
- `posts/2021/acessibilidade-criterios-de-aceite.md`
- `posts/2021/acessibilidade-para-iniciantes.md`
- `posts/2021/o-que-significa-a11y.md`
- `posts/2022/5-motivos-para-usar-leitor-de-telas.md`
- `posts/2022/como-criar-graficos-acessiveis.md`

**Recomendação**: Verificar se as imagens existem em `src/assets/images/blog/`

### 3. Links Malformados (Alta Prioridade) 🔴

Estes links têm problemas de formatação:

- `notas/2019/2019-03-08-132055.md` - link com espaços: `    /tu-%C3%A9s-30bf3cadcce3`
- `notas/2019/2019-04-15-120935.md` - link vazio: `  `
- `newsletter/2023/mapa-da-mina.md` - link com `<`: `<https://www.w3.org/...`
- Vários em `notas/2021/` - links com espaços extras

**Recomendação**: Corrigir formatação ou remover

### 4. Links Externos (Medium) com 403

O plugin broken-links detectou vários links do Medium que retornam 403:

- `https://medium.com/bruno-pulis/como-a-teologia-me-ajudou-a-palestrar-2a5818089f68`
- `https://medium.com/saber-teol%C3%B3gico/resenha-desintoxicacao-sexual-c6936f96ae25`
- `https://medium.com/bruno-pulis/texto-alternativo-o-guia-definitivo-ae196e7a1e39`
- `https://medium.com/p/as-chamas-da-desesperan%C3%A7a-d1ed254604d7`

**Recomendação**: Atualizar com links do Medium corretos ou remover

## Ações Recomendadas

### Ação Imediata

1. **Corrigir links de navegação** em `pages/about.md` e `pages/explore.md`
2. **Remover links malformados** das notas
3. **Criar ou corrigir feeds RSS** faltantes

### Ação de Médio Prazo

1. **Criar páginas faltantes**: `/jogos`, `/filmes`, `/musicos`, `/agora`, `/ia`
2. **Configurar redirects** para aliases comuns (ex: `/blog` → `/posts`)
3. **Revisar imagens** com alias `@assets` para confirmar existência

### Links Seguros para Remover

Estes podem ser removidos sem impact:

- Links com apenas espaços/vazios
- Links malformados com `<https://`
- Links do Medium com 403 (se não forem essenciais)

## Script para Limpeza Automática

Crie `scripts/fix-broken-links.js` para:

1. Remover links vazios
2. Corrigir links malformados
3. Substituir aliasescomuns (`/biblioteca` → `/livros`)
