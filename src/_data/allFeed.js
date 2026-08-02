import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..', '..');

const CONTENT_MAP = [
  {glob: 'src/content/posts/**/*.md', feedType: 'article', dateField: 'pubDate'},
  {glob: 'src/content/notes/**/*.md', feedType: 'note', dateField: 'pubDate'},
  {glob: 'src/content/likes/**/*.md', feedType: 'like', dateField: 'pubDate'},
  {glob: 'src/content/newsletters/**/*.md', feedType: 'newsletter', dateField: 'pubDate'},
  {glob: 'src/content/books/**/*.md', feedType: 'book', dateField: 'pubDate'},
  {glob: 'src/content/watching/movies/**/*.md', feedType: 'movie', dateField: 'watchedDate'},
  {glob: 'src/content/watching/shows/**/*.md', feedType: 'show', dateField: 'watchedDate'},
  {glob: 'src/content/poetry/**/*.md', feedType: 'poem', dateField: 'pubDate'}
];

function getAllFiles(globPattern) {
  const baseDir = path.join(rootDir, globPattern.replace('/**/*.md', ''));
  if (!fs.existsSync(baseDir)) return [];

  const files = [];
  function walk(dir) {
    const entries = fs.readdirSync(dir, {withFileTypes: true});
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }
  walk(baseDir);
  return files;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {raw: content};

  const fm = {};
  const lines = match[1].split('\n');
  let currentKey = null;

  for (const line of lines) {
    const keyMatch = line.match(/^(\w[\w-]*):\s*(.*)/);
    if (keyMatch) {
      currentKey = keyMatch[1];
      let value = keyMatch[2].trim();
      if (value.startsWith('[') || value.startsWith('-')) continue;
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      fm[currentKey] = value;
    }
  }

  const rawContent = content.slice(match[0].length).trim();
  return {...fm, raw: rawContent};
}

function fileToPermalink(filePath) {
  const rel = path.relative(path.join(rootDir, 'src/content'), filePath);
  const parts = rel.split(path.sep);
  parts.pop();
  const slug = path.basename(filePath, '.md');
  if (parts.length === 0) {
    return `/${slug}/`;
  }
  return `/${parts.join('/')}/${slug}/`;
}

export default function () {
  const items = [];

  for (const {glob, feedType, dateField} of CONTENT_MAP) {
    const files = getAllFiles(glob);

    for (const file of files) {
      const content = fs.readFileSync(file, 'utf-8');
      const fm = parseFrontmatter(content);
      const sortDate = fm[dateField] || fm.date;

      if (!sortDate) continue;

      items.push({
        url: fileToPermalink(file),
        data: fm,
        _feedType: feedType,
        _sortDate: sortDate,
        _content: fm.raw || ''
      });
    }
  }

  return items.sort((a, b) => new Date(b._sortDate) - new Date(a._sortDate)).slice(0, 20);
}
