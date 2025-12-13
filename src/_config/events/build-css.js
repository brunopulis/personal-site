import fs from 'node:fs/promises';

export const buildAllCss = async () => {
  // Arquivo CSS do Tailwind
  const tailwindFile = 'src/assets/css/tailwind.css';

  // Cria o diretório de destino
  await fs.mkdir('dist/assets/css', {recursive: true});
  await fs.mkdir('src/_includes/css', {recursive: true});

  // Lê e processa o tailwind.css
  try {
    const tailwindContent = await fs.readFile(tailwindFile, 'utf-8');

    // Escreve o arquivo main-dist.css que é usado no layout
    await fs.writeFile('dist/assets/css/main-dist.css', tailwindContent);

    // Mantém o global.css para compatibilidade (se necessário)
    await fs.writeFile('dist/assets/css/global.css', tailwindContent);
    await fs.writeFile('src/_includes/css/global.css', tailwindContent);
  } catch (error) {
    console.log(`⚠️  Arquivo ${tailwindFile} não encontrado. Execute 'pnpm run css:build' primeiro.`);
  }
};
