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
    formats = ['webp', 'jpeg', 'png']
  } = options;

  // Prepend "./src" if not present
  if (!src.startsWith('./src')) {
    src = `./src/${src}`;
  }

  // If width is specified, use it as the only width and force PNG format for simple <img> output
  if (width) {
    widths = [parseInt(width)];
    formats = ['png'];
  }

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

  // Return simple <img> if we only have one format (implied by width param presence logic above)
  if (formats.length === 1) {
    return caption
      ? `<figure slot="image"${
          containerClass ? ` class="${containerClass}"` : ''
        }>${imgElement}<figcaption>${caption}</figcaption></figure>`
      : imgElement;
  }

  return caption
    ? `<figure slot="image"${
        containerClass ? ` class="${containerClass}"` : ''
      }>${pictureElement}<figcaption>${caption}</figcaption></figure>`
    : `<picture slot="image"${
        containerClass ? ` class="${containerClass}"` : ''
      }>${imageSources}<img ${imageAttributes}></picture>`;
};

/**
 *
 * @param {*} src
 * @param {*} alt
 * @param {*} caption
 * @param {*} width
 * @param {*} height
 * @param {*} loading
 * @param {*} containerClass
 * @param {*} imageClass
 * @param {*} widths
 * @param {*} sizes
 * @param {*} formats
 * @returns
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
  formats
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
    formats
  });
};

// Named parameters
export const imageKeys = async (options = {}) => {
  if (!options.src) {
    errorSrcRequired('imageKeys');
  }
  return processImage(options);
};
