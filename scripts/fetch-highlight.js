#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive: true});
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, res => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return resolve(download(res.headers.location, dest));
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlink(dest, () => {});
          return reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
        }
        res.pipe(file);
        file.on('finish', () => file.close(resolve));
      })
      .on('error', err => {
        fs.unlink(dest, () => {});
        reject(err);
      });
  });
}

async function main() {
  const root = process.cwd();
  const jsDir = path.join(root, 'src', 'assets', 'js');
  const cssDir = path.join(root, 'src', 'assets', 'css', 'highlight');
  ensureDirSync(jsDir);
  ensureDirSync(cssDir);

  const version = '11.9.0';
  const baseUrl = `https://unpkg.com/@highlightjs/cdn-assets@${version}`;

  const targets = [
    {url: `${baseUrl}/highlight.min.js`, file: path.join(jsDir, 'highlight.min.js')},
    {url: `${baseUrl}/styles/tokyo-night-light.min.css`, file: path.join(cssDir, 'tokyo-night-light.min.css')},
    {url: `${baseUrl}/styles/tokyo-night-dark.min.css`, file: path.join(cssDir, 'tokyo-night-dark.min.css')}
  ];

  for (const t of targets) {
    try {
      await fs.promises.access(t.file);
      console.log('[highlight] Exists, skipping', path.basename(t.file));
    } catch {
      try {
        await download(t.url, t.file);
        console.log('[highlight] Downloaded', path.basename(t.file));
      } catch (e) {
        console.warn('[highlight] Failed:', e.message);
      }
    }
  }
}

main().catch(e => {
  console.error('[highlight] Error:', e.message);
  process.exit(0);
});