import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const notes = await getCollection('notes');
  
  return rss({
    stylesheet: `/rss-styles.xsl`,
    title: 'Minhas notas',
    description: 'Pensamentos e anotações curtas',
    site: context.site,
    items: notes.map((note) => ({
      title: note.data.title || note.data.content.substring(0,50),
      pubDate: note.data.pubDate,
      description: note.data.description,
      link: `/notes/${note.slug}/`,
    })),
    customData: `<language>pt-br</language>`,
  });
}