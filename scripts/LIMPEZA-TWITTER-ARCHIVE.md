# 🧹 Guia de Limpeza do Twitter Archive

## 📁 Estrutura Atual

Você tem o Twitter Archive completo em `scripts/tweets/`. Este arquivo contém **MUITO** mais dados do que você precisa para importar tweets.

## ✅ Arquivos ESSENCIAIS (manter)

### Para importação de tweets:

- **`scripts/tweets/data/tweets.js`** (13 MB) ⭐ **PRINCIPAL**
  - Contém todos os seus tweets
  - É o único arquivo necessário para a importação

### Opcionais (úteis):

- `scripts/tweets/data/tweets_media/` (204 arquivos)
  - Imagens e vídeos dos seus tweets
  - Mantenha se quiser hospedar mídia localmente
- `scripts/tweets/Your archive.html`
  - Interface para visualizar o arquivo
  - Útil para consulta manual

## 🗑️ Arquivos que PODEM SER DELETADOS

Estes arquivos não são usados pelo importador:

### Dados da conta (não necessários):

- `account*.js` - Informações da conta
- `profile.js` - Dados do perfil
- `verified.js` - Status de verificação
- `personalization.js` - Configurações de personalização

### Dados sociais (não necessários):

- `follower.js` (114 KB) - Lista de seguidores
- `following.js` (87 KB) - Lista de seguindo
- `block.js` (61 KB) - Lista de bloqueados
- `mute.js` (18 KB) - Lista de silenciados
- `contact.js` (74 KB) - Contatos

### Interações (não necessários):

- `like.js` (2.8 MB!) - Tweets curtidos
- `direct-messages*.js` - Mensagens diretas
- `community-*.js` - Notas da comunidade

### Outros (não necessários):

- Todos os arquivos `periscope-*.js`
- `spaces-metadata.js`
- `moment.js`
- `lists-*.js`
- E todos os outros...

## 🎯 Opções de Limpeza

### Opção 1: Mínimo Essencial (recomendado)

Manter apenas:

```
scripts/tweets/
├── data/
│   └── tweets.js          # 13 MB - ESSENCIAL
└── Your archive.html      # 1.4 KB - Opcional
```

**Economia de espaço:** ~3 GB (se incluir pastas de mídia)

### Opção 2: Com Mídias

Manter:

```
scripts/tweets/
├── data/
│   ├── tweets.js          # 13 MB
│   └── tweets_media/      # Suas imagens/vídeos
└── Your archive.html
```

### Opção 3: Backup Completo

Se você não tem certeza, **faça um backup** do arquivo completo antes de deletar:

```bash
# Criar backup compactado
cd scripts
tar -czf tweets-backup-$(date +%Y%m%d).tar.gz tweets/

# Depois você pode limpar com segurança
```

## 🚀 Script de Limpeza Automática

Criei um script para você limpar automaticamente:

```bash
# Ver o que seria deletado (dry-run)
node scripts/cleanup-twitter-archive.js --dry-run

# Executar a limpeza
node scripts/cleanup-twitter-archive.js
```

## 📊 Estatísticas do seu arquivo

- **Total de arquivos:** ~285 arquivos
- **Arquivo principal:** `tweets.js` (13 MB)
- **Maior arquivo desnecessário:** `like.js` (2.8 MB)
- **Pastas de mídia:** 8 pastas (podem ser grandes)

## ⚠️ Importante

1. **Faça backup** antes de deletar qualquer coisa
2. O script de importação **só precisa** de `tweets.js`
3. Se quiser manter o arquivo completo para referência futura, mova para outro lugar:
   ```bash
   mv scripts/tweets ~/Backups/twitter-archive-completo/
   ```

## 💡 Recomendação Final

**Para importação de tweets:**

- Mantenha apenas `scripts/tweets/data/tweets.js`
- O script já está configurado para usar este arquivo
- Você pode deletar todo o resto com segurança

**Se quiser preservar tudo:**

- Faça backup do arquivo completo
- Mova para fora do projeto
- Mantenha apenas `tweets.js` no projeto
