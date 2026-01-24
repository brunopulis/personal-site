import { icons } from 'lucide';

export const lucide = (name, attrs = {}) => {
  // Handle kebab-case to PascalCase (e.g., alert-circle -> AlertCircle)
  const pascalName = name
    .split('-')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  const iconNodes = icons[pascalName] || icons[name];

  if (!iconNodes) {
    console.warn(`[Lucide] Icon "${name}" (PascalCase: "${pascalName}") not found.`);
    return '';
  }

  // Set default optional attributes for the SVG tag
  const defaults = {
    'xmlns': 'http://www.w3.org/2000/svg',
    'width': 24,
    'height': 24,
    'viewBox': '0 0 24 24',
    'fill': 'none',
    'stroke': 'currentColor',
    'stroke-width': 2,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    'class': '',
    'aria-hidden': 'true',
  };

  // If attrs is a string, assume it's a class string (shortcut)
  const finalAttrs = typeof attrs === 'string' 
    ? { ...defaults, class: attrs } 
    : { ...defaults, ...attrs };

  const attrString = Object.entries(finalAttrs)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');

  const childrenString = iconNodes
    .map(([childTag, childAttrs]) => {
      const childAttrString = Object.entries(childAttrs)
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');
      return `<${childTag} ${childAttrString}></${childTag}>`;
    })
    .join('');

  return `<svg ${attrString}>${childrenString}</svg>`;
};
