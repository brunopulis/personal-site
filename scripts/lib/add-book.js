import slugify from 'slugify';
import {createInterface} from 'readline';

export function createPrompter(input, output = process.stdout) {
  const rl = createInterface({input});
  const queue = [];
  let pendingResolve = null;
  let closed = false;

  rl.on('line', line => {
    if (pendingResolve) {
      const resolve = pendingResolve;
      pendingResolve = null;
      resolve(line);
    } else {
      queue.push(line);
    }
  });

  rl.on('close', () => {
    closed = true;
    if (pendingResolve) {
      const resolve = pendingResolve;
      pendingResolve = null;
      resolve('');
    }
  });

  return {
    ask(question) {
      output.write(question);
      if (queue.length > 0) {
        return Promise.resolve(queue.shift());
      }
      if (closed) {
        return Promise.resolve('');
      }
      return new Promise(resolve => {
        pendingResolve = resolve;
      });
    },
    close() {
      rl.close();
    }
  };
}

export function parseChoice(answer, options, defaultIndex = 0) {
  const index = parseInt(answer, 10) - 1;
  return options[index] ?? options[defaultIndex];
}

export function parseRating(answer) {
  if (!answer) return '';
  return parseInt(answer, 10) || '';
}

function quote(value) {
  return `"${String(value).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

export function buildFrontmatter(fields) {
  const {
    title,
    subtitle = '',
    author = '',
    category = '',
    status = 'lido',
    rating = '',
    poster = '',
    description = '',
    thoughts = '',
    quotes = '',
    attendedYear = String(new Date().getFullYear()),
    recommendBy = '',
    tags = [],
    url = '',
    pubDate = new Date().toISOString().slice(0, 10)
  } = fields;

  const tagList = Array.isArray(tags)
    ? tags
    : String(tags)
        .split(',')
        .map(t => t.trim())
        .filter(Boolean);
  const tagsYaml = `[${tagList.map(quote).join(', ')}]`;

  let yaml = `---
title: ${quote(title)}
`;
  if (subtitle) yaml += `subtitle: ${quote(subtitle)}\n`;
  yaml += `author: ${quote(author)}
category: ${quote(category)}
status: ${status}
rating: ${rating}
poster: ${quote(poster)}
description: ${quote(description)}
`;
  if (thoughts) yaml += `thoughts: ${quote(thoughts)}\n`;
  if (quotes) yaml += `quotes: ${quote(quotes)}\n`;
  yaml += `attendedYear: ${attendedYear}
`;
  if (recommendBy) yaml += `recommendBy: ${quote(recommendBy)}\n`;
  yaml += `tags: ${tagsYaml}
url: ${quote(url)}
pubDate: ${pubDate}
---
`;

  return yaml;
}

export function buildFilePath({title, attendedYear, pubDate}) {
  const slug = slugify(title, {lower: true, strict: true});
  const fileName = `${pubDate}-${slug}.md`;
  return {contentDir: attendedYear || String(new Date().getFullYear()), fileName};
}
