import {optimize} from 'svgo';
import {readFileSync} from 'node:fs';

const FA_ROOT = 'node_modules/@fortawesome/fontawesome-free/svgs';
const VALID_REF = /^[a-z0-9-]+$/;
const optimizeCache = new Map();

const escapeAttr = value => value.replace(/"/g, '&quot;');

/**
 * Generates an inline Font Awesome SVG shortcode.
 *
 * @param {string} name - The Font Awesome icon name (e.g. "github").
 * @param {string} [style='solid'] - The icon style: "solid" or "brands".
 * @param {number|string} [size=16] - The width/height of the icon.
 * @param {string} [className=''] - The CSS class name for the SVG.
 * @param {string} [ariaLabel=''] - The ARIA label (aria-label) for the SVG.
 * @param {string} [styleName=''] - The inline style for the SVG.
 * @returns {Promise<string>} The optimized inline SVG.
 */
export const faIconShortcode = async (
  name,
  style = 'solid',
  size = 16,
  className = '',
  ariaLabel = '',
  styleName = ''
) => {
  if (!VALID_REF.test(name) || !VALID_REF.test(style)) {
    throw new Error(`Invalid Font Awesome icon reference: "${style}/${name}"`);
  }

  const cacheKey = `${style}/${name}`;
  if (!optimizeCache.has(cacheKey)) {
    const {data} = await optimize(readFileSync(`${FA_ROOT}/${cacheKey}.svg`, 'utf8'), {
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              removeComments: false
            }
          }
        }
      ]
    });
    optimizeCache.set(cacheKey, data);
  }

  const attrs = [
    `width="${size}"`,
    `height="${size}"`,
    `class="${escapeAttr(className)}"`,
    ariaLabel ? `aria-label="${escapeAttr(ariaLabel)}"` : 'aria-hidden="true"',
    ariaLabel ? 'role="img"' : '',
    styleName ? `style="${escapeAttr(styleName)}"` : ''
  ]
    .filter(Boolean)
    .join(' ');

  return optimizeCache.get(cacheKey).replace(/<svg([\s\S]*?)>/, `<svg$1 ${attrs}>`);
};
