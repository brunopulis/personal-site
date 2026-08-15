import {optimize} from 'svgo';
import {readFileSync} from 'node:fs';

const SVG_ROOT = './src/assets/svg';
const VALID_NAME = /^[a-z0-9_-]+$/;

const escapeAttr = value => value.replace(/"/g, '&quot;');

/**
 * Generates an optimized SVG shortcode with optional attributes.
 *
 * @param {string} svgName - The name of the SVG file (without the .svg extension).
 * @param {string} [ariaLabel=''] - The ARIA label (aria-label) for the SVG.
 * @param {string} [ariaDescribedBy=''] - ID of the element that describes the SVG (aria-describedby).
 * @param {string} [className=''] - The CSS class name for the SVG.
 * @param {string} [styleName=''] - The inline style for the SVG.
 * @returns {Promise<string>} The optimized SVG shortcode.
 */
export const svgShortcode = async (
  svgName,
  ariaLabel = '',
  ariaDescribedBy = '',
  className = '',
  styleName = ''
) => {
  if (!VALID_NAME.test(svgName)) {
    throw new Error(`Invalid local SVG name: "${svgName}"`);
  }

  const svgData = readFileSync(`${SVG_ROOT}/${svgName}.svg`, 'utf8');
  const {data} = await optimize(svgData);

  const attrs = [
    ariaLabel ? `aria-label="${escapeAttr(ariaLabel)}"` : 'aria-hidden="true"',
    ariaDescribedBy ? `aria-describedby="${escapeAttr(ariaDescribedBy)}"` : '',
    ariaLabel || ariaDescribedBy ? 'role="img"' : '',
    className ? `class="${escapeAttr(className)}"` : '',
    styleName ? `style="${escapeAttr(styleName)}"` : ''
  ]
    .filter(Boolean)
    .join(' ');

  return data.replace(/<svg([\s\S]*?)>/, `<svg$1 ${attrs}>`);
};
