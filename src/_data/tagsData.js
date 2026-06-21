import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { toSlug, extractTags } from './tags-helpers.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..', '..');
const IGNORE = new Set(['all', 'nav', 'post', 'posts', 'notes']);

const GLOBS = [
  'src/content/posts/**/*.md',
  'src/content/notes/**/*.md',
  'src/content/books/**/*.md',
  'src/content/watching/movies/**/*.md',
  'src/content/watching/shows/**/*.md',
  'src/content/games/**/*.md',
  'src/content/likes/**/*.md',
  'src/content/newsletters/**/*.md',
  'src/content/poetry/**/*.md'
];

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

export default function () {
  const tagMap = new Map();

  GLOBS.forEach(glob => {
    const baseDir = path.join(rootDir, glob.replace('/**/*.md', ''));
    if (!fs.existsSync(baseDir)) return;
    const files = getAllFiles(baseDir);

    files.forEach(file => {
      const content = fs.readFileSync(file, 'utf-8');
      const extracted = extractTags(content);

      extracted.forEach(tag => {
        if (!tag || IGNORE.has(tag)) return;
        const slug = toSlug(tag);
        if (!slug) return;

        if (tagMap.has(slug)) {
          const entry = tagMap.get(slug);
          entry.count++;
          if (!entry.names.includes(tag)) {
            entry.names.push(tag);
          }
        } else {
          tagMap.set(slug, { name: tag, slug, count: 1, names: [tag] });
        }
      });
    });
  });

  const result = Array.from(tagMap.values())
    .map(({ name, slug, count }) => ({ name, slug, count }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return result;
}
