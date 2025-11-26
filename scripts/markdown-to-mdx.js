import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, '../src/content/blog/pt-br');
const ASSETS_DIR = path.join(__dirname, '../src/assets/blog');

// Garantir que a pasta de assets existe
if (!fs.existsSync(ASSETS_DIR)) {
  fs.mkdirSync(ASSETS_DIR, { recursive: true });
}

/**
 * Extrai frontmatter YAML do arquivo
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, body: content };
  }

  const [, frontmatterStr, body] = match;
  const frontmatter = {};

  frontmatterStr.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      const value = valueParts.join(':').trim();
      // Remover aspas se existirem
      frontmatter[key.trim()] = value.replace(/^["']|["']$/g, '').trim();
    }
  });

  return { frontmatter, body };
}

/**
 * Processa imagens markdown e converte para componente Astro Image
 */
function processImages(content, filename) {
  const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  const imports = [];
  let processedContent = content;
  let imageCounter = 0;

  processedContent = content.replace(imageRegex, (match, alt, src) => {
    // Ignorar URLs externas
    if (src.startsWith('http')) {
      return match;
    }

    // Gerar nome único para a imagem
    const fileBasename = path.parse(filename).name;
    const imageName = `${fileBasename}-${imageCounter++}`;
    const ext = path.extname(src);
    const newImagePath = `${imageName}${ext}`;

    // Adicionar import
    imports.push(`import ${imageName} from '../../assets/blog/${newImagePath}';`);

    // Retornar componente Image
    return `<Image src={${imageName}} alt="${alt || 'Imagem do post'}" />`;
  });

  return { processedContent, imports };
}

/**
 * Converte arquivo markdown para MDX
 */
function convertToMDX(content, filename) {
  const { frontmatter, body } = parseFrontmatter(content);
  const { processedContent, imports } = processImages(body, filename);

  // Construir arquivo MDX
  let mdxContent = '---\n';

  // Reconstruir frontmatter
  for (const [key, value] of Object.entries(frontmatter)) {
    if (key === 'pubDate') {
      mdxContent += `${key}: ${value}\n`;
    } else {
      mdxContent += `${key}: "${value}"\n`;
    }
  }

  mdxContent += '---\n\n';

  // Adicionar imports apenas se houver imagens
  if (imports.length > 0) {
    mdxContent += "import { Image } from 'astro:assets';\n";
    mdxContent += imports.join('\n');
    mdxContent += '\n\n';
  }

  mdxContent += processedContent;

  return mdxContent;
}

/**
 * Função principal de conversão
 */
function convertAllFiles() {
  if (!fs.existsSync(BLOG_DIR)) {
    console.error(`Pasta não encontrada: ${BLOG_DIR}`);
    return;
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'));

  if (files.length === 0) {
    console.log('Nenhum arquivo .md encontrado para converter.');
    return;
  }

  console.log(`Encontrados ${files.length} arquivos .md para converter...\n`);

  files.forEach((file) => {
    const filePath = path.join(BLOG_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    try {
      const mdxContent = convertToMDX(content, file);
      const newFilePath = filePath.replace(/\.md$/, '.mdx');

      fs.writeFileSync(newFilePath, mdxContent, 'utf-8');
      fs.unlinkSync(filePath); // Remove arquivo .md original

      console.log(`✓ Convertido: ${file} → ${path.basename(newFilePath)}`);
    } catch (error) {
      console.error(`✗ Erro ao converter ${file}:`, error.message);
    }
  });

  console.log('\n✓ Conversão concluída!');
}

// Executar
convertAllFiles();
