import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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

export function toSlug(s) {
  return String(s)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

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

export function extractTags(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return [];

  const frontmatter = match[1];
  const tags = [];

  const lines = frontmatter.split('\n');
  let inTags = false;

  for (const line of lines) {
    const keyMatch = line.match(/^(\w+):\s*(.*)$/);
    if (keyMatch) {
      const key = keyMatch[1];
      const value = keyMatch[2].trim();
      inTags = key === 'tags';

      if (inTags && value.startsWith('[')) {
        const arrayContent = value.slice(1, -1);
        arrayContent.split(',').forEach(s => {
          const t = s.trim().replace(/['"]/g, '');
          if (t) tags.push(t);
        });
        inTags = false;
      }
    } else if (inTags && line.match(/^\s+-\s+(.+)$/)) {
      const tag = line.match(/^\s+-\s+(.+)$/)[1].trim().replace(/['"]/g, '');
      if (tag) tags.push(tag);
    }
  }

  return tags;
}

export default function () {
  const tagMap = new Map(); // slug -> { name, slug, count, names: [] }

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
