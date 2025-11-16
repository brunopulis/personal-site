import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');
  
  return rss({
    stylesheet: `/rss-styles.xsl`,
    title: 'Meu Blog',
    description: 'Escrevo sobre acessibilidade, tecnologia, teologia, produtividade. Nem tudo é técnico, às vezes é só sobre a vida.',
    site: context.site,
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
    customData: `<language>pt-br</language>`,
  });
}