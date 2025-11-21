import { visit } from 'unist-util-visit';

export default function remarkExternalLinks() {
  return (tree) => {
    visit(tree, 'link', (node) => {
      const url = node.url;

      // Detecta links externos (começa com http/https ou www)
      if (
        url.startsWith('http://') ||
        url.startsWith('https://') ||
        url.startsWith('www.')
      ) {
        // Adiciona classe ao link
        node.data = node.data || {};
        node.data.hProperties = node.data.hProperties || {};
        node.data.hProperties.className = 'external-link';
      }
    });
  };
}
