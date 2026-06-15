# Plano de Otimização do Build

## 1. Passthrough copy seletivo — `.eleventy.js`

**Arquivo:** `.eleventy.js` (linha 194)

**Substituir:**
```js
eleventyConfig.addPassthroughCopy({'src/assets': 'assets'});
```

**Por:**
```js
// Passthrough copies — selective, not the entire src/assets/
eleventyConfig.addPassthroughCopy({'src/assets/css/build.css': 'assets/css/build.css'});
eleventyConfig.addPassthroughCopy({'src/assets/css/highlight': 'assets/css/highlight'});
eleventyConfig.addPassthroughCopy({'src/assets/js': 'assets/js'});
eleventyConfig.addPassthroughCopy({'src/assets/images': 'assets/images'});
eleventyConfig.addPassthroughCopy({'src/assets/og-images': 'assets/og-images'});
eleventyConfig.addPassthroughCopy({'src/assets/favicon.svg': 'assets/favicon.svg'});
eleventyConfig.addPassthroughCopy({'src/assets/favicon-32x32.png': 'assets/favicon-32x32.png'});
eleventyConfig.addPassthroughCopy({'src/assets/favicon-16x16.png': 'assets/favicon-16x16.png'});
eleventyConfig.addPassthroughCopy({'src/assets/apple-touch-icon.png': 'assets/apple-touch-icon.png'});
```

**O que deixa de copiar:** `tailwind.css` (fonte), `svg/`, `favicon.ico`, `android-chrome-*`, `web-app-manifest-*`, `site.webmanifest`, `og-default.png`, `profile.jpg`, `retro-stars.png`.

---

## 2. Stats como computed data — `src/_data/stats.js`

**Criar arquivo:** `src/_data/stats.js`

```js
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..', '..');

function getAllFiles(dir, pattern) {
  const files = [];
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }
  walk(dir);
  return files;
}

function countWords(content) {
  const text = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  return text.split(' ').filter(w => w.length > 0).length;
}

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const frontmatter = {};
  const lines = match[1].split('\n');
  let currentKey = null;
  let currentArray = [];

  for (const line of lines) {
    const keyMatch = line.match(/^(\w+):\s*(.*)$/);
    if (keyMatch) {
      if (currentKey) {
        frontmatter[currentKey] = currentArray.length > 0 ? currentArray : (frontmatter[currentKey] || null);
      }
      currentKey = keyMatch[1];
      const value = keyMatch[2].trim();

      if (value === '') {
        currentArray = [];
      } else if (value.startsWith('[')) {
        const arrayContent = value.slice(1, -1);
        currentArray = arrayContent.split(',').map(s => s.trim().replace(/['"]/g, '')).filter(Boolean);
        frontmatter[currentKey] = currentArray;
        currentKey = null;
      } else {
        frontmatter[currentKey] = value.replace(/^['"]|['"]$/g, '');
      }
    } else if (line.match(/^\s+-\s+(.+)$/) && currentKey) {
      currentArray.push(line.match(/^\s+-\s+(.+)$/)[1].trim().replace(/['"]/g, ''));
    }
  }

  if (currentKey) {
    frontmatter[currentKey] = currentArray.length > 0 ? currentArray : (frontmatter[currentKey] || null);
  }

  return frontmatter;
}

function extractDate(frontmatter) {
  if (frontmatter.pubDate) {
    const date = new Date(frontmatter.pubDate);
    if (!isNaN(date)) return date;
  }
  if (frontmatter.date) {
    const date = new Date(frontmatter.date);
    if (!isNaN(date)) return date;
  }
  return null;
}

function processContent(baseDir, subDir) {
  const dir = path.join(baseDir, subDir);
  const files = getAllFiles(dir);

  const items = files.map(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const frontmatter = extractFrontmatter(content);
    const date = extractDate(frontmatter);

    let textContent = content;
    const fmMatch = content.match(/^---\n[\s\S]*?\n---/);
    if (fmMatch) {
      textContent = content.slice(fmMatch[0].length).trim();
    }

    const markdownContent = textContent
      .replace(/!\[.*?\]\(.*?\)/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/#{1,6}\s/g, '')
      .replace(/[*_`~]/g, '')
      .replace(/^\s*[-*+]\s+/gm, '')
      .replace(/^\s*\d+\.\s+/gm, '');

    const words = countWords(markdownContent);
    const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [];

    return { date, words, tags };
  }).filter(item => item.date !== null);

  return items;
}

export default function () {
  const srcDir = path.join(rootDir, 'src', 'content');

  const posts = processContent(srcDir, 'posts');
  const newsletters = processContent(srcDir, 'newsletters');
  const books = getAllFiles(path.join(srcDir, 'books')).filter(f => {
    const content = fs.readFileSync(f, 'utf-8');
    const fm = extractFrontmatter(content);
    return fm.status === 'lido';
  });
  const notes = getAllFiles(path.join(srcDir, 'notes'));

  const allContent = [...posts, ...newsletters];

  const totalPosts = posts.length;
  const totalNewsletters = newsletters.length;
  const totalContent = allContent.length;

  let totalWords = 0;
  allContent.forEach(item => {
    totalWords += item.words;
  });

  const averageWordsPerPost = totalPosts > 0 ? Math.round(totalWords / totalPosts) : 0;

  const allTags = new Set();
  posts.forEach(post => {
    post.tags.forEach(tag => {
      if (!['all', 'nav', 'post', 'posts'].includes(tag)) {
        allTags.add(tag);
      }
    });
  });

  const postsByYear = {};
  posts.forEach(post => {
    const year = post.date.getFullYear();
    if (!postsByYear[year]) {
      postsByYear[year] = 0;
    }
    postsByYear[year]++;
  });

  const yearsSorted = Object.keys(postsByYear).sort((a, b) => b - a);

  return {
    totalPosts,
    totalNewsletters,
    totalContent,
    totalWords,
    averageWordsPerPost,
    totalTags: allTags.size,
    allTags: Array.from(allTags).sort(),
    postsByYear,
    yearsSorted,
    totalBooks: books.length,
    totalNotes: notes.length
  };
}
```

---

## 3. Atualizar `package.json`

**Linha 18 — atual:**
```json
"build": "run-p build:stats build:css 'build:parallel' && cross-env ELEVENTY_ENV=production eleventy",
```

**Nova:**
```json
"build": "run-p build:css 'build:parallel' && cross-env ELEVENTY_ENV=production eleventy",
```

---

## 4. Verificação

Após aplicar as alterações:

```bash
npm run build
```

O Eleventy deve:
- Copiar apenas os diretórios/arquivos listados no passthrough seletivo
- Carregar `siteStats` de `src/_data/stats.js` em vez do JSON gerado externamente
- Não executar mais `build:stats` como etapa separada

Para testar se as stats estão corretas, compare a saída de `siteStats` no template ou verifique se páginas que usam `siteStats` (como a página inicial) continuam funcionando.
