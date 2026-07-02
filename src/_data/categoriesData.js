import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath }from 'node:url';
import { toSlug } from './tags-helpers.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..', '..');

function getAllFiles(dir) {
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

export function extractCategory(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const fm = match[1];
  const catMatch = fm.match(/^category:[ \t]*(.+)$/m);
  if (!catMatch) return null;

  const category = catMatch[1].trim().replace(/^['"]|['"]$/g, '');
  return category || null;
}

export default function () {
  const categoryMap = new Map();
  const baseDir = path.join(rootDir, 'src/content/posts');

  if (!fs.existsSync(baseDir)) return [];

  const files = getAllFiles(baseDir);

  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const category = extractCategory(content);
    if (!category) return;

    const slug = toSlug(category);

    if (categoryMap.has(slug)) {
      const entry = categoryMap.get(slug);
      entry.count++;
    } else {
      categoryMap.set(slug, { name: category, slug, count: 1 });
    }
  });

  return Array.from(categoryMap.values()).sort((a, b) => a.name.localeCompare(b.name));
}
