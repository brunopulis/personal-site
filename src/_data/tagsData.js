import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import slugify from 'slugify';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..', '..');

const RESERVED_TAGS = ['posts', 'docs', 'all'];
const CONTENT_DIRS = [
  'src/content/posts',
  'src/content/notes',
  'src/content/books',
  'src/content/likes',
  'src/content/newsletters',
  'src/content/poetry',
  'src/content/talks',
  'src/content/watching/movies',
  'src/content/watching/shows'
];

function toSlug(str) {
  return slugify(str, {
    replacement: '-',
    remove: /[#,&,+()$~%.'":*¿?¡!<>{}]/g,
    lower: true
  });
}

function extractTags(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return [];

  const fm = match[1];
  const tagsMatch = fm.match(/^tags:\s*\n((?:\s*-\s*.+\n?)+)/m);
  if (tagsMatch) {
    return tagsMatch[1]
      .split('\n')
      .map(line =>
        line
          .replace(/^\s*-\s*/, '')
          .trim()
          .replace(/^['"]|['"]$/g, '')
      )
      .filter(Boolean);
  }

  const inlineMatch = fm.match(/^tags:\s*\[([^\]]*)\]/m);
  if (inlineMatch) {
    return inlineMatch[1]
      .split(',')
      .map(t => t.trim().replace(/^['"]|['"]$/g, ''))
      .filter(Boolean);
  }

  return [];
}

function getAllFiles(dir) {
  const files = [];
  function walk(d) {
    if (!fs.existsSync(d)) return;
    const entries = fs.readdirSync(d, {withFileTypes: true});
    for (const entry of entries) {
      const fullPath = path.join(d, entry.name);
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

export default function () {
  const tagMap = new Map();

  CONTENT_DIRS.forEach(dir => {
    const baseDir = path.join(rootDir, dir);
    if (!fs.existsSync(baseDir)) return;

    const files = getAllFiles(baseDir);
    files.forEach(file => {
      const content = fs.readFileSync(file, 'utf-8');
      const tags = extractTags(content);

      tags.forEach(tag => {
        if (RESERVED_TAGS.includes(tag)) return;
        const slug = toSlug(tag);

        if (tagMap.has(slug)) {
          tagMap.get(slug).count++;
        } else {
          tagMap.set(slug, {name: tag, slug, count: 1});
        }
      });
    });
  });

  return Array.from(tagMap.values()).sort((a, b) => b.count - a.count);
}
