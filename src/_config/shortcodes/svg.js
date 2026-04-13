import {optimize} from 'svgo';
import {readFileSync} from 'node:fs';

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
  const svgData = readFileSync(`./src/assets/svg/${svgName}.svg`, 'utf8');
  const {data} = await optimize(svgData);

  const attrs = [
    ariaLabel ? `aria-label="${ariaLabel}"` : 'aria-hidden="true"',
    ariaDescribedBy ? `aria-describedby="${ariaDescribedBy}"` : '',
    ariaLabel || ariaDescribedBy ? 'role="img"' : '',
    className ? `class="${className}"` : '',
    styleName ? `style="${styleName}"` : ''
  ]
    .filter(Boolean)
    .join(' ');

  return data.replace(/<svg(.*?)>/, `<svg$1 ${attrs}>`);
};
