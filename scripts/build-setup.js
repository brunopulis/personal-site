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
