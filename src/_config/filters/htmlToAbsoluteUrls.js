export const htmlToAbsoluteUrls = (html, base) => {
  if (!html || !base) return html || '';
  const joinUrl = (b, p) => b.replace(/\/+$/, '') + '/' + String(p).replace(/^\/+/, '');
  return String(html).replace(/(href|src)="(\/[^"]*)"/g, (m, attr, url) => {
    return `${attr}="${joinUrl(base, url)}"`;
  });
};
