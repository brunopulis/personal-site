# 🐦 Importador de Tweets para Notes

Script para importar seus tweets do Twitter/X para a coleção `notes` do Astro.

## 🚀 Início Rápido

### 1. Teste com dados de exemplo

```bash
# Executar o script de teste
node scripts/test-import-tweets.js
```

Isso irá importar 3 tweets de exemplo para `src/content/notes-test/` para você ver como funciona.

### 2. Importar seus tweets reais

1. **Baixe seus dados do Twitter:**
   - Acesse: https://twitter.com/settings/download_your_data
   - Aguarde o processamento (até 24h)
   - Extraia o arquivo ZIP

2. **Configure o script:**
   - Copie o arquivo `data/tweets.js` do arquivo do Twitter para `data/twitter.json`
   - Edite `scripts/import-tweets.js` e ajuste `CONFIG.twitterHandle` com seu @

3. **Execute a importação:**
   ```bash
   node scripts/import-tweets.js
   ```

## 📝 Estrutura dos arquivos gerados

### Nome do arquivo

- Formato: `YYYY-MM-DD-HHMMSS.md`
- Exemplo: `2024-11-23-143022.md`

### Frontmatter (seguindo o schema de notes)

```yaml
---
title: 'Título opcional' # Apenas para tweets curtos
pubDate: 2024-11-23T14:30:22.000Z # Data de publicação
published: true # Status
type: note # 'note', 'reply' ou 'article'
syndication:
  - 'https://twitter.com/user/status/123'
tags: ['tag1', 'tag2'] # Hashtags do tweet
in_reply_to: 'https://...' # Se for reply
metrics: # Engajamento
  retweets: 12
  favorites: 48
---
Conteúdo do tweet aqui...
```

## ⚙️ Configuração

Edite `scripts/import-tweets.js`:

```javascript
const CONFIG = {
  twitterDataPath: './data/twitter.json', // Caminho dos dados
  tweetsOutputPath: './src/content/notes', // Destino
  twitterHandle: 'obrunopulis', // Seu @
  filters: {
    startDate: null, // Ex: '2023-01-01'
    endDate: null, // Ex: '2023-12-31'
    excludeReplies: false, // true = não importar respostas
    excludeRetweets: true, // true = não importar RTs
    minFavorites: 0, // Mínimo de curtidas
  },
};
```

## ✨ Recursos

- ✅ Converte URLs para markdown
- ✅ Extrai hashtags automaticamente
- ✅ Detecta e marca replies
- ✅ Inclui métricas de engajamento
- ✅ Adiciona imagens do tweet
- ✅ Evita duplicatas
- ✅ Filtros configuráveis

## 📚 Documentação completa

Veja `scripts/README.md` para documentação detalhada.

## 🎯 Schema

O script segue o schema definido em `src/content/schemas/notes.ts`:

```typescript
{
  title: z.string().optional(),
  pubDate: z.coerce.date(),
  published: z.boolean().default(true),
  type: z.enum(['note', 'reply', 'article']).default('note'),
  syndication: z.array(z.string().url()).optional(),
  tags: z.array(z.string()).optional(),
  in_reply_to: z.string().url().optional(),
  metrics: z.object({
    retweets: z.number(),
    favorites: z.number(),
  }).optional(),
}
```

## 📂 Arquivos

- `scripts/import-tweets.js` - Script principal de importação
- `scripts/test-import-tweets.js` - Script de teste com dados de exemplo
- `scripts/README.md` - Documentação completa
- `data/twitter-example.json` - Dados de exemplo para teste
- `src/content/schemas/notes.ts` - Schema da collection
- `src/content/config.ts` - Configuração das collections

## 🐛 Problemas?

1. **Arquivo não encontrado**: Verifique o caminho em `CONFIG.twitterDataPath`
2. **Erro de parsing**: O script remove automaticamente o prefixo JavaScript do Twitter
3. **Tweets não aparecem**: Verifique os filtros em `CONFIG.filters`

---

Criado para importar tweets para o Astro seguindo os princípios do IndieWeb 🌐
