#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {get} from 'node:https';

const MAX_REDIRECTS = 5;
const DOWNLOAD_TIMEOUT_MS = 30000;
const MAX_BYTES = 25 * 1024 * 1024;

export function isSkipped() {
  return process.env.SKIP_FETCH_ASSETS === '1' || process.env.SKIP_FETCH_ASSETS === 'true';
}

function walkFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(full);
    }
  }
  return results;
}

export function extractPosterUrls(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const urls = [];
  for (const match of raw.matchAll(/^poster:\s*(.+)$/gm)) {
    const value = String(match[1]).trim().replace(/["']/g, '');
    try {
      const parsed = new URL(value);
      if (parsed.hostname === 'image.tmdb.org') {
        urls.push(value);
      }
    } catch {
      // ignore non-URL values (ex: empty poster)
    }
  }
  return urls;
}

function download(url, dest, redirects = 0) {
  return new Promise((resolve, reject) => {
    let parsed;
    try {
      parsed = new URL(url);
    } catch {
      return reject(new Error(`Invalid download URL: ${url}`));
    }
    if (parsed.protocol !== 'https:') {
      return reject(new Error(`Download URL must use https: ${url}`));
    }

    const req = get(parsed, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        if (redirects >= MAX_REDIRECTS) {
          return reject(new Error(`Too many redirects for ${url}`));
        }
        return resolve(download(new URL(res.headers.location, parsed).href, dest, redirects + 1));
      }
      if (res.statusCode !== 200) {
        res.resume();
        return reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
      }

      const declaredLength = Number(res.headers['content-length'] || 0);
      if (declaredLength > MAX_BYTES) {
        res.resume();
        return reject(new Error(`Download too large: ${url} (${declaredLength} bytes)`));
      }

      const contentType = res.headers['content-type'] || '';
      if (!contentType.startsWith('image/')) {
        res.resume();
        return reject(new Error(`Unexpected content-type: ${contentType || 'none'}`));
      }

      const file = fs.createWriteStream(dest);
      let received = 0;
      res.on('data', chunk => {
        received += chunk.length;
        if (received > MAX_BYTES) {
          file.destroy();
          res.destroy();
          fs.unlink(dest, () => {});
          return reject(new Error(`Download exceeded size limit: ${url}`));
        }
      });
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', err => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    });

    req.setTimeout(DOWNLOAD_TIMEOUT_MS, () => {
      req.destroy(new Error(`Download timed out: ${url}`));
    });
    req.on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
    req.end();
  });
}

export async function syncPosters(root = process.cwd()) {
  if (isSkipped()) {
    console.log('[posters] Skipping sync (SKIP_FETCH_ASSETS set)');
    return;
  }

  const watchingDir = path.join(root, 'src', 'content', 'watching');
  const postersDir = path.join(root, 'src', 'assets', 'images', 'posters');

  if (!fs.existsSync(watchingDir)) {
    return;
  }
  fs.mkdirSync(postersDir, {recursive: true});

  const files = walkFiles(watchingDir);
  const seen = new Set();
  let missing = 0;

  for (const file of files) {
    for (const url of extractPosterUrls(file)) {
      const filename = new URL(url).pathname.split('/').pop();
      if (seen.has(filename)) continue;
      seen.add(filename);

      const dest = path.join(postersDir, filename);
      if (fs.existsSync(dest)) {
        continue;
      }

      const tmp = `${dest}.tmp`;
      try {
        await download(url, tmp);
        fs.renameSync(tmp, dest);
        console.log(`[posters] Baixado: ${filename} (${path.relative(root, file)})`);
        missing += 1;
      } catch (err) {
        fs.rmSync(tmp, {force: true});
        console.warn(`[posters] Falha ao baixar ${filename}: ${err.message}`);
      }
    }
  }

  if (missing > 0) {
    console.log(`[posters] ${missing} poster(s) baixado(s) em ${path.relative(root, postersDir)}`);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  syncPosters().catch(err => {
    console.error('[posters] Error:', err);
    process.exit(1);
  });
}
