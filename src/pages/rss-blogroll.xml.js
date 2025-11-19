// src/pages/rss-blogrolls.xml.js
// Versão organizada mostrando a categoria no título

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blogrolls = await getCollection('blogrolls');

  // Ordenar por categoria e depois por data
  const sortedBlogrolls = blogrolls.sort((a, b) => {
    // Primeiro por categoria
    const catCompare = (a.data.category || '').localeCompare(
      b.data.category || ''
    );
    if (catCompare !== 0) return catCompare;

    // Depois por data
    const dateA = a.data.date_added || new Date(0);
    const dateB = b.data.date_added || new Date(0);
    return dateB.getTime() - dateA.getTime();
  });

  return rss({
    stylesheet: '/rss-styles.xsl',
    title: 'Blogroll - Bruno Pulis',
    description:
      'Sites, blogs e feeds que acompanho e recomendo, organizados por categoria',
    site: context.site,

    items: sortedBlogrolls.map((link) => {
      // Emoji baseado na categoria
      const categoryEmojis = {
        Tecnologia: '💻',
        Design: '🎨',
        Acessibilidade: '♿',
        Desenvolvimento: '⚙️',
        Frontend: '🎯',
        Backend: '🔧',
        DevOps: '🚀',
        Pessoal: '👤',
        Blog: '📝',
        Notícias: '📰',
        Podcast: '🎙️',
        Vídeo: '📹',
        Newsletter: '📬',
        Fotografia: '📷',
        Escrita: '✍️',
        Música: '🎵',
      };

      const emoji = categoryEmojis[link.data.category] || '🔗';

      // Construir descrição rica
      const parts = [];

      // Header com categoria
      parts.push(`<h3>${emoji} ${link.data.category || 'Links'}</h3>`);

      // Descrição
      if (link.data.description) {
        parts.push(`<p>${link.data.description}</p>`);
      }

      // Informações do link
      const info = [];

      info.push(
        `<strong>🌐 URL:</strong> <a href="${link.data.url}">${link.data.url}</a>`
      );

      if (link.data.rss_feed) {
        info.push(
          `<strong>📡 Feed RSS:</strong> <a href="${link.data.rss_feed}">Assinar</a>`
        );
      }

      if (link.data.date_added) {
        const formattedDate = new Date(link.data.date_added).toLocaleDateString(
          'pt-BR',
          {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }
        );
        info.push(`<strong>📅 Adicionado:</strong> ${formattedDate}`);
      }

      parts.push(info.join('<br/>'));

      // Dica de uso
      if (link.data.rss_feed) {
        parts.push(
          `<p><em>💡 Este site tem feed RSS! Você pode assinar para receber atualizações.</em></p>`
        );
      }

      const description = parts.join('<br/><br/>');

      return {
        title: `${emoji} ${link.data.title} [${link.data.category || 'Link'}]`,
        pubDate: link.data.date_added || new Date(),
        description: description,
        link: link.data.url,
        categories: [link.data.category],
        customData: link.data.rss_feed
          ? `
            <source url="${link.data.rss_feed}">
              <title>${link.data.title}</title>
            </source>
          `
          : undefined,
      };
    }),

    customData: `
      <language>pt-br</language>
      <category>Blogroll</category>
      <category>Links</category>
      <category>Web Directory</category>
      <managingEditor>Bruno Pulis</managingEditor>
      <webMaster>Bruno Pulis</webMaster>
    `,

    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
      content: 'http://purl.org/rss/1.0/modules/content/',
      dc: 'http://purl.org/dc/elements/1.1/',
    },
  });
}
