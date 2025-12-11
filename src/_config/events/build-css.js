import fs from 'node:fs/promises';
import path from 'node:path';
import fg from 'fast-glob';

const buildCss = async (inputPath, outputPaths) => {
  const inputContent = await fs.readFile(inputPath, 'utf-8');

  for (const outputPath of outputPaths) {
    await fs.mkdir(path.dirname(outputPath), {recursive: true});
    await fs.writeFile(outputPath, inputContent);
  }

  return inputContent;
};

export const buildAllCss = async () => {
  // Encontra os arquivos CSS a serem compilados
  const simpleFiles = await fg(['src/assets/css/simple.css']);
  const customFiles = await fg(['src/assets/css/custom.css']);

  // Cria o diretório de destino
  await fs.mkdir('dist/assets/css', {recursive: true});
  await fs.mkdir('src/_includes/css', {recursive: true});

  // Concatena os arquivos CSS para o global.css
  let concatenatedCss = '';

  // Copia simple.css individualmente e adiciona ao concatenado
  for (const file of simpleFiles) {
    const content = await fs.readFile(file, 'utf-8');
    // Copia o arquivo individual
    await fs.writeFile('dist/assets/css/simple.css', content);
    // Adiciona ao concatenado
    concatenatedCss += `/* ${path.basename(file)} */\n${content}\n\n`;
  }

  // Copia custom.css individualmente e adiciona ao concatenado
  for (const file of customFiles) {
    const content = await fs.readFile(file, 'utf-8');
    // Copia o arquivo individual
    await fs.writeFile('dist/assets/css/custom.css', content);
    // Adiciona ao concatenado
    concatenatedCss += `/* ${path.basename(file)} */\n${content}\n\n`;
  }

  // Escreve o arquivo global.css concatenado
  await fs.writeFile('dist/assets/css/global.css', concatenatedCss);
  await fs.writeFile('src/_includes/css/global.css', concatenatedCss);
};
