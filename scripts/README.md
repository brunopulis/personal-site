# Importador de Tweets para Notes

Este script importa seus tweets do Twitter/X para a coleção `notes` do Astro.

## 📋 Pré-requisitos

1. **Baixar seus dados do Twitter**
   - Acesse [Twitter Settings > Your Account > Download an archive of your data](https://twitter.com/settings/download_your_data)
   - Aguarde o Twitter processar e enviar o arquivo (pode levar até 24h)
   - Extraia o arquivo ZIP recebido

2. **Localizar o arquivo de tweets**
   - No arquivo extraído, procure por: `data/tweets.js` ou `data/tweet.js`
   - Copie este arquivo para a pasta `data/` do seu projeto
   - Renomeie para `twitter.json` (ou ajuste o caminho em `CONFIG.twitterDataPath`)

## 🚀 Como usar

### 1. Configurar o script

Edite o arquivo `scripts/import-tweets.js` e ajuste as configurações:

```javascript
const CONFIG = {
  twitterDataPath: './data/twitter.json', // Caminho do arquivo de dados
  tweetsOutputPath: './src/content/notes', // Onde salvar os arquivos
  twitterHandle: 'obrunopulis', // Seu @ do Twitter
  filters: {
    startDate: null, // Ex: '2023-01-01' para importar apenas tweets após esta data
    endDate: null, // Ex: '2023-12-31' para importar apenas tweets antes desta data
    excludeReplies: false, // true para não importar respostas
    excludeRetweets: true, // true para não importar retweets
    excludeThreads: true, // true para não importar threads (respostas aos próprios tweets)
    minFavorites: 0, // Número mínimo de curtidas para importar
  },
};
```

### 2. Executar o script

```bash
node scripts/import-tweets.js
```

## 📝 Formato dos arquivos gerados

Os arquivos serão criados em `src/content/notes/` com o seguinte formato:

### Nome do arquivo

- Padrão: `YYYY-MM-DD-HHMMSS.md`
- Exemplo: `2024-11-23-143022.md`
- Inclui hora/minuto/segundo para evitar conflitos no mesmo dia

### Estrutura do frontmatter

```yaml
---
title: 'Título opcional do tweet' # Apenas se o tweet for curto e significativo
pubDate: 2024-11-23T14:30:22.000Z
published: true
type: note # ou 'reply' se for uma resposta
syndication:
  - 'https://twitter.com/obrunopulis/status/1234567890'
tags: ['javascript', 'astro'] # Hashtags do tweet
in_reply_to: 'https://twitter.com/user/status/1234567890' # Se for reply
metrics:
  retweets: 5
  favorites: 42
---
Conteúdo do tweet aqui...

![](https://pbs.twimg.com/media/image.jpg) # Se houver imagens
```

## 🎯 Schema da coleção

O script segue o schema definido em `src/content/schemas/notes.ts`:

```typescript
{
  title: z.string().optional(),              // Título opcional
  pubDate: z.coerce.date(),                  // Data de publicação (obrigatório)
  published: z.boolean().default(true),      // Status de publicação
  type: z.enum(['note', 'reply', 'article']).default('note'),
  syndication: z.array(z.string().url()).optional(),  // Links para o tweet original
  tags: z.array(z.string()).optional(),      // Tags/hashtags
  in_reply_to: z.string().url().optional(),  // URL do tweet respondido
  metrics: z.object({                        // Métricas de engajamento
    retweets: z.number(),
    favorites: z.number(),
  }).optional(),
}
```

## 🔧 Recursos

- ✅ Converte URLs do Twitter para links markdown
- ✅ Remove links t.co de imagens (as imagens são adicionadas separadamente)
- ✅ Extrai hashtags automaticamente
- ✅ Detecta replies e marca como tipo 'reply'
- ✅ Inclui métricas de engajamento (retweets e favoritos)
- ✅ Adiciona imagens do tweet
- ✅ Evita duplicatas (não reimporta tweets já existentes)
- ✅ Filtros configuráveis por data, tipo e engajamento

## 📊 Exemplo de saída

```
🐦 Importador de Tweets para Astro

==================================================
📖 Lendo dados do Twitter...
✅ 1250 tweets encontrados

🔍 Aplicando filtros...
✅ 842 tweets após filtros

⚙️  Processando tweets...

  ✓ 50 tweets importados...
  ✓ 100 tweets importados...
  ...

==================================================
✨ Importação concluída!

📊 Estatísticas:
   • 842 tweets importados
   • 0 tweets já existentes
   • 0 erros

📂 Arquivos salvos em: ./src/content/notes

💡 Próximos passos:
   1. Configure a collection 'notes' no astro.config.mjs
   2. Execute 'npm run dev' para testar
   3. Crie páginas para listar suas notes
```

## 🐛 Solução de problemas

### Erro: "Arquivo não encontrado"

- Verifique se o arquivo `data/twitter.json` existe
- Ajuste o caminho em `CONFIG.twitterDataPath`

### Erro de parsing JSON

- O arquivo do Twitter pode ter um prefixo JavaScript
- O script remove automaticamente `window.YTD.tweets.part0 =`
- Se o formato for diferente, ajuste a função `readTwitterData()`

### Tweets não aparecem

- Verifique os filtros em `CONFIG.filters`
- Confirme que a collection 'notes' está configurada no Astro
- Execute `npm run dev` e verifique o console por erros

## 📚 Referências

- [Twitter Data Archive](https://help.twitter.com/en/managing-your-account/how-to-download-your-twitter-archive)
- [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/)
- [IndieWeb Syndication](https://indieweb.org/syndication)
