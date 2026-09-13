#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import sharp from 'sharp';

function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive: true});
}

async function ensureDir(p) {
  await fs.promises.mkdir(p, {recursive: true});
}

const MAX_REDIRECTS = 5;
const DOWNLOAD_TIMEOUT_MS = 30000;
const MAX_BYTES = 25 * 1024 * 1024;

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

    const req = https.request(parsed, res => {
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

async function generateIcons(root) {
  const srcSvg = path.join(root, 'src', 'assets', 'favicon.svg');
  const outDir = path.join(root, 'src', 'assets');

  try {
    await fs.promises.access(srcSvg, fs.constants.R_OK);
  } catch {
    console.error('[setup] Source SVG not found:', srcSvg);
    return;
  }

  await ensureDir(outDir);
  const svgBuffer = await fs.promises.readFile(srcSvg);

  const tasks = [
    {file: 'favicon-16x16.png', size: 16},
    {file: 'favicon-32x32.png', size: 32},
    {file: 'apple-touch-icon.png', size: 180}
  ];

  for (const t of tasks) {
    const outPath = path.join(outDir, t.file);
    await sharp(svgBuffer, {density: 384})
      .resize(t.size, t.size)
      .png({compressionLevel: 9, adaptiveFiltering: true})
      .toFile(outPath);
    console.log('[setup] Wrote', path.relative(root, outPath));
  }
}

async function fetchAssets(root) {
  if (process.env.SKIP_FETCH_ASSETS === '1' || process.env.SKIP_FETCH_ASSETS === 'true') {
    console.log('[setup] Skipping asset fetch (SKIP_FETCH_ASSETS set)');
    return;
  }

  const assetsDir = path.join(root, 'src', 'assets');
  ensureDirSync(assetsDir);

  let siteConfigAssets = {};
  try {
    const siteJsonPath = path.join(root, 'src', '_data', 'site.json');
    const raw = await fs.promises.readFile(siteJsonPath, 'utf8');
    const parsed = JSON.parse(raw);
    if (parsed && parsed.assets) {
      siteConfigAssets = parsed.assets;
    }
  } catch {}

  const defaults = {
    profileUrl: 'https://placehold.co/300x300.jpg?text=Profile',
    ogDefaultUrl: 'https://placehold.co/1200x630/png?text=OG%20Image',
    retroStarsUrl: 'https://www.transparenttextures.com/patterns/stardust.png'
  };

  const cfg = {
    profileUrl: process.env.PROFILE_IMAGE_URL || siteConfigAssets.profileUrl || defaults.profileUrl,
    ogDefaultUrl: process.env.OG_DEFAULT_URL || siteConfigAssets.ogDefaultUrl || defaults.ogDefaultUrl,
    retroStarsUrl: process.env.RETRO_STARS_URL || siteConfigAssets.retroStarsUrl || defaults.retroStarsUrl
  };

  const targets = [
    cfg.profileUrl && {url: cfg.profileUrl, file: 'profile.jpg', desc: 'profile image placeholder'},
    cfg.ogDefaultUrl && {
      url: cfg.ogDefaultUrl,
      file: 'og-default.png',
      desc: 'default Open Graph image placeholder'
    },
    cfg.retroStarsUrl && {
      url: cfg.retroStarsUrl,
      file: 'retro-stars.png',
      desc: 'retro stars background tile'
    }
  ].filter(Boolean);

  for (const t of targets) {
    const outPath = path.join(assetsDir, t.file);
    try {
      await fs.promises.access(outPath, fs.constants.F_OK);
      console.log('[setup] Exists, skipping', path.relative(root, outPath));
    } catch {
      try {
        await download(t.url, outPath);
        console.log('[setup] Downloaded', t.desc, '->', path.relative(root, outPath));
      } catch (e) {
        console.warn('[setup] Failed to download', t.url, e.message);
      }
    }
  }
}

async function main() {
  const root = process.cwd();
  await generateIcons(root);
  await fetchAssets(root);
  console.log('[setup] Done');
}

main().catch(err => {
  console.error('[setup] Error:', err);
  process.exit(1);
});
