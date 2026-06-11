import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const fetch = globalThis.fetch;

async function downloadImage(url, filepath) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(filepath, buffer);
  console.log(`✓ Downloaded: ${path.basename(filepath)}`);
}

async function main() {
  const projectRoot = path.join(__dirname, '..');
  const contentDir = path.join(projectRoot, 'src/content/watching');
  const imagesDir = path.join(projectRoot, 'src/assets/images/posters');
  
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  const files = fs.readdirSync(contentDir, { recursive: true })
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(contentDir, f));

  const urls = new Set();
  
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.matchAll(/https:\/\/image\.tmdb\.org\/t\/p\/w600_and_h900_face\/([a-zA-Z0-9]+)\.jpg/g);
    for (const match of matches) {
      urls.add(match[0]);
    }
  }

  console.log(`Found ${urls.size} unique TMDB images`);

  let downloaded = 0;
  let skipped = 0;

  for (const url of urls) {
    const filename = url.split('/').pop();
    const localPath = path.join(imagesDir, filename);
    
    if (fs.existsSync(localPath)) {
      skipped++;
      continue;
    }

    try {
      await downloadImage(url, localPath);
      downloaded++;
    } catch (err) {
      console.error(`✗ Failed: ${filename} - ${err.message}`);
    }
  }

  console.log(`\nDone! Downloaded: ${downloaded}, Skipped: ${skipped}`);
}

main();