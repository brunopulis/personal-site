import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {categories} from '../../_data/taxonomy.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..', '..', '..');

const COLLECTION_MAP = [
  {dir: 'src/content/posts', vocab: categories.posts},
  {dir: 'src/content/books', vocab: categories.books},
  {dir: 'src/content/watching/movies', vocab: categories.movies},
  {dir: 'src/content/watching/shows', vocab: categories.shows}
];

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

function extractCategories(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return [];

  const line = match[1].match(/^category:\s*(.*)$/m);
  if (!line) return [];

  const raw = line[1].trim();
  const parts = raw.startsWith('[') ? raw.replace(/^\[|\]$/g, '').split(',') : [raw];

  return parts.map(value => value.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
}

export const validateCategories = () => {
  const problems = [];

  COLLECTION_MAP.forEach(({dir, vocab}) => {
    const labels = new Set(vocab.map(entry => entry.label));
    const baseDir = path.join(rootDir, dir);

    getAllFiles(baseDir).forEach(file => {
      const content = fs.readFileSync(file, 'utf-8');
      extractCategories(content).forEach(category => {
        if (!labels.has(category)) {
          problems.push({
            file: file.replace(rootDir, ''),
            category
          });
        }
      });
    });
  });

  return problems;
};
