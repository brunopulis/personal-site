import {existsSync} from 'node:fs';
import path from 'node:path';

export const ogImage = (title, defaultImage = '/assets/images/opengraph-default.jpg') => {
  if (!title) return defaultImage;

  const slug = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const ogImagePath = path.join('src/assets/og-images', `${slug}-preview.jpeg`);
  const ogImagePathWebp = path.join('src/assets/og-images', `${slug}-preview.webp`);

  if (existsSync(ogImagePath) || existsSync(ogImagePathWebp)) {
    return `/assets/og-images/${slug}-preview.jpeg`;
  }

  return defaultImage;
};
