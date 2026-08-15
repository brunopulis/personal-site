import fs from 'node:fs';
import {buildAllCss} from '../src/_config/events/build-css.js';

const watch = process.argv.includes('--watch');
const CSS_DIR = 'src/assets/css';

const rebuild = async () => {
  try {
    await buildAllCss();
    console.log('[build-css] compiled');
  } catch (error) {
    console.error('[build-css] build failed:', error.message);
  }
};

if (!watch) {
  await buildAllCss();
} else {
  await rebuild();

  let timer;
  const schedule = () => {
    clearTimeout(timer);
    timer = setTimeout(rebuild, 100);
  };

  fs.watch(CSS_DIR, {recursive: true}, schedule);
  console.log(`[build-css] watching ${CSS_DIR} ...`);

  process.on('SIGINT', () => process.exit(0));
  process.on('SIGTERM', () => process.exit(0));
}
