import Image from '@11ty/eleventy-img';
import path from 'node:path';

const stringifyAttributes = attributeMap => {
  return Object.entries(attributeMap)
    .map(([attribute, value]) => {
      if (typeof value === 'undefined') return '';
      return `${attribute}="${value}"`;
    })
    .join(' ');
};

const errorSrcRequired = shortcodeName => {
  throw new Error(`src parameter is required for {% ${shortcodeName} %} shortcode`);
};

// Handles image processing
const processImage = async options => {
  let {
    src = 'images/',
    alt = '',
    caption = '',
    loading = 'lazy',
    containerClass,
    imageClass,
    width,
    height,
    widths = [650, 960, 1400],
    sizes = 'auto',
    formats = ['webp', 'jpeg', 'png'],
    simple = false // Novo parâmetro para images simples (badges)
  } = options;

  // Prepend "./src" if not present
  if (!src.startsWith('./src')) {
    src = `./src/${src}`;
  }

  // Se é uma imagem simples (badge), retorna apenas <img>
  if (simple || width) {
    const srcExtension = path.extname(src).toLowerCase();
    const isGif = srcExtension === '.gif';
    
    // Para GIFs, não processar - apenas retornar o caminho direto
    if (isGif) {
      const cleanSrc = src.replace('./src/', '/');
      
      const imageAttributes = stringifyAttributes({
        'src': cleanSrc,
        ...(width && {'width': width}),
        ...(height && {'height': height}),
        alt,
        loading,
        'decoding': loading === 'eager' ? 'sync' : 'async',
        ...(imageClass && {class: imageClass})
      });

      return `<img ${imageAttributes}>`;
    }

    // Para outras imagens, processar normalmente
    if (width) {
      widths = [parseInt(width)];
    }
    
    const metadata = await Image(src, {
      widths: [parseInt(width || widths[0])],
      formats: ['jpeg'],
      urlPath: '/assets/images/',
      outputDir: './dist/assets/images/',
      filenameFormat: (id, src, width, format, options) => {
        const extension = path.extname(src);
        const name = path.basename(src, extension);
        return `${name}-${width}w.${format}`;
      }
    });

    const lowsrc = metadata.jpeg || Object.values(metadata)[0];
    const lowsrcEntry = lowsrc[lowsrc.length - 1];

    const imageAttributes = stringifyAttributes({
      'src': lowsrcEntry.url,
      'width': lowsrcEntry.width,
      'height': lowsrcEntry.height,
      alt,
      loading,
      'decoding': loading === 'eager' ? 'sync' : 'async',
      ...(imageClass && {class: imageClass}),
      'eleventy:ignore': ''
    });

    const imgElement = `<img ${imageAttributes}>`;

    return caption
      ? `<figure slot="image"${
          containerClass ? ` class="${containerClass}"` : ''
        }>${imgElement}<figcaption>${caption}</figcaption></figure>`
      : imgElement;
  }

  // Processamento normal com picture para imagens grandes
  const metadata = await Image(src, {
    widths: [...widths],
    formats: [...formats],
    width,
    height,
    urlPath: '/assets/images/',
    outputDir: './dist/assets/images/',
    filenameFormat: (id, src, width, format, options) => {
      const extension = path.extname(src);
      const name = path.basename(src, extension);
      return `${name}-${width}w.${format}`;
    }
  });

  const lowsrc = metadata.jpeg || metadata.png || metadata.gif || Object.values(metadata)[0];
  const lowsrcEntry = lowsrc[lowsrc.length - 1];

  const imageSources = Object.values(metadata)
    .map(imageFormat => {
      return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat
        .map(entry => entry.srcset)
        .join(', ')}" sizes="${sizes}">`;
    })
    .join('\n');

  const imageAttributes = stringifyAttributes({
    'src': lowsrcEntry.url,
    'width': lowsrcEntry.width,
    'height': lowsrcEntry.height,
    alt,
    loading,
    'decoding': loading === 'eager' ? 'sync' : 'async',
    ...(imageClass && {class: imageClass}),
    'eleventy:ignore': ''
  });

  const pictureElement = `<picture> ${imageSources}<img ${imageAttributes}></picture>`;
  const imgElement = `<img ${imageAttributes}>`;

  return caption
    ? `<figure slot="image"${
        containerClass ? ` class="${containerClass}"` : ''
      }>${pictureElement}<figcaption>${caption}</figcaption></figure>`
    : `<picture slot="image"${
        containerClass ? ` class="${containerClass}"` : ''
      }>${imageSources}<img ${imageAttributes}></picture>`;
};

/**
 * Shortcode para otimização de imagens (com parâmetros posicionais)
 * Uso: {% image "./blog/image.jpg", "Alt text", "Caption" %}
 * Uso simples: {% image "./badges/badge.png", "Alt text", "", "", "", "", "", "", "", "", "", true %}
 */
export const image = async (
  src,
  alt,
  caption,
  width,
  height,
  loading,
  containerClass,
  imageClass,
  widths,
  sizes,
  formats,
  simple
) => {
  if (!src) {
    errorSrcRequired('image');
  }
  return processImage({
    src,
    alt,
    caption,
    width,
    height,
    loading,
    containerClass,
    imageClass,
    widths,
    sizes,
    formats,
    simple
  });
};

/**
 * Shortcode para otimização de imagens (com parâmetros nomeados)
 * Uso completo: {% imageKeys src="./blog/image.jpg", alt="Alt text", width="800" %}
 * Uso simples: {% imageKeys src="./badges/badge.png", alt="Alt text", simple=true %}
 */
export const imageKeys = async (options = {}) => {
  if (!options.src) {
    errorSrcRequired('imageKeys');
  }
  return processImage(options);
};

/**
 * Helper para badges simples
 * Uso: {% badge "./assets/images/badges/made-in-bh.png" "Feito em Belo Horizonte" %}
 */
export const badge = async (src, alt) => {
  if (!src) {
    errorSrcRequired('badge');
  }
  return processImage({
    src,
    alt,
    loading: 'eager',
    width: '88',
    height: '31',
    simple: true
  });
};