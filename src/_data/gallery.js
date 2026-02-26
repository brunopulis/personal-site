import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function () {
  const dir = path.join(__dirname, '../assets/images/gallery/');

  if (!fs.existsSync(dir)) {
    console.warn(`Diretório não encontrado: ${dir}`);
    return [];
  }

  const images = fs.readdirSync(dir).filter(file => {
    return ['.jpg', '.jpeg', '.png', '.webp'].includes(path.extname(file).toLowerCase());
  });

  return images.map(image => ({
    src: `/assets/images/gallery/${image}`,
    alt: '',
  }));
}
