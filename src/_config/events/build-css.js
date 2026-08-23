import fs from 'node:fs/promises';
import path from 'node:path';
import postcss from 'postcss';
import * as sass from 'sass';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import fg from 'fast-glob';

const buildCss = async (inputPath, outputPaths) => {
  const result = sass.compile(inputPath, {
    loadPaths: ['src/assets/css'],
    style: 'compressed',
    silenceDeprecations: ['import']
  });

  const processed = await postcss([autoprefixer, cssnano]).process(result.css, {from: inputPath});
  // Dart Sass compressed mode emits a BOM when the source has non-ASCII characters.
  const css = processed.css.replace(/^\uFEFF/, '');

  for (const outputPath of outputPaths) {
    await fs.mkdir(path.dirname(outputPath), {recursive: true});
    await fs.writeFile(outputPath, css);
  }

  return css;
};

export const buildAllCss = async () => {
  const tasks = [];

  tasks.push(buildCss('src/assets/css/app.scss', ['src/_includes/css/global.css']));

  const localCssFiles = await fg(['src/assets/css/local/**/*.{css,scss}']);
  for (const inputPath of localCssFiles) {
    const baseName = path.basename(inputPath, path.extname(inputPath));
    tasks.push(buildCss(inputPath, [`src/_includes/css/${baseName}.css`]));
  }

  const componentCssFiles = await fg(['src/assets/css/components/**/*.{css,scss}']);
  for (const inputPath of componentCssFiles) {
    const baseName = path.basename(inputPath, path.extname(inputPath));
    tasks.push(buildCss(inputPath, [`_site/assets/css/components/${baseName}.css`]));
  }

  await Promise.all(tasks);
};
